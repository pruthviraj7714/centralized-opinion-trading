import { Worker, Job } from "bullmq";

const worker = new Worker("market-queue", async (job: Job) => {
  const { marketId } = job.data;
});
