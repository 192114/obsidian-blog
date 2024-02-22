'use client'

import Link from 'next/link'
import { useRef } from 'react'
import ReactToPrint from 'react-to-print'

export default function Resume() {
  const printRef = useRef<HTMLDivElement | null>(null)
  return (
    <main className="py-40px">
      <div
        className="max-w-21cm mx-auto h-29.7cm flex ring-2px ring-primary/10 shadow-active text-sm text-text"
        ref={printRef}
      >
        <div className="w-1/3 bg-card-background/20 p-12px">
          <div className="">
            <h2>孙中雨</h2>

            <p className="flex-y-center">
              <i className="i-lucide-cake"></i>
              <span className="text-sm ml-4px">1992/06</span>

              <i className="i-lucide-person-standing ml-20px"></i>
              <span className="text-sm ml-4px">男</span>
            </p>

            <h3>前端开发工程师</h3>
          </div>

          <div className="py-20px border-0px border-t-1px border-border border-solid mt-20px">
            <div className="text-text-weak text-xs">
              <div>
                本人5年以上的前端开发经验，长期从事医疗类产品的开发。有能力解决复杂的页面逻辑
              </div>
              <div className="mt-8px">
                有学习自驱力，关注前沿技术，能快速掌握新的技术栈
              </div>
              <div className="mt-8px">
                严格要求编码规范，对设计模式和前端工程化有一定的涉猎
              </div>
              <div className="mt-8px">
                主导过技术栈的更换和升级，积累了一些老旧系统的改造经验
              </div>
              <div className="mt-8px">
                工作之外，乐于研究一些前沿技术，提升自己技术能力
              </div>
            </div>
          </div>

          <div className="py-20px border-0px border-t-1px border-border border-solid">
            <div className="flex-y-center">
              <div className="rounded-full bg-card-background flex-center w-30px h-30px">
                <i className="i-lucide-code-2 text-14px"></i>
              </div>
              <div className="text-text-weak ml-2 text-sm flex-1">
                <p className="m-0 p-0">
                  <span className="tag-style text-xs">Javascript</span>
                  <span className="tag-style text-xs">CSS</span>
                  <span className="tag-style text-xs">HTML</span>
                </p>
              </div>
            </div>
            <div className="flex-y-center mt-6px">
              <div className="rounded-full bg-card-background flex-center w-30px h-30px">
                <i className="i-lucide-code-square text-14px"></i>
              </div>
              <div className="text-text-weak ml-2 text-sm flex-1">
                <p className="m-0 p-0">
                  <span className="tag-style text-xs">React</span>
                  <span className="tag-style text-xs">Nextjs</span>
                  <span className="tag-style text-xs">Vue</span>
                </p>
              </div>
            </div>

            <div className="flex-y-center mt-6px">
              <div className="rounded-full bg-card-background flex-center w-30px h-30px">
                <i className="i-lucide-code text-14px"></i>
              </div>
              <div className="text-text-weak ml-2 text-sm flex-1">
                <p className="m-0 p-0">
                  <span className="tag-style text-xs">Typescript</span>
                  <span className="tag-style text-xs">Vite</span>
                  <span className="tag-style text-xs">Turborepo</span>
                </p>
              </div>
            </div>
          </div>

          <div className="py-20px border-0px border-t-1px border-border border-solid">
            <div className="flex-y-center">
              <div className="rounded-full bg-card-background flex-center w-30px h-30px">
                <i className="i-lucide-school text-14px"></i>
              </div>
              <div className="text-text-weak ml-2 text-xs">
                <p className="m-0 p-0">学校</p>
                <p className="m-0 p-0 text-text">沈阳工业大学</p>
              </div>
            </div>

            <div className="flex-y-center mt-16px">
              <div className="rounded-full bg-card-background flex-center w-30px h-30px">
                <i className="i-lucide-mail text-14px"></i>
              </div>
              <div className="text-text-weak ml-2 text-xs">
                <p className="m-0 p-0">邮箱</p>
                <p className="m-0 p-0 text-text">shadowSun192114@gmail.com</p>
              </div>
            </div>

            <div className="flex-y-center mt-16px">
              <div className="rounded-full bg-card-background flex-center w-30px h-30px">
                <i className="i-lucide-phone text-14px"></i>
              </div>
              <div className="text-text-weak ml-2 text-xs">
                <p className="m-0 p-0">联系方式</p>
                <p className="m-0 p-0 text-text">15698852685</p>
              </div>
            </div>

            <div className="flex-y-center mt-16px">
              <div className="rounded-full bg-card-background flex-center w-30px h-30px">
                <i className="i-lucide-map-pin text-14px"></i>
              </div>
              <div className="text-text-weak ml-2 text-xs">
                <p className="m-0 p-0">地址</p>
                <p className="m-0 p-0 text-text">大连</p>
              </div>
            </div>

            <div className="flex-y-center mt-16px">
              <div className="rounded-full bg-card-background flex-center w-30px h-30px">
                <i className="i-lucide-link text-14px"></i>
              </div>
              <div className="text-text-weak ml-2 text-xs">
                <p className="m-0 p-0">个人网站</p>
                <p className="m-0 p-0 text-text">
                  <Link href="https://shadow-sun.vercel.app">
                    https://shadow-sun.vercel.app
                  </Link>
                </p>
              </div>
            </div>

            <div className="flex-y-center mt-16px">
              <div className="rounded-full bg-card-background flex-center w-30px h-30px">
                <i className="i-lucide-github text-14px"></i>
              </div>
              <div className="text-text-weak ml-2 text-xs">
                <p className="m-0 p-0">Github</p>
                <p className="m-0 p-0 text-text">
                  <Link href="https://github.com/192114">
                    https://github.com/192114
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-2/3 bg-card-background py-22px px-20px text-sm">
          <ul className="timeline">
            <li className="timeline-item">
              <div className="timeline-point"></div>
              <div className="timeline-tail"></div>
              <div className="timeline-content">
                <h3 className="m-0">工作经历</h3>
                <div className="mt-10px bg-background p-12px rounded-lg overflow-hidden shadow-lg">
                  <div className="flex-y-center justify-between">
                    <span className="text-sm">中科软科技</span>
                    <span className="text-text-weak text-xs">
                      2016/2 - 2017/10
                    </span>
                  </div>
                  <div className="mt-8px text-xs text-text-weak">
                    车险类业务，负责Hybrid
                    App页面端开发，主要技术栈是Jquery/HTML/CSS。同时也参与由JavaWeb开发的内部管理工具的维护与开发。
                  </div>
                </div>

                <div className="mt-10px bg-background p-12px rounded-lg overflow-hidden shadow-lg">
                  <div className="flex-y-center justify-between">
                    <span className="text-sm">渔歌医疗</span>
                    <span className="text-text-weak text-xs">2017/11 - 今</span>
                  </div>
                  <div className="mt-8px text-xs text-text-weak">
                    医疗类相关，负责前端部分的技术选型以及初始项目搭建，引入eslint/prettier等工具，推动部分项目引入Typescript，针对特定项目使用Monorepo单一库管理模式。同时负责前端业务开发，主要技术栈为React/Vue。
                  </div>
                </div>
              </div>
            </li>

            <li className="timeline-item">
              <div className="timeline-point"></div>
              <div className="timeline-tail"></div>
              <div className="timeline-content">
                <h3 className="m-0">项目经历</h3>
                <div className="mt-10px bg-background p-12px rounded-lg overflow-hidden shadow-lg">
                  <div>公司内部大屏监管平台（PC/移动端）</div>
                  <div className="mt-6px text-xs text-text-weak flex">
                    <span className="w-72px">涉及技术：</span>
                    <span className="flex-1">
                      Typescript/React/Antd/NX/React Router/Echart等
                    </span>
                  </div>
                  <div className="mt-6px text-xs text-text-weak flex">
                    <span className="w-72px">项目描述：</span>
                    <span className="flex-1">
                      采用Monorepo的仓库管理方案，解决组件复用问题。基于Echart封装图表组件，并针对不同的图表提取配置，可自定义图表的样式，并配合网格拖拽库实现组件的拖拽和修改大小。数据方面支持本地静态数据和远端的接口请求。对样式高度抽象，提取出公共样式，支持文字颜色边距等属性的控制。自定义设计出的页面可根据具体屏幕尺寸自动适配。
                    </span>
                  </div>
                  <div className="mt-6px text-xs text-text-weak flex">
                    <span className="w-72px">项目职责：</span>
                    <ul className="flex-1 list-none p-0">
                      <li>项目技术选型及基础项目的搭建</li>
                      <li>配置属性的提取与抽象</li>
                      <li>可复用组件抽离</li>
                      <li>服务端接口联调</li>
                    </ul>
                  </div>

                  <div className="mt-6px text-xs text-text-weak flex">
                    <span className="w-72px">项目收获：</span>
                    <span className="flex-1">
                      通过独立完成该项目的前端部分，使我对可视化页面设计方案有了一定的认识，技术上实践了Monorepo(NX)和Typescript，让我对类型系统及单一仓库的管理方式有了初步的认识。该项目的落地，有效的减少大屏开发的任务，快速响应需求。
                    </span>
                  </div>
                </div>

                <div className="mt-10px bg-background p-12px rounded-lg overflow-hidden shadow-lg">
                  <div>云HIS系统</div>
                  <div className="mt-6px text-xs text-text-weak flex">
                    <span className="w-72px">涉及技术：</span>
                    <span className="flex-1">
                      Typescript/Vue/ElementPlus/Vue Router/Pinia/Tailwindcss等
                    </span>
                  </div>
                  <div className="mt-6px text-xs text-text-weak flex">
                    <span className="w-72px">项目描述：</span>
                    <span className="flex-1">
                      该项目包含门医生工作站，收款工作站，护士工作站，药房工作站等，满足基本的医院门诊功能。包含菜单、按钮、API级别的权限控制。
                    </span>
                  </div>
                  <div className="mt-6px text-xs text-text-weak flex">
                    <span className="w-72px">项目职责：</span>
                    <ul className="flex-1 list-none p-0">
                      <li>项目技术选型及基础部分的搭建</li>
                      <li>负责前端方面的权限设计及实现（菜单、按钮、API）</li>
                      <li>负责医嘱、人员管理、菜单管理等页面开发及接口对接</li>
                    </ul>
                  </div>

                  <div className="mt-6px text-xs text-text-weak flex">
                    <span className="w-72px">项目收获：</span>
                    <span className="flex-1">
                      通过参与本项目，使我对医院HIS系统的运转有一定的了解，增加了在相对复杂的应用上VUE的使用经验，锻炼了在处理复杂数据结构的能力。
                    </span>
                  </div>
                </div>

                <div className="mt-10px bg-background p-12px rounded-lg overflow-hidden shadow-lg">
                  <div className="mt-6px text-xs text-text-weak flex">
                    <span className="w-72px">其他项目：</span>
                    <ul className="flex-1 list-none p-0">
                      <li>
                        使用Electron开发过一些小工具（分屏器、截屏小工具）
                      </li>
                      <li className="mt-5px">
                        基于开源模型，使用threejs（@react-three/drei,@react-three/fiber）开发了一个3d应用，并本地化缓存（localForage
                        ），提高加载速并减少网络请求
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>

            <li className="timeline-item pb-0">
              <div className="timeline-point"></div>
              <div className="timeline-content">
                <h3 className="m-0">个人技能</h3>
                <div className="bg-background p-12px rounded-lg overflow-hidden shadow-lg mt-10px">
                  <ul className="flex-1 list-none p-0 text-xs">
                    <li>
                      熟练使用ES6/JavaScript/TypeScript，能灵活运用JS多范式的特性，理解TS静态类型在大型项目中的优势
                    </li>
                    <li className="mt-5px">
                      熟练使用React/Vue技术栈进行大型前端应用开发，熟悉MVVM模式，了解现代前端框架的原理
                    </li>
                    <li className="mt-5px">
                      熟练使用Vite、Webpack等前端工程管理工具，有比较好的工程能力
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-20px">
        <ReactToPrint
          // pageStyle={'@page { * { ring: 0;} }'}
          trigger={() => {
            return (
              <button className="button-reset border-1px border-solid border-primary text-primary rounded-md px-20px py-4px hover:text-primary/50 hover:border-primary/50">
                <i className="i-lucide-print"></i>
                打印
              </button>
            )
          }}
          content={() => printRef.current}
        />
      </div>
    </main>
  )
}
