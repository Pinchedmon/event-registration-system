import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { db } from "@/server/db";
import { teamSchema } from "../schema/team";

export const teamRouter = createTRPCRouter({
  // Get all teams
  getAllTeams: publicProcedure.query(async () => {
    return db.team.findMany();
  }),
  // Get all teams
  getMyTeams: publicProcedure.input(z.string()).query(async ({ input }) => {
    return db.team.findMany({
      where: {
        users: {
          some: {
            id: input,
          },
        },
      },
    });
  }),
  // Get a team by ID
  getTeam: publicProcedure.input(z.string()).query(async ({ input }) => {
    return db.team.findUnique({ where: { id: input } });
  }),

  // Create a new team
  createTeam: publicProcedure.input(teamSchema).mutation(async ({ input }) => {
    return db.team.create({ data: input });
  }),

  // Update a team
  updateTeam: publicProcedure.input(teamSchema).mutation(async ({ input }) => {
    return db.team.update({ where: { id: input.id }, data: input });
  }),

  // Delete a team
  deleteTeam: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return db.team.delete({ where: { id: input } });
  }),

  // Add users to team
  addUsersToTeam: publicProcedure
    .input(
      z.object({
        teamId: z.string(),
        users: z.array(
          z.object({
            userId: z.string(),
            role: z.enum(["ADMIN", "ORGANIZER", "REGISTRATOR", "USER"]),
          }),
        ),
      }),
    )
    .mutation(async ({ input }) => {
      const team = await db.team.findUnique({ where: { id: input.teamId } });
      if (!team) {
        throw new Error("Команда не найдена");
      }

      // Get current users of the team
      const currentTeamUsers = await db.team.findUnique({
        where: { id: input.teamId },
        include: {
          users: true,
        },
      });

      // Add new users to the team
      for (const user of input.users) {
        const existingUser = await db.user.findUnique({
          where: { id: user.userId },
        });
        if (!existingUser) {
          throw new Error(`Пользователь с ID ${user.userId} не найден`);
        }

        await db.team.update({
          where: { id: input.teamId },
          data: {
            users: {
              connect: {
                id: user.userId,
              },
            },
          },
        });
      }

      // Remove users that are no longer selected
      for (const user of currentTeamUsers!.users) {
        if (
          !input.users.some((selectedUser) => selectedUser.userId === user.id)
        ) {
          await db.team.update({
            where: { id: input.teamId },
            data: {
              users: {
                disconnect: {
                  id: user.id,
                },
              },
            },
          });
        }
      }

      return { message: "Пользователи добавлены к команде" };
    }),
  // Get team users
  getTeamUsers: publicProcedure.input(z.string()).query(async ({ input }) => {
    const team = await db.team.findUnique({ where: { id: input } });
    if (!team) {
      throw new Error("Команда не найдена");
    }

    const teamUsers = await db.team.findUnique({
      where: { id: input },
      include: {
        users: {
          where: {
            role: { in: ["ORGANIZER", "REGISTRATOR"] },
          },
        },
      },
    });

    return teamUsers;
  }),
});
