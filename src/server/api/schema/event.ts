import { z } from "zod";

export const eventSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().nullable(),
  startDate: z.date(),
  image: z.string().nullable(),
  endDate: z.date(),
  address: z.string(),
  registration: z.boolean(),
  registrationStartDate: z.date().nullable(),
  registrationEndDate: z.date().nullable(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()).optional(),
  deletedAt: z.date().nullable(),

  userId: z.string().nullable(),
});
export const eventCardSchema = eventSchema.omit({
  registration: true,
  registrationStartDate: true,
  registrationEndDate: true,
  createdAt: true,
  userId: true,
  deletedAt: true,
  updatedAt: true,
});

export type Event = z.infer<typeof eventSchema>;
export type EventCard = z.infer<typeof eventCardSchema>;
