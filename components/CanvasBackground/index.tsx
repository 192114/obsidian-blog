'use client'
import { useEffect, useRef } from 'react'

export default function CanvasBackground() {
  const count = useRef(0)

  const initCanvas = () => {
    const boxWidth = window.innerWidth
    const boxHeight = window.innerHeight

    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    const dpr = window.devicePixelRatio || 1
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    // @ts-expect-error vendor
    const bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1

    const dpi = dpr / bsr
    canvas.style.width = `${boxWidth}px`
    canvas.style.height = `${boxHeight}px`
    canvas.width = boxWidth * dpi
    canvas.height = boxHeight * dpi

    ctx.scale(dpi, dpi)

    return {
      canvas,
      ctx,
      boxWidth,
      boxHeight,
    }
  }

  /**
   * 
   * @param x 当前x
   * @param y 当前y
   * @param r 绘制长度
   * @param theta 偏移角度
   */
  const getCoordinates = (x: number, y: number, r = 0, theta = 0) => {
    const x1 = x + r * Math.cos(theta)
    const y1 = y + r * Math.sin(theta)
    return [x1, y1]
  }


  useEffect(() => {
    const { canvas, ctx, boxWidth, boxHeight } = initCanvas()
  
    ctx.strokeStyle='#88888825'
    ctx.lineWidth = 1
    const rad15 = Math.PI / 12
    const rad90 = Math.PI / 2
    const rad180 = Math.PI
    const minBranch = 6
    const len = 6

    const drawLine = (x:number, y:number, rad:number, count = 0) => {    
      const length = Math.random() * len
      count++
      const [lineX, lineY] = getCoordinates(x, y, length, rad)
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(lineX, lineY)
      ctx.stroke()

      const rad1 = rad + Math.random() * rad15
      const rad2 = rad - Math.random() * rad15
  
      if (lineX < -100 || lineX > boxWidth + 100 || lineY < -100 || lineY > boxHeight + 100) {
        return
      }
  
      const rate = count > minBranch ? 0.5 : 0.8
  
      requestAnimationFrame(() => {
        if (Math.random() < rate) {
          drawLine(lineX, lineY, rad1, count)
        }
        if (Math.random() < rate) {
          drawLine(lineX, lineY, rad2, count)
        }
      })
    }



    const random = () => Math.random() * 0.6 + 0.2

    // 左侧
    drawLine(-5, boxHeight * random(), 0)
    // 右侧
    drawLine(boxWidth + 5, boxHeight * random(), rad180)
    // 下侧
    drawLine(boxWidth * random(), boxHeight + 5, -rad90)
  }, [])

  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 pointer-events-none z--1">
      <canvas id="canvas" />
    </div>
    
  )
}