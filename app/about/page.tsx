import Link from 'next/link'

export default function About() {
  return (
    <main className="max-w-682px mx-auto px-16px">
      <h3 className="mt-50px">关于博客</h3>
      <div className="text-sm text-text">
        <p>
          博客基于
          <Link
            className="bg-card-background p-1 rounded-md mx-1 text-text-weak inline-flex items-center"
            href="https://nextjs.org/"
            target="_blank"
          >
            Next.js
            <i className="i-lucide-arrow-up-right-from-square ml-1"></i>
          </Link>
          开发，并采用
          <Link
            className="bg-card-background p-1 rounded-md mx-1 text-text-weak inline-flex items-center"
            href="https://unocss.dev/"
            target="_blank"
          >
            UnoCSS
            <i className="i-lucide-arrow-up-right-from-square ml-1"></i>
          </Link>
          原子类框架，部署在Vercel上。
        </p>
        <p>
          <Link
            className="bg-card-background p-1 rounded-md mr-1 text-text-weak inline-flex items-center"
            href="https://obsidian.md/"
            target="_blank"
          >
            Obsidian
            <i className="i-lucide-arrow-up-right-from-square ml-1"></i>
          </Link>
          记录笔记，并通过github同步笔记内容，使用插件
          <span className="bg-card-background p-1 rounded-md mx-1 text-text-weak">
            github publisher
          </span>
          和
          <span className="bg-card-background p-1 rounded-md mx-1 text-text-weak">
            obsidian git
          </span>
          来同步，并通过github的action自动将markdown转换为html
        </p>
        <p>
          Github仓库：
          <Link
            href="https://github.com/192114/obsidian-blog"
            target="_blank"
            className="underline hover:text-primary"
          >
            https://github.com/192114/obsidian-blog
          </Link>
          ， 欢迎star，也欢迎PR😊
        </p>

        <p className="flex-y-center">
          Inspired by
          <Link
            className="bg-card-background p-1 rounded-md mx-1 text-text-weak inline-flex items-center"
            href="https://antfu.me/"
            target="_blank"
          >
            https://antfu.me/
            <i className="i-lucide-arrow-up-right-from-square ml-1"></i>
          </Link>
        </p>

        <p className="flex-y-center">
          所有记录内容均为个人日常学习和工作学习中的记录，如有不妥之处欢迎指出{' '}
          <a
            href="mailto:shadowsun192114@gmail.com"
            className="i-lucide-mail text-lg mx-2 hover:text-primary"
          ></a>
          (*^▽^*)┛
        </p>

        <h3 className="mt-30px">关于我</h3>
        <p>
          前端开发，从业多年，熟练使用前端三剑客
          <span className="bg-card-background p-1 rounded-md mx-1 text-text-weak">
            javascript
          </span>
          <span className="bg-card-background p-1 rounded-md mx-1 text-text-weak">
            css
          </span>
          <span className="bg-card-background p-1 rounded-md mx-1 text-text-weak">
            html
          </span>，
          曾经熟练使用<span className="bg-card-background p-1 rounded-md mx-1 text-text-weak">
            Jquery
          </span>现在熟练使用<span className="bg-card-background p-1 rounded-md mx-1 text-text-weak">React</span>及周边生态，
          
        </p>
      </div>
    </main>
  )
}
