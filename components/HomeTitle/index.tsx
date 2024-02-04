'use client'
import Link from 'next/link'
import { useEffect, useCallback, useContext } from 'react'
import { initCanvas, getNextTheme } from '@/libs'
import { ThemeContext } from '@/components/Header/context'

export default function HomeTitle() {
  const theme = useContext(ThemeContext)
  const drawTitle = useCallback((isLight: boolean) => {
    const { ctx } = initCanvas('home-title', 78, 22)

    const color1 = isLight ? 'hsl(263,91%,64%)' : 'hsl(268,94%,79%)'
    const color2 = isLight ? 'hsl(223,20%,35%)' : 'hsl(216,25%,88%)'

    const r30 = Math.PI / 6
    const tan30 = Math.tan(r30)
    const firstEndX = 7 / tan30

    const vertices = [
      {
        x: firstEndX,
        y: 0,
      },
      {
        x: 0,
        y: 7,
      },
      {
        x: firstEndX,
        y: 14,
      },
      {
        x: 0,
        y: 21,
      },
    ]

    let startTime: number
    const duration = 1000
    let prevX = vertices[0].x
    let prevY = vertices[0].y
    let nextX: number
    let nextY: number

    const partProportion = 1 / (vertices.length - 1)
    let lineIndexCache = 1

    const step = (currentTime: number) => {
      if (!startTime) {
        startTime = currentTime
      }

      const progress = (currentTime - startTime) / duration
      const lineIndex = Math.min(
        Math.floor(progress / partProportion) + 1,
        vertices.length - 1
      )
      const partProgress =
        (progress - (lineIndex - 1) * partProportion) / partProportion

      const draw = () => {
        ctx.beginPath()
        ctx.strokeStyle = color1
        ctx.lineWidth = 1
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.moveTo(prevX, prevY)
        if (lineIndex !== lineIndexCache) {
          ctx.lineTo(vertices[lineIndex - 1].x, vertices[lineIndex - 1].y)
          lineIndexCache = lineIndex
        }
        prevX = nextX =
          vertices[lineIndex - 1].x +
          (vertices[lineIndex].x - vertices[lineIndex - 1].x) * partProgress
        prevY = nextY =
          vertices[lineIndex - 1].y +
          (vertices[lineIndex].y - vertices[lineIndex - 1].y) * partProgress
        ctx.lineTo(nextX, nextY)
        ctx.stroke()
      }

      draw()

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    ctx.lineWidth = 1
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    requestAnimationFrame(step)

    ctx.beginPath()
    const secondXStart = firstEndX + 4
    const secondXMiddle = firstEndX + 8
    const secondXEnd = firstEndX + 12
    ctx.strokeStyle = color2
    ctx.moveTo(secondXStart, 0)
    ctx.lineTo(secondXStart, 21)
    ctx.lineTo(secondXMiddle, 14)
    ctx.lineTo(secondXEnd, 21)

    const thirdXStart = secondXEnd + 4
    const thirdXMiddle = secondXEnd + 8
    const thirdXEnd = secondXEnd + 12
    ctx.moveTo(thirdXStart, 21)
    ctx.lineTo(thirdXMiddle, 14)
    ctx.lineTo(thirdXEnd, 21)
    ctx.moveTo(thirdXStart, 21)
    ctx.lineTo(thirdXEnd + 4, 21)

    const fourthXStart = thirdXEnd + 4
    const fourthXEnd = thirdXEnd + 12
    ctx.moveTo(fourthXEnd, 0)
    ctx.lineTo(fourthXEnd, 21)
    ctx.lineTo(fourthXStart, 14)
    ctx.lineTo(fourthXEnd, 14)

    const fifthXStart = fourthXEnd + 4
    const fifthXMiddle = fourthXEnd + 8
    const fifthXEnd = fourthXEnd + 12

    ctx.moveTo(fifthXStart, 14)
    ctx.lineTo(fifthXEnd, 14)
    ctx.lineTo(fifthXMiddle, 21)
    ctx.lineTo(fifthXStart, 14)

    const sixthXStart = fifthXEnd + 4
    const sixthXMiddle1 = fifthXEnd + 7
    const sixthXMiddle2 = fifthXEnd + 10
    const sixthXMiddle3 = fifthXEnd + 13
    const sixthXEnd = fifthXEnd + 16

    ctx.moveTo(sixthXStart, 14)
    ctx.lineTo(sixthXMiddle1, 21)
    ctx.lineTo(sixthXMiddle2, 14)
    ctx.lineTo(sixthXMiddle3, 21)
    ctx.lineTo(sixthXEnd, 14)

    ctx.stroke()
  }, [])

  useEffect(() => {
    const { isLight } = getNextTheme(theme as 'light' | 'dark' | 'auto')
    drawTitle(isLight)
  }, [drawTitle, theme])

  return (
    <Link href="/" replace>
      <canvas
        id="home-title"
        height={22}
        width={78}
        className="cursor-pointer"
      ></canvas>
    </Link>
  )
}
