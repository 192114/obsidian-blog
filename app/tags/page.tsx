import { readFile } from 'fs'
import path from 'path'
import Link from 'next/link'

import Tag from '@/components/Tag'
import CanvasBackground from '@/components/CanvasBackground'

const getTagsData = async () => {
  const filePath = path.join(process.cwd(), 'content', 'data', 'tags.json')
  const res: IResponse<ITagsItem[]> = await new Promise((resolve, reject) => {
    readFile(filePath, 'utf-8', (err, data) => {
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

export default async function Tags() {
  const tags = await getTagsData()

  if (!tags || tags.length === 0) {
    return null
  }

  return (
    <>
      <CanvasBackground />
      <main className="max-w-682px mx-auto px-16px">
        <div className="pt-40px flex items-center gap-4">
          {tags.map((item) => {
            return (
              <Link key={item.name} href={`/?tag=${item.name}`}>
                <Tag text={`${item.name} (${item.number})`} size="lg" />
              </Link>
            )
          })}
        </div>
      </main>
    </>
  )
}
