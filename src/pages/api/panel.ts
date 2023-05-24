import type { NextApiRequest, NextApiResponse } from 'next';
import { renderTrpcPanel } from 'trpc-panel';

import { env } from '@/env.mjs';
import { appRouter } from '@/server/api/root';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  res.status(200).send(
    renderTrpcPanel(appRouter, {
      url: `${env.NEXT_PUBLIC_SITE_URL}/api/trpc`,
      transformer: 'superjson',
    })
  );
}
