'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import ToggleTheme from '@/components/ToggleTheme'

export default function Header() {
  const [hasScroll, setHasScroll] = useState(false)
  useEffect(() => {
    const scrollListener = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      setHasScroll(scrollTop > 0)
    }

    window.addEventListener('scroll', scrollListener)
    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <header className={clsx('sticky top-0 z-50 w-full p-x-8 py-4 bg-background-80 backdrop-filter backdrop-blur-5px', hasScroll && 'shadow-md')}>
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
  )
}
