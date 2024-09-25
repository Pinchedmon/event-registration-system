// api/participant.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { participantSchema } from "../schema/participant";
import { updateUser } from "../schema/users";
import { ParticipantStatus } from "@prisma/client";

export const participantRouter = createTRPCRouter({
  // Get all participants
  getAllParticipants: publicProcedure.query(async () => {
    return db.participant.findMany();
  }),

  // Get a participant by ID
  getParticipant: publicProcedure.input(z.string()).query(async ({ input }) => {
    return db.participant.findUnique({ where: { id: input } });
  }),

  createParticipant: publicProcedure
    .input(
      z.object({
        user: updateUser,
        part: participantSchema,
      }),
    )
    .mutation(async ({ input }) => {
      if (input.user.id) {
        // Update existing user
        await db.user.update({
          where: { id: input.user.id },
          data: input.user,
        });
      }
      // Create new participant
      return db.participant.create({ data: input.part });
    }),
  // Update a participant
  updateParticipant: publicProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.nativeEnum(ParticipantStatus),
      }),
    )
    .mutation(async ({ input }) => {
      return db.participant.update({
        where: { id: input.id },
        data: { status: input.status },
      });
    }),

  // Delete a participant
  deleteParticipant: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return db.participant.delete({ where: { id: input } });
    }),

  getParticipantsByEventId: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return db.participant.findMany({
        where: {
          eventId: input,
          status: { in: ["PENDING"] as ParticipantStatus[] },
        },
        include: {
          user: true,
        },
      });
    }),
  // Get participants by event ID
  getParticipantsByUser: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return db.participant.findMany({
        where: { userId: input },
        include: {
          event: true,
        },
      });
    }),
  getParticipantStatus: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        eventId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const participant = await db.participant.findFirst({
        where: {
          userId: input.userId,
          eventId: input.eventId,
        },
      });
      if (!participant) {
        return null; // or throw an error if you prefer
      }
      return participant.status;
    }),
});
