import { Frequency } from "@prisma/client";
import { z } from "zod";

export const SubscribeBodySchema = z
  .object({
    email: z.string().email("Invalid email format"),
    city: z.string().min(1, "City is required"),
    frequency: z
      .enum(["hourly", "daily"], {
        errorMap: () => ({
          message: "Frequency must be either 'hourly' or 'daily'",
        }),
      })
      .transform((freq) => freq.toUpperCase() as Frequency),
  })
  .strict();
export type SubscribeBody = z.infer<typeof SubscribeBodySchema>;

export const ConfirmSubscriptionParamsSchema = z
  .object({
    token: z.string().min(1, "Confirmation token is required"),
  })
  .strict();
export type ConfirmSubscriptionParams = z.infer<
  typeof ConfirmSubscriptionParamsSchema
>;

export const UnsubscribeParamsSchema = z
  .object({
    token: z.string().min(1, "Unsubscribe token is required"),
  })
  .strict();
export type UnsubscribeParams = z.infer<typeof UnsubscribeParamsSchema>;
