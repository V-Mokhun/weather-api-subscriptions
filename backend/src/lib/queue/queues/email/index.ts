import { QUEUE_TYPES } from "../../constants";
import { createQueue } from "../queue-factory";

export const EmailQueue = createQueue(QUEUE_TYPES.EMAIL);
