import { z } from "zod";

export const teamStatusTypeSchema = z.enum(["ACTIVE", "INACTIVE"]); // assuming ACTIVE and INACTIVE are the possible values for TeamStatusType

export const teamSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  theme: z.string().nullable(),
  endDate: z.date().default(new Date()).nullable(), // set a default value for endDate
  status: teamStatusTypeSchema.default("ACTIVE"), // set a default value for status
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()).optional(),
  deletedAt: z.date().nullable(),
});

export type Team = z.infer<typeof teamSchema>;
