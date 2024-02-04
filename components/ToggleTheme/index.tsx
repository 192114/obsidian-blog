'use client'

import { useEffect, useState, useCallback, useContext, type MouseEvent } from 'react'
import clsx from 'clsx'
import { getNextTheme } from '@/libs'
import { type ThemeContextType } from '@/components/Header/context'

interface IToggleThemeProps {
  theme: ThemeContextType
  setTheme: (theme: ThemeContextType) => void
}

export default function ToggleTheme({ theme, setTheme }: IToggleThemeProps) {
  const themeHandle = useCallback((targetTheme: ThemeContextType) => {
    const { isLight } = getNextTheme(targetTheme)

    document.documentElement.classList.add(isLight ? 'light' : 'dark')
    document.documentElement.classList.remove(isLight ? 'dark' : 'light')

    document.documentElement.setAttribute(
      'style',
      isLight ? 'color-scheme: light;' : 'color-scheme: dark;'
    )

    setTheme(targetTheme)
  }, [setTheme])

  const changeTheme = (
    e: MouseEvent<HTMLDivElement>,
    targetTheme: ThemeContextType
  ) => {
    if (targetTheme === theme) {
      return
    }

    // 获取鼠标点击坐标
    const x = e.clientX
    const y = e.clientY
    const innerWidth = window.innerWidth
    const innerHeight = window.innerHeight

    // 开根号 计算过渡效果原型的半径
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )

    const { isLight } = getNextTheme(targetTheme)
    // @ts-ignore
    const transition = document.startViewTransition(() => {
      themeHandle(targetTheme)
    })

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]

      document.documentElement.animate(
        { clipPath: isLight ? clipPath.reverse() : clipPath },
        {
          duration: 500,
          easing: 'ease-in',
          pseudoElement: isLight
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        }
      )
    })
  }

  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const themeChangeHandle = (e: MediaQueryListEvent) => {
      if (theme === 'auto') {
        themeHandle('auto')
      }
    }

    darkModeQuery.addEventListener('change', themeChangeHandle)

    return () => {
      darkModeQuery.removeEventListener('change', themeChangeHandle)
    }
  }, [theme, themeHandle])

  useEffect(() => {
    themeHandle('auto')
  }, [themeHandle])

  return (
    <div className="w-88px h-24px flex-y-center b-border rounded-4px cursor-pointer b-1px b-solid overflow-hidden">
      <div
        className={clsx(
          'flex-1 h-full flex-center',
          theme === 'auto' && 'bg-active'
        )}
        onClick={(e) => changeTheme(e, 'auto')}
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
        onClick={(e) => changeTheme(e, 'light')}
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
        onClick={(e) => changeTheme(e, 'dark')}
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
