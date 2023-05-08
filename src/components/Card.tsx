import Link from 'next/link';
import React from 'react';

import clsxm from '@/lib/clsxm';

type CardProps = React.ComponentPropsWithoutRef<'div'>;

export default function Card({ children, className, ...rest }: CardProps) {
  return (
    <Link href='/'>
      <div
        className={clsxm(
          'shadow-neumorphism hover:shadow-neumorphismHover flex h-48 flex-col justify-center overflow-clip rounded-2xl p-4',
          className
        )}
        {...rest}
      >
        {children}
      </div>
    </Link>
  );
}
