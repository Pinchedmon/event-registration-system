import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { usersRouter } from "./routers/users";
import { eventRouter } from "./routers/event";
import { teamRouter } from "./routers/team";
import { participantRouter } from "./routers/participant";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */

export const appRouter = createTRPCRouter({
  users: usersRouter,
  event: eventRouter,
  team: teamRouter,
  participant: participantRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
