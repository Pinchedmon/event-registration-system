import { z } from "zod";

export const usersSchema = z.object({
  id: z.string().optional(),
  lastName: z.string().nullable(),
  firstName: z.string().nullable(),
  patronymic: z.string().nullable(),
  organization: z.string().nullable(),
  phone: z.string().nullable(),
  position: z.string().nullable(),
  status: z.string().nullable(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(["USER", "ADMIN", "ORGANIZER", "REGISTRATOR"]),
  teamId: z.string().nullable(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()).optional(),
  deletedAt: z.date().nullable(),
  lastAuthorizedAt: z.date().nullable(),
});
export const updateUser = usersSchema.omit({
  lastAuthorizedAt: true,
  deletedAt: true,
  createdAt: true,
  teamId: true,
  password: true,
  role: true,
  status: true,
});
export const updateUserByAdmin = usersSchema.omit({
  lastAuthorizedAt: true,
  deletedAt: true,
  createdAt: true,
  teamId: true,
  password: true,

  status: true,
});
export type User = z.infer<typeof usersSchema>;
