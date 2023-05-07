import * as React from 'react';

import Card from '@/components/Card';
import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

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

export default function HomePage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <div className='layout relative flex min-h-screen space-x-8 py-12'>
          <Card className='flex-row p-0'>
            <NextImage
              imgClassName='grayscale'
              src='/images/me.jpg'
              alt='Me'
              width={150}
              height={120}
            />
            <div className='m-4 flex flex-col justify-center'>
              <h2 className='text-2xl font-bold'>Hello, I'm Revan</h2>
              <p className='text-sm'>I'm a Frontend Developer</p>
            </div>
          </Card>
        </div>
      </main>
    </Layout>
  );
}
