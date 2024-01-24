const { marked } = require('marked')
const fs = require('fs')
const path = require('path')

function markedHandle(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')

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

  const realContent = [
    ...vNode.slice(0, firstHeadIndex),
    ...vNode.slice(firstHeadIndex + 1),
  ]

  const html = marked.parser(realContent)

  return {
    html,
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

  for (let i = 0; i < fileMdList.length; i++) {
    const element = fileMdList[i]

    const obj = markedHandle(`./content/posts/${element}`)

    const year = new Date(obj.date).getFullYear()

    const currentByYear = posts.find((item) => item.year === year)

    const { html, ...currentNoHtml } = obj

    if (currentByYear) {
      currentByYear.list.push(currentNoHtml)
    } else {
      posts.push({
        year,
        list: [currentNoHtml],
      })
    }

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

    console.log('写入成功')
  })
})
