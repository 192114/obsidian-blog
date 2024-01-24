import { readFile } from 'fs'

import type { Metadata } from 'next'

import 'github-markdown-css/github-markdown.css'

// TODO: marked-highlight 

interface ParamType {
  params: {
    slug: string
  }
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
export async function generateMetadata({ params }: ParamType): Promise<Metadata> {

  const jobDetailInfo = await getPostInfo(params.slug)

  return {
    title: jobDetailInfo?.title,
    description: jobDetailInfo?.description,
    keywords: jobDetailInfo?.keywords,
  } 
}



export default async function Article({ params }: ParamType) {
  const articleInfo = await getPostInfo(params.slug)

  if (!articleInfo) {
    return null
  }

  return <main className="max-w-650px mx-auto mt-80px slide-enter">
    <h2>{articleInfo?.title}</h2>
    <article dangerouslySetInnerHTML={{ __html: articleInfo.html }} className="markdown-body" data-theme="dark" />
  </main>
}