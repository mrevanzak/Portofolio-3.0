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

export async function getStaticProps() {
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
    revalidate: 1,
  };
}

export default function HomePage() {
  const { data: cv, isFetching } = api.resume.get.useQuery();
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
        <div className='layout relative min-h-screen space-y-8 py-12'>
          <div className='flex flex-wrap gap-8'>
            <Card className='flex-auto flex-row justify-start p-0'>
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
            <Card className='w-72 flex-auto space-y-4' onClick={onDownload}>
              <HiDocumentText className='text-secondary m-auto text-9xl' />
              <p>
                {isFetching
                  ? 'Contructing the newest resume...'
                  : 'Discover me, check resume'}
              </p>
            </Card>
            <Card className='relative w-72 flex-auto space-y-4'>
              <DiscordCard />
            </Card>
          </div>
          <Card className='h-auto py-4'>
            <h2 className='text-2xl font-bold'>
              My projects, my passion, my potential. See for yourself
            </h2>
          </Card>
          <div className='flex flex-wrap gap-8'>
            {data?.map((project) => (
              <Card key={project.id} className='h-52 w-72 flex-auto space-y-4'>
                <h2 className='text-2xl font-bold'>{project.title}</h2>
                <div className='flex flex-wrap gap-2'>
                  {project.tags.map((tag) => (
                    <p
                      key={tag}
                      className='shadow-neumorphismInset2 rounded-full px-3 py-2 text-xs'
                    >
                      <span className='text-accent mr-2'>●</span>
                      {tag}
                    </p>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
