import * as React from 'react';

import UnstyledLink from '@/components/links/UnstyledLink';

export default function Header() {
  return (
    <header className='layout flex h-24 items-center justify-between'>
      <UnstyledLink
        href='/'
        className='text-accent hover:text-secondary font-bold'
      >
        Rev
      </UnstyledLink>
    </header>
  );
}
