interface IArticle {
  title: string
  date: string
  series: string
  title: string
  tags: string[]
  slug: string
  keywords: string
  description: string
  lastmod: string
  share: 'true' | 'false'
}

interface ITagsItem {
  name: string
  number: number
}

type ITags = ITagsItem[]

interface IHeadingItem {
  text: string
  level: number
  id: string
}

interface IArticleInfo extends IArticle {
  html: string
  heading: IHeadingItem[]
}

interface IPostItem {
  year: number
  list: IArticleInfo[]
}

interface IRejectResponse {
  code: -1
  err: string
}

interface IResolveResponse<T> {
  code: 0
  data: T
}

type IResponse<T> = IResolveResponse<T> | IRejectResponse