import { initializeJobs, redisConnection, stopJobs } from "./lib";

function startWorkers() {
  initializeJobs();
  console.log("Worker service started");
}

async function stopWorkers() {
  await stopJobs();
  await redisConnection.quit();

  console.log("Worker service stopped");

  process.exit(0);
}

startWorkers();

process.on("SIGTERM", stopWorkers);
process.on("SIGINT", stopWorkers);
