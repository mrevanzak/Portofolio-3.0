import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className='layout flex h-24 items-center justify-center'>
      <p className='text-accent hover:text-secondary font-bold'>
        © Revanza Kurniawan {year}
      </p>
    </footer>
  );
}
