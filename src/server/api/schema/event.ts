import { z } from "zod";

export const eventSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
  address: z.string(),
  registration: z.boolean(),
  registrationStartDate: z.date(),
  registrationEndDate: z.date(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()).optional(),
  deletedAt: z.date().optional(),
  //   organizer: z.string().optional(),
  userId: z.string().optional(),
});

export type Event = z.infer<typeof eventSchema>;
