/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-01 13:48:22
 * @LastEditTime: 2021-09-02 10:53:15
 * @Description: file content
 */


export class DotGraph {
  config: {
    width: number,
    height: number,
    maxX: number,
    maxY: number,
    markerUnit: number,
    markerUnitX: number,
    markerUnitY: number,
    markerFontSize: number
    markerSize: number
    markerLength: number,
  }
  ctx: CanvasRenderingContext2D

  constructor(
    constructor: HTMLElement,
    config: Partial<Pick<DotGraph['config'], keyof typeof DotGraph['defaultConfig'] | 'markerUnitX' | 'markerUnitY'>>
      & Omit<DotGraph['config'], keyof typeof DotGraph['defaultConfig']>
  ) {
    this.config = Object.assign({ }, DotGraph.defaultConfig, config);
    this.config.markerUnitY = config.markerUnitY ?? config.markerUnit
    this.config.markerUnitX = config.markerUnitX ?? config.markerUnit
    const {
      width,
      height,
      markerSize,
      markerLength,
      markerFontSize: fontsize
    } = this.config

    const canvas = document.createElement('canvas')
    constructor.style.overflow = 'hidden'
    constructor.style.width = width + 'px'
    constructor.style.height = height + 'px'
    canvas.width = width
    canvas.height = height
    constructor.appendChild(canvas)

    const ctx = this.ctx = canvas.getContext('2d');

    // draw marker line
    ctx.beginPath()
    ctx.moveTo(markerSize, 0)
    ctx.lineTo(markerSize, height - markerSize)
    ctx.lineTo(width, height - markerSize)
    ctx.stroke()

    ctx.font = `${fontsize}px monospace`
    // draw marker x
    {
      const unit = this.config.markerUnitX
      const max = config.maxX
      const ratio = (width - markerSize) / max
      const start = height - markerSize
      const end = height - markerSize + markerLength
      for (let i = unit; i <= max; i += unit) {
        const x = i * ratio + markerSize
        ctx.beginPath()
        ctx.moveTo(x, start)
        ctx.lineTo(x, end)
        ctx.stroke()
        const text = i.toString()
        ctx.fillText(text, x - (text.length * fontsize / 2) / 2, start + fontsize * 1.5);
      }
    }

    // draw marker Y
    {
      const unit = this.config.markerUnitY
      const max = config.maxY
      const ratio = (height - markerSize) / max
      const start = markerSize - markerLength
      const end = markerSize
      for (let i = unit; i <= max; i += unit) {
        const y = height - markerSize - i * ratio
        ctx.beginPath()
        ctx.moveTo(start, y)
        ctx.lineTo(end, y)
        ctx.stroke()
        const text = i.toString()
        ctx.fillText(i.toString(), start - (text.length + 1) * fontsize / 2, y + fontsize * 0.25);
      }
    }

  }



  dot(x: number, y: number, color: string = 'black', size = 1) {
    const { config, ctx } = this
    const { markerSize, height, width, maxY, maxX } = config
    const fillStyle = ctx.fillStyle
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(
      x * ((width - markerSize) / maxX) + markerSize,
      height - markerSize - y * ((height - markerSize) / maxY),
      size,
      0,
      2 * Math.PI
    )
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle = fillStyle
  }


  clear() {
    const { markerSize, height, width } = this.config
    this.ctx.clearRect(markerSize, 0, width, height - markerSize)
  }


  static defaultConfig = {
    width: window.innerWidth,
    height: window.innerHeight,
    markerSize: 50,
    markerLength: 10,
    markerFontSize: 16,
  }
}