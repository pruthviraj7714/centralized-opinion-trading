import { Worker, Job } from "bullmq";
import { prisma } from "@repo/db";
import { redisclient } from "@repo/redisclient";
import type { MarketStatus } from "../../packages/db/generated/prisma/enums";

const closeMarketOnExpiry = async (marketId: string) => {
  await prisma.$transaction(async (tx) => {

    const markets = await tx.$queryRaw<{
      status: MarketStatus,
      id: string,
    }[]>`SELECT "id", "status" FROM "Market" WHERE id = ${marketId} FOR UPDATE`

    if (!markets || markets.length === 0) {
      throw new Error("Market not found");
    }

    const market = markets[0]!;

    if (market.status !== "OPEN") {
      return;
    }

    await tx.market.update({
      where: {
        id: market.id
      },
      data: {
        status: "CLOSED"
      }
    })
  })
}

const worker = new Worker(
  "market-queue",
  async (job: Job) => {
    switch (job.name) {
      case "close-market-on-expiry": {
        const { marketId } = job.data;

        await closeMarketOnExpiry(marketId)

        break;
      }
    }
  },
  {
    connection: redisclient,
  }
);

worker.on("error", (err) => {
  console.error(err.message)
})