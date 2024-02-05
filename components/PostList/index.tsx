import { readFile } from 'fs'
import path from 'path'

import PostItem from '@/components/PostItem'
import Filter from './filter'

export type PostProps = {
  tag: string | null;
};

const getPostsData = async (tag: PostProps['tag']) => {
  const res: IResponse<IPostItem[]> = await new Promise((resolve, reject) => {
    const filePath = path.join(process.cwd(), 'content', 'data', 'list.json')

    readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject({
          err,
          code: -1,
        })
      } else {
        const dataParse = JSON.parse(data) as IPostItem[]

        let filterData = dataParse

        if (tag) {
          filterData = []

          dataParse.forEach((item) => {
            const children = item.list.filter((inner) =>
              inner.tags.includes(tag)
            )
            if (children.length > 0) {
              filterData.push({
                ...item,
                list: children,
              })
            }
          })
        }

        resolve({
          data: filterData,
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

export default async function PostList({ tag }: PostProps) {
  const posts = await getPostsData(tag)

  if (!posts) {
    return null
  }

  return (
    <>
      {tag && <Filter tag={tag} />}

      {posts?.map((item) => {
        return (
          <div key={item.year}>
            <div className="relative h-20">
              <span className="text-7em color-transparent absolute left--4rem top-0rem font-bold text-stroke-3 text-stroke-text-weak op10 <md:left-0">
                {item.year}
              </span>
            </div>
            {item.list.map((item) => {
              return <PostItem key={item.slug} {...item} />
            })}
          </div>
        )
      })}
    </>
  )
}
