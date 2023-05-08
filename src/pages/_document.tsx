import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link href='https://fonts.cdnfonts.com/css/satoshi' rel='stylesheet' />
      </Head>
      <body>
        <Main />
        <NextScript />
        <svg>
          <filter id='noiseFilter'>
            <feTurbulence
              type='fractalNoise'
              baseFrequency='0.6'
              stitchTiles='stitch'
            />
          </filter>
        </svg>
      </body>
    </Html>
  );
}
