import Link from 'next/link'
import Tag from '@/components/Tag'

export default function PostItem(props: IArticle) {
  const shortDate = (date: string) => {
    return date.slice(5)
  }


  return (
    <Link href={`/post/${props.slug}`}>
      <div className="flex-y-center justify-between gap-30px mb-20px slide-enter">
        <div className="flex-y-center gap-10px">
          <span className="text-text-weak text-xs">{shortDate(props.date)}</span>
          <span className="text-text font-400">{props.title}</span>
        </div>

        <div className="flex-y-center gap-8px">
          {
            props.tags?.map((item) => (
              <Tag key={item} text={item} />
            ))
          }
        </div>
      </div>
    </Link>
  )
}
