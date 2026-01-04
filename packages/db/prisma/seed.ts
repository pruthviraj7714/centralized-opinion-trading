import { hash } from "bcryptjs";
import { prisma } from "..";
import { Prisma } from "../generated/prisma/client";

async function seedMarkets(adminId: string) {
  const markets = [
    {
      opinion: "Will Bitcoin be above $50,000 on Dec 31, 2026?",
      description:
        "Resolves YES if BTC/USD spot price is above $50,000 at 23:59 UTC on Dec 31, 2026.",
      expiryTime: new Date("2026-12-31T23:59:00Z"),
      yesPool: new Prisma.Decimal(500000),
      noPool: new Prisma.Decimal(500000),
      feePercent: new Prisma.Decimal(0.3),
      userId: adminId,
    },
    {
      opinion: "Will SpaceX successfully launch Starship in 2026?",
      description:
        "Resolves YES if SpaceX completes a successful orbital Starship launch in 2026.",
      expiryTime: new Date("2026-12-31T23:59:00Z"),
      yesPool: new Prisma.Decimal(300000),
      noPool: new Prisma.Decimal(700000),
      feePercent: new Prisma.Decimal(0.25),
      userId: adminId,
    },
    {
      opinion: "Will Apple release a foldable iPhone in 2026?",
      description:
        "Resolves YES if Apple officially announces or releases a foldable iPhone model in 2026.",
      expiryTime: new Date("2026-09-30T23:59:00Z"),
      yesPool: new Prisma.Decimal(200000),
      noPool: new Prisma.Decimal(800000),
      feePercent: new Prisma.Decimal(0.4),
      userId: adminId,
    },
    {
      opinion: "Will Ethereum complete the next major network upgrade in 2026?",
      description:
        "Resolves YES if Ethereum Foundation confirms completion of the next major planned upgrade in 2026.",
      expiryTime: new Date("2026-11-30T23:59:00Z"),
      yesPool: new Prisma.Decimal(600000),
      noPool: new Prisma.Decimal(400000),
      feePercent: new Prisma.Decimal(0.3),
      userId: adminId,
    },
  ];

  await prisma.market.createMany({
    data: markets,
  });

  console.log("Markets seeded successfully");
}

async function seedDB() {
  await prisma.user.deleteMany({
    where: {
      role: "ADMIN",
    },
  });
  console.log("deleted previous admins");

  const hashedPassword = await hash(process.env.ADMIN_PASSWORD || "", 10);

  const admin = await prisma.user.create({
    data: {
      username: process.env.ADMIN_USERNAME || "",
      password: hashedPassword,
      email: process.env.ADMIN_EMAIL || "",
      role: "ADMIN",
    },
  });

  console.log("Admin seeded");

  await seedMarkets(admin.id);
}

seedDB();
