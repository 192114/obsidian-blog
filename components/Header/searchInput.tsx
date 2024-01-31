'use client'

import { useEffect, useRef, useTransition, useState } from 'react'
import Fuse, { FuseResult } from 'fuse.js/min-basic'
import clsx from 'clsx'

export interface ISearchInputProps {
  data: ISearchItem[];
}

export default function SearchInput({ data }: ISearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const fuseRef = useRef<Fuse<ISearchItem> | null>(null)
  const [_, startTransition] = useTransition()
  const [searchList, setSearchList] = useState<FuseResult<ISearchItem>[]>([])
  const [downmenuShow, setDownmenuShow] = useState(false)

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
      keys: ['title', 'tokens.tokens.text'],
      includeMatches: true,
      threshold: 0.3, // 0 精确匹配
    })
  }, [data])

  const onSearch = (val: string) => {
    if (!fuseRef.current || !val) {
      return
    }
    const result = fuseRef.current.search(val)
    console.log(result)
    setSearchList(result)
  }

  type RangeTuple = [number, number];

  const renderHighlight = (val: string, indexs: readonly RangeTuple[]) => {
    indexs.forEach((item) => {
      const [start, end] = item
      val = `${val.slice(
        0,
        start
      )}<span class="overflow-hidden rounded-sm bg-high-light px-1 text-text">${val.slice(
        start,
        end + 1
      )}</span>${val.slice(end + 1)}`
    })

    return val
  }

  return (
    <div className="relative">
      <input
        className="border-border border-solid outline-none focus:ring-primary focus:ring-1px border-1px line-height-22px py-0 rounded-sm text-text-weak shadow-sm w-100px focus:w-180px text-xs transition-width bg-transparent"
        placeholder="ctrl k 快速搜索"
        ref={inputRef}
        onBlur={() => {
          setTimeout(() => {
            setDownmenuShow(false)
          }, 50)
        }}
        onFocus={(e) => {
          onSearch(e.target.value)
          setTimeout(() => {
            setDownmenuShow(true)
          }, 50)
        }}
        onChange={(e) => {
          startTransition(() => {
            onSearch(e.target.value)
          })
        }}
      />

      {downmenuShow && (
        <div className="absolute rounded bg-background left-0 top-30px min-w-300px h-auto max-h-300px overflow-y-auto overflow-x-hidden border-border border-1px shadow-sm border-solid slide-enter">
          {searchList.length === 0 && (
            <div className="w-full h-100px flex-center text-border">
              <i className="i-lucide-package-2 text-30px"></i>
            </div>
          )}

          <ul className="list-none my-0">
            {searchList.map((item) => (
              <li key={item.item.slug} className="">
                {item.matches?.map((match) => {
                  if (!match.value) {
                    return null
                  }
                  return (
                    <div
                      key={match.refIndex}
                      className={clsx(
                        ' text-xs py-2 border-b-solid border-border border-1px flex-y-center gap-4 hover:bg-active hover:text-primary cursor-pointer px-4',
                        match.key === 'title' ? 'text-text' : 'text-text-weak'
                      )}
                    >
                      {match.key === 'title' ? (
                        <i className="i-lucide-file"></i>
                      ) : (
                        <i className="i-lucide-text"></i>
                      )}
                      <span
                        dangerouslySetInnerHTML={{
                          __html: renderHighlight(match.value, match.indices),
                        }}
                        className="flex-1"
                      />
                    </div>
                  )
                })}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
