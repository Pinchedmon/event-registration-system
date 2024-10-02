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
  getAllEvents: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(), // <-- "cursor" needs to exist, but can be any type
        direction: z.enum(["forward", "backward"]).nullish(), // optional, useful for bi-directional query
      }),
    )
    .query(async (opts: any) => {
      const { input } = opts;
      const limit = input.limit ?? 10;
      const { cursor } = input;
      const items = await db.event.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        where: {
          // Add filters as needed
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: "asc",
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }
      return {
        items,
        nextCursor,
      };
    }),
  getAllEventbyAdmin: publicProcedure.query(async () => {
    return db.event.findMany();
  }),
  getAllEventbyTeam: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return db.event.findMany({ where: { teamId: input } });
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

  // upcoming
  getUpcomingEvents: publicProcedure.query(async () => {
    const upcomingEvents = await db.event.findMany({
      take: 4, // get only 4 upcoming events
      orderBy: {
        startDate: "asc", // order by start date ascending
      },
    });
    return upcomingEvents;
  }),
  //Update an event
  updateEvent: publicProcedure
    .input(eventSchema)
    .mutation(async ({ input }) => {
      return db.event.update({ where: { id: input.id }, data: input });
    }),

  // Delete an event
  deleteEvent: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return db.event.delete({ where: { id: input } });
  }),
});
