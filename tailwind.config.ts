import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        primary: ['Satoshi', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: 'rgb(var(--tw-color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--tw-color-secondary) / <alpha-value>)',
        accent: 'rgb(var(--tw-color-accent) / <alpha-value>)',
      },
      boxShadow: {
        neumorphism:
          '6px 6px 10px rgb(var(--tw-color-primary) / 0.4), -6px -6px 10px rgb(var(--tw-color-primary))',
        neumorphismHover:
          '10px 10px 15px rgb(var(--tw-color-primary) / 0.4), -10px -10px 15px rgb(var(--tw-color-primary))',
        neumorphismInset:
          'inset 6px 6px 10px rgb(var(--tw-color-primary) / 0.4), inset -6px -6px 10px rgb(var(--tw-color-primary))',
        neumorphismInset2:
          'inset 3px 3px 8px rgb(var(--tw-color-primary) / 0.4), inset -3px -3px 8px rgb(var(--tw-color-primary))',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
