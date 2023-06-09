import { createServerSideHelpers } from '@trpc/react-query/server';
import { GetStaticPropsContext } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import * as React from 'react';
import { NotionRenderer } from 'react-notion-x';
import superjson from 'superjson';

import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

import { appRouter } from '@/server/api/root';
import { api } from '@/utils/api';

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code)
);
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const pageId = context?.params?.id as string;
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  });

  await helpers.projects.page.prefetch({ id: pageId });

  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
    revalidate: 10,
  };
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export default function ProjectsPage() {
  const router = useRouter();
  const { data } = api.projects.page.useQuery({
    id: router.query.id as string,
  });

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <div className='layout relative min-h-screen space-y-8 py-12'>
          {data && (
            <NotionRenderer
              recordMap={data}
              darkMode={true}
              components={{
                Code,
                nextImage: NextImage,
              }}
              className='w-full p-0'
            />
          )}
        </div>
      </main>
    </Layout>
  );
}
