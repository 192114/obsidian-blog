'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

// 用于解析文章详情的参数 并滚动到对应位置
export default function AutoScroll() {
  const searchParams = useSearchParams()
  const anchor = searchParams.get('anchor')
  const index = searchParams.get('index')

  useEffect(() => {
    const parentElement = document.querySelector('.markdown-body')?.querySelectorAll('*')
    if (parentElement && anchor && index) {
      let counter = 0
      Array.from(parentElement).forEach((item) => {
        if ((item as HTMLElement).innerText.indexOf(anchor) >= 0) {
          if (counter === Number(index)) {
            item.scrollIntoView({ behavior: 'smooth', block: 'center' })
            return
          }
          counter += 1
        }
      })
    }
  }, [anchor, index])
  return null
}