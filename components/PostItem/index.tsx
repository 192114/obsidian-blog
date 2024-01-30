'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Tag from '@/components/Tag'

export default function PostItem(props: IArticle) {
  const router = useRouter()
  const shortDate = (date: string) => {
    return date.slice(5)
  }

  return (
    <div
      className="flex-y-center justify-between gap-30px mb-20px slide-enter group cursor-pointer"
      onClick={() => router.push(`/post/${props.slug}`)}
    >
      <div className="flex-y-center gap-10px">
        <span className="text-text-weak text-xs group-hover:text-primary">
          {shortDate(props.date)}
        </span>
        <span className="text-text font-400 group-hover:text-primary">
          {props.title}
        </span>
      </div>

      <div className="flex-y-center gap-8px">
        {props.tags?.map((item) => (
          <Link href={`/?tag=${item}`} key={item} replace>
            <Tag
              text={item}
              className="group-hover:text-primary group-hover:underline"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
