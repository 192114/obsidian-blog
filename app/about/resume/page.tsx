export default function Resume() {
  return (
    <main className="max-w-21cm mx-auto my-16px min-h-29.7cm flex ring-2px ring-primary/10 shadow-active shadow-lg text-sm text-text">
      <div className="w-1/3 bg-card-background/20 p-12px">
        <div className="">
          <h2>Shadow Sun</h2>

          <h3>前端开发工程师</h3>

          <div className="text-text-weak text-xs">
            <div>5 + 年前端开发经验</div>
            <div className="mt-5px">
              熟练使用HTML/CSS/Javascript，以及React/Nextjs/Vue等框架
            </div>
            <div className="mt-5px">
              熟悉Antd/Element plus等UI框架，熟悉Tailwindcss原子类方案，同时关注Unocss方案，以及各种css预处理方案
            </div>
            <div className="mt-5px">
              熟悉Typescript，以及Vite，并结合eslint，prettier等工具创建项目
            </div>
            <div className="mt-5px">了解Monorepo方案，并对Turborepo有一定的实践</div>
            <div className="mt-5px">了解Electron，并使用其开发过一些小工具</div>
            <div className="mt-5px">熟悉Git等版本控制工具</div>
          </div>
        </div>

        <div className="py-20px border-0px border-t-1px border-border border-solid mt-20px">
          <div className="flex-y-center">
            <div className="rounded-full bg-card-background flex-center w-30px h-30px">
              <i className="i-lucide-code-2 text-18px"></i>
            </div>
            <div className="text-text-weak ml-2 text-xs">
              <p className="m-0 p-0">
                <span className="bg-card-background p-1 rounded-md mx-1 text-text-weak">
                  Javascript
                </span>
                <span className="bg-card-background p-1 rounded-md mx-1 text-text-weak">
                  CSS
                </span>
                <span className="bg-card-background p-1 rounded-md mx-1 text-text-weak">
                  HTML
                </span>
              </p>
            </div>
          </div>
          <div className="flex-y-center mt-6px">
            <div className="rounded-full bg-card-background flex-center w-30px h-30px">
              <i className="i-lucide-code-square text-18px"></i>
            </div>
            <div className="text-text-weak ml-2 text-xs">
              <p className="m-0 p-0">
                <span className="bg-card-background p-1 rounded-md mx-1 text-text-weak">
                  React
                </span>
                <span className="bg-card-background p-1 rounded-md mx-1 text-text-weak">
                  Nextjs
                </span>
                <span className="bg-card-background p-1 rounded-md mx-1 text-text-weak">
                  Vue
                </span>
              </p>
            </div>
          </div>

          <div className="flex-y-center mt-6px">
            <div className="rounded-full bg-card-background flex-center w-30px h-30px">
              <i className="i-lucide-code text-18px"></i>
            </div>
            <div className="text-text-weak ml-2 text-xs">
              <p className="m-0 p-0">
                <span className="bg-card-background p-1 rounded-md mx-1 text-text-weak">
                  Typescript
                </span>
                <span className="bg-card-background p-1 rounded-md mx-1 text-text-weak">
                  Vite
                </span>
                <span className="bg-card-background p-1 rounded-md mx-1 text-text-weak">
                  Turborepo
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="py-20px border-0px border-t-1px border-border border-solid">
          <div className="flex-y-center">
            <div className="rounded-full bg-card-background flex-center w-30px h-30px">
              <i className="i-lucide-school text-18px"></i>
            </div>
            <div className="text-text-weak ml-2 text-xs">
              <p className="m-0 p-0">学校</p>
              <p className="m-0 p-0 text-text">沈阳工业大学</p>
            </div>
          </div>

          <div className="flex-y-center mt-12px">
            <div className="rounded-full bg-card-background flex-center w-30px h-30px">
              <i className="i-lucide-mail text-18px"></i>
            </div>
            <div className="text-text-weak ml-2 text-xs">
              <p className="m-0 p-0">邮箱</p>
              <p className="m-0 p-0 text-text">shadowSun192114@gmail.com</p>
            </div>
          </div>

          <div className="flex-y-center mt-12px">
            <div className="rounded-full bg-card-background flex-center w-30px h-30px">
              <i className="i-lucide-phone text-18px"></i>
            </div>
            <div className="text-text-weak ml-2 text-xs">
              <p className="m-0 p-0">联系方式</p>
              <p className="m-0 p-0 text-text">15698852685</p>
            </div>
          </div>

          <div className="flex-y-center mt-12px">
            <div className="rounded-full bg-card-background flex-center w-30px h-30px">
              <i className="i-lucide-map-pin text-18px"></i>
            </div>
            <div className="text-text-weak ml-2 text-xs">
              <p className="m-0 p-0">地址</p>
              <p className="m-0 p-0 text-text">大连</p>
            </div>
          </div>

          <div className="flex-y-center mt-12px">
            <div className="rounded-full bg-card-background flex-center w-30px h-30px">
              <i className="i-lucide-link text-18px"></i>
            </div>
            <div className="text-text-weak ml-2 text-xs">
              <p className="m-0 p-0">个人网站</p>
              <p className="m-0 p-0 text-text">https://shadow-sun.vercel.app</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-2/3 bg-card-background"></div>
    </main>
  )
}
