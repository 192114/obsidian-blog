import type { Metadata } from 'next'
import clsx from 'clsx'
import Header from '@/components/Header'
import CanvasBackground from '@/components/CanvasBackground'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'shadow blog',
  description: '个人博客',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-p-t-64px">
      <body className={clsx('bg-background text-text')}>
        <Header />

        {/* 主体内容区 */}
        {children}

        <CanvasBackground />
      </body>
    </html>
  )
}
