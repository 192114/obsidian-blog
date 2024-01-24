import { readFile } from 'fs'

import PostItem from '@/components/PostItem'

const getPostsData = async () => {
  const res: IResponse<IPostItem[]> = await new Promise((resolve, reject) => {
    readFile('./content/data/list.json', 'utf-8', (err, data) => {
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

export default async function PostList() {
  const posts = await getPostsData()

  if (!posts) {
    return null
  }

  return (
    <>
      {posts?.map((item) => {
        return <div key={item.year}>
          <div className="relative h-20">
            <span className="text-7em color-transparent absolute left--4rem top-0rem font-bold text-stroke-3 text-stroke-text-weak op10">
              {item.year}
            </span>
          </div>
          {item.list.map((item) => {
            return <PostItem key={item.slug} {...item} />
          })}
        </div>
      })}
    </>
  )
}
