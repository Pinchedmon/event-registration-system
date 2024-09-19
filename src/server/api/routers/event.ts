import { z } from "zod";
import { eventSchema } from "./../schema/event";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { db } from "@/server/db";

export const eventRouter = createTRPCRouter({
  // Get all events
  getAllEvents: publicProcedure.query(async () => {
    return db.event.findMany();
  }),

  // Get an event by ID
  getEvent: publicProcedure.input(z.string()).query(async ({ input }) => {
    return db.event.findUnique({ where: { id: input } });
  }),

  //Create a new event
  createEvent: publicProcedure
    .input(eventSchema)
    .mutation(async ({ input }) => {
      return db.event.create({ data: input });
    }),

  //Update an event
  updateEvent: publicProcedure
    .input(
      z.object({ id: z.string(), name: z.string(), description: z.string() }),
    )
    .mutation(async ({ input }) => {
      return db.event.update({ where: { id: input.id }, data: input });
    }),

  // Delete an event
  deleteEvent: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return db.event.delete({ where: { id: input } });
  }),
});
