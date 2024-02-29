import type { Metadata } from 'next'
import clsx from 'clsx'
import Header from '@/components/Header'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'shadow blog',
  description: '个人博客',
  icons: [
    { rel: 'icon', url: '/favicons/favicon.ico' },
    {
      rel: 'app-touch-icon',
      url: '/favicons/apple-touch-icon.png',
    },
    {
      rel: 'manifest',
      url: '/favicons/site.webmanifest',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx('bg-background text-text')}>
        <Header />

        {/* 主体内容区 */}
        {children}
      </body>
    </html>
  )
}
