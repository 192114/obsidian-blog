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
  children?: IHeadingItem[]
}

interface IArticleInfo extends IArticle {
  html: string
  heading: IHeadingItem[]
}

interface ITokenItem {
  type: string
  text?: string
  raw: string
  depth?: number
  tokens?: ITokenItem[]
}

interface ISearchItem extends IArticle {
  tokens: ITokenItem[]
}

interface IPostItem {
  year: number
  list: IArticle[]
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