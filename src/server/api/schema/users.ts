import { z } from "zod";

export const usersSchema = z.object({
  id: z.string().optional(),
  lastName: z.string().optional(),
  firstName: z.string().optional(),
  patronymic: z.string().optional(),
  organization: z.string().optional(),
  phone: z.string().optional(),
  position: z.string().optional(),
  status: z.string().optional(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(["USER", "ADMIN", "ORGANIZER", "REGISTRATOR"]),
  teamId: z.string().optional(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()).optional(),
  deletedAt: z.date().optional(),
  lastAuthorizedAt: z.date().optional(),
});

export type User = z.infer<typeof usersSchema>;
