import { rootConfig } from "../../config";
import { QUEUE_TYPES } from "../../constants";
import { WorkerConfig } from "../../types";

export const confirmEmailConfig: WorkerConfig = {
  ...rootConfig,
  queueName: QUEUE_TYPES.EMAIL,
  concurrency: 1,
};

export type ConfirmEmailJobData = {
  email: string;
  city: string;
  confirmToken: string;
};
