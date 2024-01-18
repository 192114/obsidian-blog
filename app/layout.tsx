import type { Metadata } from 'next'
import clsx from 'clsx'
import Header from '@/components/Header'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'shadow',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
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
