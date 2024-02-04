export const initCanvas = (id: string, width?: number, height?: number) => {
  const boxWidth = width ?? window.innerWidth
  const boxHeight = height ?? window.innerHeight

  const canvas = document.getElementById(id) as HTMLCanvasElement
  const dpr = window.devicePixelRatio || 1
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  const bsr =
    // @ts-expect-error vendor
    ctx.webkitBackingStorePixelRatio ||
    // @ts-expect-error vendor
    ctx.mozBackingStorePixelRatio ||
    // @ts-expect-error vendor
    ctx.msBackingStorePixelRatio ||
    // @ts-expect-error vendor
    ctx.oBackingStorePixelRatio ||
    // @ts-expect-error vendor
    ctx.backingStorePixelRatio ||
    1

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

export const getNextTheme = (targetTheme: 'light' | 'dark' | 'auto') => {
  let nextTheme = targetTheme
  if (targetTheme === 'auto') {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    nextTheme = darkModeQuery.matches ? 'dark' : 'light'
  }

  return {
    nextTheme,
    isLight: nextTheme === 'light',
  }
}