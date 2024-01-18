// 网站首页
import PostItem from '@/components/PostItem'

export default function Home() {
  return (
    <main className="max-w-650px mx-auto mt-80px">
      <div>
        <div className="relative h-20">
        <span className="text-8em color-transparent absolute left--3rem top--2rem font-bold text-stroke-2 text-stroke-hex-aaa op10">2023</span>
        </div>
        <PostItem />
        <PostItem />
      </div>
    </main>
  )
}
