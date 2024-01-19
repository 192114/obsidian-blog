// 网站首页
import PostItem from '@/components/PostItem'

export default function Home() {
  return (
    <main className="max-w-650px mx-auto mt-80px">
      <div>
        <div className="relative h-20">
          <span className="text-7em color-transparent absolute left--4rem top-0rem font-bold text-stroke-3 text-stroke-text-weak op10">
            2023
          </span>
        </div>
        <PostItem />
        <PostItem />
      </div>
    </main>
  )
}
