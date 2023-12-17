import classNames from 'classnames';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Providers from './providers';
import type { Metadata, Viewport } from 'next';
import './globals.scss';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '900'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'NASelf',
  description: 'Selfhosted NAS browser'
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  interactiveWidget: 'resizes-content',
  userScalable: false
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang='en'
      className={classNames('dark', inter.className)}
    >
      <Head>
        <meta charSet='utf-8' />
        <meta
          name='Content-Security-Policy'
          content="worker-src: 'self'"
        />
      </Head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
