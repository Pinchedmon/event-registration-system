import { z } from "zod";

export const teamStatusTypeSchema = z.enum(["ACTIVE", "INACTIVE"]); // assuming ACTIVE and INACTIVE are the possible values for TeamStatusType

export const teamSchema = z.object({
  id: z.string(),
  name: z.string(),
  theme: z.string().optional(),
  endDate: z.date().optional(),
  status: teamStatusTypeSchema.default("ACTIVE"),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()).optional(),
  deletedAt: z.date().optional(),
  users: z.array(z.string()), // assuming users is an array of user IDs
});

export type Team = z.infer<typeof teamSchema>;
