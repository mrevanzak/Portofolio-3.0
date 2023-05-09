import React from 'react';

import UnderlineLink from '@/components/links/UnderlineLink';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className='layout flex h-24 items-center justify-center'>
      <UnderlineLink href='/' className='font-bold'>
        © Revanza Kurniawan {year}
      </UnderlineLink>
    </footer>
  );
}
