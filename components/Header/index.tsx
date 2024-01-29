'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import ToggleTheme from '@/components/ToggleTheme'

export default function Header() {
  const [hasScroll, setHasScroll] = useState(false)
  const [showBackTop, setshowBackTop] = useState(false)
  useEffect(() => {
    const scrollListener = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      setHasScroll(scrollTop > 0)

      setshowBackTop(scrollTop > 200)
    }

    window.addEventListener('scroll', scrollListener)
    // 默认检测是否滚动
    scrollListener()
    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <>
      <header
        className={clsx(
          'sticky top-0 z-50 w-full p-x-8 py-4 bg-background-80 backdrop-filter backdrop-blur-5px',
          hasScroll && 'shadow-md'
        )}
      >
        <nav className="flex-y-center h-full w-full gap-4 justify-end">
          <Link href="/" className="flex-center">
            a
          </Link>
          <Link href="/" className="flex-center">
            b
          </Link>
          <Link href="/" className="flex-center">
            c
          </Link>
          <Link
            href="https://github.com/192114"
            target="_blank"
            className="flex-center"
          >
            <i className="i-lucide-github"></i>
          </Link>

          <ToggleTheme />
        </nav>
      </header>
      <button
        className={clsx(
          'border-none bg-transparent text-text-weak text-lg fixed bottom-4 right-4 cursor-pointer hover:text-primary opacity-0 transition-all duration-300',
          showBackTop && 'opacity-100', 
          !showBackTop && 'pointer-events-none'
        )}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <i className="i-lucide-arrow-up"></i>
      </button>
    </>
  )
}
