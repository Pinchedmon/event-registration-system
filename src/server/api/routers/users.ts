import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { db } from "@/server/db";
import { updateUser, updateUserByAdmin, usersSchema } from "../schema/users";

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
  updateUser: publicProcedure.input(updateUser).mutation(async ({ input }) => {
    return db.user.update({ where: { id: input.id }, data: input });
  }),
  updateUserByAdmin: publicProcedure
    .input(updateUserByAdmin)
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
