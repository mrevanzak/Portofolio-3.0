import { getProjects } from '@/lib/notion';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

export const projectRouter = createTRPCRouter({
  get: publicProcedure.query(async () => {
    const projects = await getProjects();
    return projects;
  }),
});
