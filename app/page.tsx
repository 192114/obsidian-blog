// 网站首页
import dynamic, { DynamicOptions } from 'next/dynamic'
import CanvasBackground from '@/components/CanvasBackground'

import type {PostProps} from '@/components/PostList'

const PostList = dynamic<PostProps>(
  (() => import('@/components/PostList')) as DynamicOptions<PostProps>
)

interface IHomeProps {
  searchParams: {
    tag?: string
  }
}

export default async function Home({
  searchParams,
}: IHomeProps) {
  const tag = searchParams?.tag || null
  return (
    <>
      <CanvasBackground />
      <main className="max-w-682px mx-auto mt-80px px-16px">
        <PostList tag={tag} />
      </main>
    </>
  )
}
