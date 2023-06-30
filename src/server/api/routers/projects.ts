import { z } from 'zod';

import { getProjectDetail, getProjects } from '@/lib/notion';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

export const projectRouter = createTRPCRouter({
  get: publicProcedure.query(async () => {
    const projects = await getProjects();
    return projects;
  }),
  page: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const projectPage = await getProjectDetail(input.id);
      return projectPage;
    }),
});
