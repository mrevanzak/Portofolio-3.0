import { discordRouter } from '@/server/api/routers/discord';
import { projectRouter } from '@/server/api/routers/projects';
import { resumeRouter } from '@/server/api/routers/resume';
import { createTRPCRouter } from '@/server/api/trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  resume: resumeRouter,
  projects: projectRouter,
  discord: discordRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
