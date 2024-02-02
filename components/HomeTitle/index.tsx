'use client'
import { useEffect, useRef }  from 'react'

export default function HomeTitle() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const getEndPoint = (x:number, y:number, r:number, theta:number) => {
    const x1 = x + r * Math.cos(theta)
    const y1 = y + r * Math.sin(theta)
    return [x1, y1]
  }

  useEffect(() => {
    const canvasDom = canvasRef.current!
    const ctx = canvasDom.getContext('2d')!

    const r30 = Math.PI / 6
    const tan30 = Math.tan(r30)
    const firstEndX = 7 / tan30

    // const vertices = [
    //   {
    //     x: 7 / tan30,
    //     y: 0,
    //   },
    //   {
    //     x: 0,
    //     y: 7,
    //   },
    //   {
    //     x: 7 / tan30,
    //     y: 14,
    //   },
    //   {
    //     x: 0,
    //     y: 21,
    //   }
    // ]

    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(firstEndX, 0)
    ctx.lineTo(0, 7)
    ctx.lineTo(firstEndX, 14)
    ctx.lineTo(0, 21)

    const secondXStart = firstEndX + 4
    const secondXMiddle = firstEndX + 8
    const secondXEnd = firstEndX + 12
    ctx.moveTo(secondXStart, 0)
    ctx.lineTo(secondXStart, 21)
    ctx.lineTo(secondXMiddle, 21 - 4*tan30)
    ctx.lineTo(secondXEnd, 21)

    const thirdXStart = secondXEnd + 4
    const thirdXMiddle = secondXEnd + 8
    const thirdXEnd = secondXEnd + 12
    ctx.moveTo(thirdXStart, 21)
    ctx.lineTo(thirdXMiddle, 21 - 4 * tan30)
    ctx.lineTo(thirdXEnd, 21)
    ctx.moveTo(thirdXStart, 21)
    ctx.lineTo(thirdXEnd + 4, 21)

    ctx.stroke()
    ctx.strokeStyle = 'blue'

  }, [])


  return <canvas height="22px" width="100px" ref={canvasRef} className="border-border border-1px border-solid"></canvas>
}