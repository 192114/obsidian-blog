// 网站首页
import dynamic, { DynamicOptions } from 'next/dynamic'

const PostList = dynamic<unknown>(
  (() => import('@/components/PostList')) as DynamicOptions<unknown>
)

export default async function Home() {
  return (
    <main className="max-w-650px mx-auto mt-80px">
      <PostList />
    </main>
  )
}
