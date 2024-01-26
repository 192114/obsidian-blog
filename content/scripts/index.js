const { marked } = require('marked')
const { markedHighlight } = require('marked-highlight') 
const hljs = require('highlight.js')
const createDOMPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const fs = require('fs')
const path = require('path')

const window = new JSDOM('').window
const DOMPurify = createDOMPurify(window)

let headingList = []
let isFirstH2Tag = false

// 设置锚点
// 解析文章属性 文章属性用的是h2 标签包裹 解析第一个h2标签
function markedSetHeadingId() {
  return {
    hooks: {
      preprocess: (markdown) => {
        headingList = []
        isFirstH2Tag = true
        return markdown
      }
    },
    renderer: {
      heading(text, level, raw, slugger) {
        const id = `anchor-${text}`
        const headingInfo = {text, level, id}
        if (level === 2 && isFirstH2Tag) {
          return ''
        }
        isFirstH2Tag = false
        headingList.push(headingInfo)
        return `<h${level} id="${id}">${text}</h${level}>\n`
      }
    }
  }
} 

marked.use(markedSetHeadingId())
marked.use(markedHighlight({
  langPrefix: 'hljs language-',
  highlight(code, lang, info) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext'
    return hljs.highlight(code, { language }).value
  }
}))

function markedHandle(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')

  const htmlOrigin = marked.parse(content)
  const html = DOMPurify.sanitize(htmlOrigin)
  const heading = [...headingList]

  const vNode = marked.lexer(content)

  // 获取文章属性
  const firstHeadIndex = vNode.findIndex(
    (item) => item.type === 'heading' && item.depth === 2
  )
  const attributesToken = vNode[firstHeadIndex].tokens

  const textList = attributesToken.filter((item) => item.type === 'text')
  const tagsStartIndex = textList.findIndex(
    (item) => item.text.indexOf('tags:') !== -1
  )

  const tags = []
  let tagsLastIndex = 0
  for (let j = tagsStartIndex + 1; j < textList.length; j++) {
    const element = textList[j]
    if (element.text.indexOf(':') >= 0) {
      break
    } else {
      tags.push(element.text.replace(/[(\s)|-]*/g, ''))
      tagsLastIndex = j
    }
  }

  const attributes = {
    tags,
  }
  const textListNoTags = [
    ...textList.slice(0, tagsStartIndex),
    ...textList.slice(tagsLastIndex + 1),
  ]

  textListNoTags.forEach((element) => {
    const item = element.text

    const [key, value] = item.split(':')

    attributes[key.trim()] = value.trim()
  })

  return {
    html,
    heading,
    ...attributes,
  }
}

// 如果文件夹不存在则创建
if (!fs.existsSync('./content/data')) {
  fs.mkdirSync('./content/data')
}

// 读取所有文件
const posts = []
fs.readdir('./content/posts', (err, files) => {
  if (err) {
    console.error(err)
    return
  }

  const fileMdList = files.filter((item) => path.extname(item) === '.md')

  // 所有tag标签及数量
  const tagsNumber = {}

  for (let i = 0; i < fileMdList.length; i++) {
    const element = fileMdList[i]

    const obj = markedHandle(`./content/posts/${element}`)

    const year = new Date(obj.date).getFullYear()

    const currentByYear = posts.find((item) => item.year === year)

    const { html, heading, ...currentNoHtml } = obj

    // 文章年份分类
    if (currentByYear) {
      let len = currentByYear.list.length
      // const pre = currentByYear.list[lastIndex]
      while(len > 0) {
        const pre = currentByYear.list[len - 1]
        const preTime = new Date(pre.date).getTime()
        const curTime = new Date(currentNoHtml.date).getTime()

        if (preTime >= curTime) {
          currentByYear.list.splice(len, 0, currentNoHtml)
          break
        } else {
          len -= 1
          if (len === 0) {
            currentByYear.list.unshift(currentNoHtml)
            break
          }
        }

      }
    } else {
      posts.push({
        year,
        list: [currentNoHtml],
      })
    }

    // 文章标签分类数量
    obj.tags.forEach((tag) => {
      if (tagsNumber[tag]) {
        tagsNumber[tag] += 1
      } else {
        tagsNumber[tag] = 1
      }
    })

    // 分别写入文章详情
    fs.writeFile(
      `./content/data/${obj.slug}.json`,
      JSON.stringify(obj),
      (err) => {
        if (err) {
          console.error(err)
          return
        }
      }
    )
  }

  fs.writeFile('./content/data/list.json', JSON.stringify(posts), (err) => {
    if (err) {
      console.error(err)
      return
    }

    console.log('写入list.json成功')
  })

  const tagsNumberList = Object.entries(tagsNumber).map((item) => {
    return {
      name: item[0],
      number: item[1],
    }
  })

  fs.writeFile('./content/data/tags.json', JSON.stringify(tagsNumberList), (err) => {
    if (err) {
      console.error(err)
      return
    }

    console.log('写入tags.json成功')
  })
})
