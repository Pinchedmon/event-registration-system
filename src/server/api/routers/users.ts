import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { db } from "@/server/db";
import { usersSchema } from "../schema/users";

export const usersRouter = createTRPCRouter({
  // Get all users
  getAllUsers: protectedProcedure.query(async () => {
    return db.user.findMany();
  }),
  // Get a user by ID
  getUser: publicProcedure.input(z.string()).query(async ({ input }) => {
    return db.user.findUnique({ where: { id: input } });
  }),

  // Create a new user
  createUser: publicProcedure.input(usersSchema).mutation(async ({ input }) => {
    return db.user.create({ data: input });
  }),

  // Update a user
  updateUser: publicProcedure
    .input(z.object({ id: z.string(), name: z.string(), email: z.string() }))
    .mutation(async ({ input }) => {
      return db.user.update({ where: { id: input.id }, data: input });
    }),

  // Delete a user
  deleteUser: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return db.user.delete({ where: { id: input } });
    }),
});
