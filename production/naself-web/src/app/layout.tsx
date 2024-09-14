import { CSSProperties } from 'react'
import classNames from 'classnames'
import localFont from 'next/font/local'
import Head from 'next/head'
import Providers from './providers'
import type { Metadata, Viewport } from 'next'
import './globals.scss'

const ubuntu = localFont({
  src: [
    {
      path: '../styles/fonts/Ubuntu-Light.ttf',
      weight: '300'
    },
    {
      path: '../styles/fonts/Ubuntu-Regular.ttf',
      weight: '400'
    },
    {
      path: '../styles/fonts/Ubuntu-Medium.ttf',
      weight: '500'
    },
    {
      path: '../styles/fonts/Ubuntu-Bold.ttf',
      weight: '700'
    }
  ]
})

export const metadata: Metadata = {
  title: 'NASelf',
  description: 'Selfhosted filesystem browser'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  interactiveWidget: 'resizes-content',
  userScalable: false
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang='en'
      dir='ltr'
      className={classNames('dark', ubuntu.className)}
      style={
        {
          '--font-ubuntu': ubuntu.style.fontFamily
        } as CSSProperties
      }
    >
      <Head>
        <meta charSet='utf-8' />
        <meta
          name='Content-Security-Policy'
          content="worker-src: 'self'"
        />
      </Head>
      <body>
        <div id='modal-root' />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
