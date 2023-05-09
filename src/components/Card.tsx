import React from 'react';

import clsxm from '@/lib/clsxm';

type CardProps = React.ComponentPropsWithoutRef<'div'>;

export default function Card({ children, className, ...rest }: CardProps) {
  return (
    <div
      className={clsxm(
        'shadow-neumorphism hover:shadow-neumorphismHover flex h-72 flex-col justify-center overflow-clip rounded-2xl px-10 py-9 transition duration-300 ease-linear',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
