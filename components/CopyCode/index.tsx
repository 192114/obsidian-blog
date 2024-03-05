'use client'

import { useEffect } from 'react'

export default function CopyCode() {
  useEffect(() => {
    const div = document.createElement('div')
    const copyBtn = '<button class="button-reset bg-primary text-white rounded-6px hover:text-white hover:bg-primary flex-center fade-in"><i class="i-lucide-clipboard-copy text-base"></i></button>'
    const copySuccessBtn = '<button class="button-reset bg-success text-white rounded-6px hover:text-white hover:bg-success flex-center fade-in"><i class="i-lucide-book-check text-base"></i></button>'
    div.innerHTML = copyBtn
    div.className = 'absolute top-0 right-0'
    div.setAttribute('title', '点击复制')
    document.querySelectorAll('pre').forEach((block) => {
      const copy = div.cloneNode(true) as Element
      let timeout: ReturnType<typeof setTimeout>
      block.appendChild(copy)
     
      block.onclick = function () {
        navigator.clipboard.writeText(block.textContent as string)
        copy.innerHTML = copySuccessBtn
        clearTimeout(timeout)
        timeout = setTimeout(function () {
          copy.innerHTML = copyBtn
        }, 3000)
      }
    })
  }, [])
  return null
}
