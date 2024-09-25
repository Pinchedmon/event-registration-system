// schema/participant.ts
import { z } from "zod";

export const participantStatusTypeSchema = z.enum([
  "PENDING",
  "APPROVED",
  "REJECTED",
]);

export const participantSchema = z.object({
  id: z.string().optional(),
  eventId: z.string(),
  userId: z.string(),
  status: participantStatusTypeSchema.default("PENDING"),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()).optional(),
  deletedAt: z.date().nullable(),
});

export type Participant = z.infer<typeof participantSchema>;
