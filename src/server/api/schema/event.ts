import { z } from "zod";

export const eventSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().nullable(), // <--- Change this line
  startDate: z.date(),
  image: z.string().nullable(),
  endDate: z.date(),
  address: z.string().optional(),
  registration: z.boolean(),
  registrationStartDate: z.date(),
  registrationEndDate: z.date(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()).optional(),
  deletedAt: z.date().nullable(),
  //   organizer: z.string().optional(),
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
