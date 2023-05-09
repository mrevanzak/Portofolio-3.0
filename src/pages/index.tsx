import { createServerSideHelpers } from '@trpc/react-query/server';
import * as React from 'react';
import { HiDocumentText } from 'react-icons/hi';
import superjson from 'superjson';

import Card from '@/components/Card';
import DiscordCard from '@/components/DiscordCard';
import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

import { appRouter } from '@/server/api/root';
import { api } from '@/utils/api';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export async function getServerSideProps() {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  });

  await helpers.resume.get.prefetch();
  await helpers.projects.get.prefetch();
  await helpers.discord.get.prefetch();

  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
}

export default function HomePage() {
  const { data: cv } = api.resume.get.useQuery();
  const { data } = api.projects.get.useQuery();

  const onDownload = () => {
    if (!cv) return;
    const link = document.createElement('a');
    link.href = cv?.file;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <div className='layout relative min-h-screen py-12'>
          <div className='flex flex-wrap gap-8'>
            <Card className='h-80 flex-auto flex-row justify-start p-0'>
              <NextImage
                imgClassName='grayscale'
                src='/images/me.jpg'
                alt='Me'
                width={250}
                height={100}
              />
              <div className='m-4 flex flex-col justify-center'>
                <h2>Hello, I'm Revan</h2>
                <p>I'm a frontend Developer</p>
              </div>
            </Card>
            <Card className='h-80 w-80 space-y-4' onClick={onDownload}>
              <HiDocumentText className='text-5xl' />
              <p>Download my CV</p>
            </Card>
            <Card className='h-80 w-80 flex-auto space-y-4'>
              <DiscordCard />
            </Card>
          </div>
          <div className='mt-8 flex flex-wrap gap-8'>
            {data?.map((project) => (
              <Card key={project.id} className=''>
                <h2 className='text-2xl font-bold'>{project.title}</h2>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
