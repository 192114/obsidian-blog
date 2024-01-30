'use client'

import { useEffect, useRef, useTransition, useState } from 'react'
import Fuse, {FuseResult} from 'fuse.js/min-basic'

export interface ISearchInputProps {
  data: ISearchItem[]
}

export default function SearchInput({data}: ISearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const fuseRef = useRef<Fuse<ISearchItem> | null>(null)
  const [_, startTransition] = useTransition()
  const [searchList, setSearchList] = useState<FuseResult<ISearchItem>[]>([])
  useEffect(() => {
    const keyboardListener = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        inputRef.current?.focus()
        e.preventDefault()
      }
    }
    document.addEventListener('keydown', keyboardListener)

    return () => {
      document.removeEventListener('keydown', keyboardListener)
    }
  }, [])

  useEffect(() => {
    fuseRef.current = new Fuse(data, {
      keys: ['title', 'otherTokens.text'],
      includeMatches: true,
      threshold: 0.3 // 0 精确匹配
    })
  }, [data])
  return (
    <div className="relative">
      <input
        className="border-border border-solid outline-none focus:ring-primary focus:ring-1px border-1px line-height-22px py-0 rounded-sm text-text-weak shadow-sm w-90px focus:w-180px text-xs transition-width bg-transparent"
        placeholder="ctrl k 快速搜索"
        ref={inputRef}
        onChange={(e) => {
          startTransition(() => {
            if (!fuseRef.current || !e.target.value) {
              return
            }
            const result = fuseRef.current.search(e.target.value)
            console.log(result)
            setSearchList(result)
          })
        }}
      />

      <div className="absolute rounded p-3 bg-card-background left-0 top-30px min-w-300px h-auto max-h-300px overflow-y-auto overflow-x-hidden">
        <ul className="list-none my-0">
          {
            searchList.map((item) => (
              <li key={item.item.slug} className="mb-2">
                {/* <div className="text-sm py-1 border-b-solid border-border border-1px">{item.item.title}</div> */}
                {
                  item.matches?.map((match) => {
                    if (!match.value) {
                      return null
                    }
                    return (
                      <div key={match.refIndex} className="text-text-weak text-xs py-1 border-b-solid border-border border-1px" dangerouslySetInnerHTML={{__html: match.value}}  />
                    )
                  })
                }
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}
