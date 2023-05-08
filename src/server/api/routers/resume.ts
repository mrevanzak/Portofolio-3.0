import { z } from 'zod';

import { getCV } from '@/lib/notion';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

export const resumeRouter = createTRPCRouter({
  get: publicProcedure
    .output(
      z.object({
        file: z.string().url(),
      })
    )
    .query(async () => {
      const { file } = await getCV();
      return { file };
    }),
});
