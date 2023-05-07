import React from 'react';

import clsxm from '@/lib/clsxm';

type CardProps = React.ComponentPropsWithoutRef<'div'>;

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsxm(
        'shadow-neumorphism flex h-48 flex-col justify-center overflow-clip rounded-2xl p-4',
        className
      )}
    >
      {children}
    </div>
  );
}
