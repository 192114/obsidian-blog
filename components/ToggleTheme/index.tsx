'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'

export default function ToggleTheme() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('auto')

  const themeHandle = (targetTheme: 'light' | 'dark' | 'auto') => {
    let nextTheme = targetTheme
    if (targetTheme === 'auto') {
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
      nextTheme = darkModeQuery.matches ? 'dark' : 'light'
    }

    nextTheme === 'light'
      ? document.documentElement.classList.remove('dark')
      : document.documentElement.classList.add('dark')

    document.documentElement.setAttribute(
      'style',
      nextTheme === 'light' ? 'color-scheme: light;' : 'color-scheme: dark;'
    )

    setTheme(targetTheme)
  }

  const changeTheme = (targetTheme: 'light' | 'dark' | 'auto') => {
    if (targetTheme === theme) {
      return
    }

    themeHandle(targetTheme)
  }

  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const themeChangeHandle = (e: MediaQueryListEvent) => {
      console.log('change', e)
      if (theme === 'auto') {
        themeHandle('auto')
      }
    }

    darkModeQuery.addEventListener('change', themeChangeHandle)

    return () => {
      darkModeQuery.removeEventListener('change', themeChangeHandle)
    }
  }, [theme])

  return (
    <div className="w-88px h-24px flex-y-center b-border rounded-4px cursor-pointer b-1px b-solid">
      <div
        className={clsx(
          'flex-1 h-full flex-center',
          theme === 'auto' && 'bg-active'
        )}
        onClick={() => changeTheme('auto')}
      >
        <i
          className={clsx(
            'i-lucide-monitor',
            theme === 'auto' ? 'bg-primary' : 'hover:bg-secondary'
          )}
        />
      </div>
      <div
        className={clsx(
          'flex-1 h-full flex-center',
          theme === 'light' && 'bg-active'
        )}
        onClick={() => changeTheme('light')}
      >
        <i
          className={clsx(
            'i-lucide-sun',
            theme === 'light' ? 'bg-primary' : 'hover:bg-secondary'
          )}
        />
      </div>
      <div
        className={clsx(
          'flex-1 h-full flex-center',
          theme === 'dark' && 'bg-active'
        )}
        onClick={() => changeTheme('dark')}
      >
        <i
          className={clsx(
            'i-lucide-moon',
            theme === 'dark' ? 'bg-primary' : 'hover:bg-secondary'
          )}
        />
      </div>
    </div>
  )
}
