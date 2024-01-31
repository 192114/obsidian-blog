import { readFile } from 'fs'
import clsx from 'clsx'

import Tag from '@/components/Tag'
import Forward from '@/components/Forward'

import type { Metadata } from 'next'

import '@/styles/markdown.css'
import '@/styles/highlight.css'

interface ParamType {
  params: {
    slug: string;
  };
}

const getPostInfo = async (slug: string) => {
  const res: IResponse<IArticleInfo> = await new Promise((resolve, reject) => {
    readFile(`./content/data/${slug}.json`, 'utf-8', (err, data) => {
      if (err) {
        reject({
          err,
          code: -1,
        })
      } else {
        resolve({
          data: JSON.parse(data),
          code: 0,
        })
      }
    })
  })

  if (res.code === 0) {
    return res.data
  }

  return null
}

// 相同请求 nextjs 回合并 metadata 异步返回
export async function generateMetadata({
  params,
}: ParamType): Promise<Metadata> {
  const jobDetailInfo = await getPostInfo(params.slug)

  return {
    title: jobDetailInfo?.title,
    description: jobDetailInfo?.description,
    keywords: jobDetailInfo?.keywords,
  }
}

export default async function Article({ params }: ParamType) {
  const articleInfo = await getPostInfo(params.slug)

  const renderHeadAnchor = (headList: IHeadingItem[]) => {
    return (
      <ul className="list-none text-xs pl-20px mt-10px">
        {headList.map((item) => {
          return (
            <li key={item.id} className="mb-10px slide-enter">
              <a
                href={`#${item.id}`}
                className={clsx(
                  'hover:text-primary text-text-weak underline-text-weak hover:underline-primary underline'
                )}
              >
                {item.text}
              </a>

              {item.children && renderHeadAnchor(item.children)}
            </li>
          )
        })}
      </ul>
    )
  }

  if (!articleInfo) {
    return null
  }

  return (
    <>
      <aside className="fixed left-20px top-72px bottom-0px lg:w-160px <lg:hidden xl:w-280px opacity-30 text-text-weak hover:text-text hover:cursor-pointer hover:opacity-100 transition group">
        <i className="i-lucide-text text-2xl ml-20px"></i>
        <div className="mt-20px group-hover:block hidden">
          {renderHeadAnchor(articleInfo.heading)}
        </div>
      </aside>
      <main className="max-w-682px mx-auto mt-80px slide-enter px-16px">
        <h1 className="mb-10px">{articleInfo?.title}</h1>
        <div className="text-sm text-text-weak flex items-center justify-between mb-20px">
          <div>
            <span>{articleInfo?.date}</span>
            <span className="ml-10px">
              {articleInfo?.tags?.map((item) => (
                <Tag key={item} text={item} />
              ))}
            </span>
          </div>
          {articleInfo?.lastmod && (
            <span>最近修改时间：{articleInfo?.lastmod}</span>
          )}
        </div>

        <article
          dangerouslySetInnerHTML={{ __html: articleInfo.html }}
          className="markdown-body pb-60px"
          data-theme="dark"
        />

        <Forward />
      </main>
    </>
  )
}
