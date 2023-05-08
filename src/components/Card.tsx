import React from 'react';

import clsxm from '@/lib/clsxm';

type CardProps = React.ComponentPropsWithoutRef<'div'>;

export default function Card({ children, className, ...rest }: CardProps) {
  return (
    <div
      className={clsxm(
        'shadow-neumorphism hover:shadow-neumorphismHover flex flex-col justify-center overflow-clip rounded-2xl p-4',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
