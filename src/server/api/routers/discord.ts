import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

export const discordRouter = createTRPCRouter({
  get: publicProcedure.query(async () => {
    const request = await fetch(
      'https://api.lanyard.rest/v1/users/192485745087348736'
    );

    const { data } = await request.json();

    return {
      id: data?.discord_user?.id,
      username: data?.discord_user?.username,
      discriminator: data?.discord_user?.discriminator,
      global_name: data?.discord_user?.global_name,
      avatar: data?.discord_user?.avatar,
      status: data?.discord_status,
      activities: data?.activities,
    };
  }),
});
