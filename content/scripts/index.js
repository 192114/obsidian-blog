const { marked } = require('marked')
const { markedHighlight } = require('marked-highlight')
const hljs = require('highlight.js')
const createDOMPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const fs = require('fs')
const path = require('path')

function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file, index) => {
      const curPath = path.join(folderPath, file)
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(folderPath)
  }
}
// 删除文件夹下的所有文件和文件夹
deleteFolderRecursive('./content/data')

const window = new JSDOM('').window
const DOMPurify = createDOMPurify(window)

let headingList = []
let flatHeadingList = []
let isFirstH2Tag = false
let minLevel = 1

function checkSameLevel(current, targetList) {
  if (!targetList || targetList.length === 0) {
    targetList.push(current)
  } else {
    const lastIndex = targetList.length - 1
    if (targetList[lastIndex].level < current.level) {
      if (!targetList[lastIndex].children) {
        targetList[lastIndex].children = []
      }
      checkSameLevel(current, targetList[lastIndex].children)
    } else {
      targetList.push(current)
    }
  }
}

// 设置锚点
// 解析文章属性 文章属性用的是h2 标签包裹 解析第一个h2标签
function markedSetHeadingId() {
  return {
    hooks: {
      preprocess: (markdown) => {
        headingList = []
        flatHeadingList = []
        isFirstH2Tag = true
        minLevel = 1
        return markdown
      },
    },
    renderer: {
      heading(text, level, raw, slugger) {
        const id = `anchor-${text}`
        const headingInfo = { text, level, id }
        // 默认为第一项
        if (level === 2 && isFirstH2Tag) {
          return ''
        }
        isFirstH2Tag = false

        flatHeadingList.push(text)

        /**
         * 锚点规则 level 是 h 标签的 1 - 6
         * 首次添加 并记录当前level为最小level
         * 凡是level 小于等于最小level的均视为一级heading
         * 大于最小level的均视为下级heading 进入递归调用
         * 比较子集中的最后一项 level
         * 小于等于该最后一项 level 则视为该级的heading
         * 大于该最后一项 level 则进行递归调用
         *
         * 同级别中可能存在多个级别的heading
         * 使用时尽量保持规范 避免该问题
         *
         */
        if (headingList.length === 0) {
          headingList.push(headingInfo)
          minLevel = level
        } else {
          // 凡是出现大于最大level的heading 都作为第一层添加
          if (level <= minLevel) {
            headingList.push(headingInfo)
          } else {
            // 小于最大level 则和当前分支比较 查找当前分支 相同级别后添加
            // 默认从最新项第二层开始
            const lastIndex = headingList.length - 1
            if (!headingList[lastIndex].children) {
              headingList[lastIndex].children = []
            }
            const targetList = headingList[lastIndex].children
            checkSameLevel(headingInfo, targetList)
          }
        }

        return `<h${level} id="${id}">
        <a href="#${id}" class="anchor" aria-hidden="true"><span class="octicon octicon-link"></span></a>
        ${text}
        </h${level}>\n`
      },
    },
  }
}

marked.use(markedSetHeadingId())
marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    },
  })
)

function markedHandle(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')

  const htmlOrigin = marked.parse(content)
  const html = DOMPurify.sanitize(htmlOrigin)
  const heading = [...headingList]
  const flatHeading = [...flatHeadingList]

  const vNode = marked.lexer(content)
  const reg = /<a href=\"(.*)\.md\"/g
  const htmlFormatLink = html.replace(reg, (str) => {
    return str.slice(0, str.length - 4) + '"'
  })

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
    html: htmlFormatLink,
    heading,
    flatHeading,
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
  const allList = []

  for (let i = 0; i < fileMdList.length; i++) {
    const element = fileMdList[i]

    const obj = markedHandle(`./content/posts/${element}`)

    const year = new Date(obj.date).getFullYear()

    const currentByYear = posts.find((item) => item.year === year)

    const { html, heading, flatHeading, ...currentNoHtml } = obj

    // 文章年份分类
    if (currentByYear) {
      let len = currentByYear.list.length
      while (len > 0) {
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

    // 记录所有文章 用于搜索
    allList.push({
      heading: flatHeading,
      title: currentNoHtml.title,
      slug: currentNoHtml.slug,
    })

    // 分别写入文章详情
    fs.writeFile(
      `./content/data/${obj.slug}.json`,
      JSON.stringify({ html, heading, ...currentNoHtml }),
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

  fs.writeFile('./content/data/all.json', JSON.stringify(allList), (err) => {
    if (err) {
      console.error(err)
      return
    }

    console.log('写入all.json成功')
  })

  const tagsNumberList = Object.entries(tagsNumber).map((item) => {
    return {
      name: item[0],
      number: item[1],
    }
  })

  fs.writeFile(
    './content/data/tags.json',
    JSON.stringify(tagsNumberList),
    (err) => {
      if (err) {
        console.error(err)
        return
      }

      console.log('写入tags.json成功')
    }
  )
})
