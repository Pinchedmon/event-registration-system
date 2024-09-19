import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { db } from "@/server/db";

export const teamRouter = createTRPCRouter({
  // Get all teams
  getAllTeams: publicProcedure.query(async () => {
    return db.team.findMany();
  }),

  // Get a team by ID
  getTeam: publicProcedure.input(z.string()).query(async ({ input }) => {
    return db.team.findUnique({ where: { id: input } });
  }),

  // Create a new team
  createTeam: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      return db.team.create({ data: input });
    }),

  // Update a team
  updateTeam: publicProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(async ({ input }) => {
      return db.team.update({ where: { id: input.id }, data: input });
    }),

  // Delete a team
  deleteTeam: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return db.team.delete({ where: { id: input } });
  }),
});
