// 网站首页
import dynamic, { DynamicOptions } from 'next/dynamic'

const PostList = dynamic<unknown>(
  (() => import('@/components/PostList')) as DynamicOptions<unknown>,
  {
    loading: () => <div>1</div>,
  }
)

export default async function Home() {
  return (
    <main className="max-w-650px mx-auto mt-80px">
      <PostList />
    </main>
  )
}
