import { Queue } from "bullmq";
import { redisclient } from "@repo/redisclient";

export const marketQueue = new Queue("market-queue", {
  connection: redisclient,
});
