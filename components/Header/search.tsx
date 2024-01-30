import { readFile } from 'fs'
import SearchInput from './searchInput'

const getSearchList = async () => {
  const res = await new Promise<IResponse<IArticleInfo[]>>((resolve, reject) => {
    readFile('./content/data/all.json', 'utf8', (err, data) => {
      if (err) {
        reject({
          err,
          code: -1
        })
      } else {
        resolve({
          data: JSON.parse(data),
          code: 0
        })
      }
    })
  })

  if (res.code === 0) {
    return res.data
  }

  return null
}

export default async function SearchBar() {
  const list = await getSearchList()

  if (!list || list.length === 0) {
    return null
  }
  
  return <SearchInput data={list} />
}
