/**
 * convert markup to image.
 * integrate, package and minify this function as needed.
 *
 * @author: Martin Tillmann <mtillmann@gmail.com>
 * @license: MIT
 */

async function textToImage (text, options = {}) {
  options = {
    scale: window.devicePixelRatio,
    context: document.body,
    ...options
  }

  const width = options.width ?? options.context.getBoundingClientRect().width
  const rawComputedStyle = window.getComputedStyle(options.context)
  let computedStyle = Object.entries(rawComputedStyle)

  // account for minor firefox wonkiness
  if (rawComputedStyle.constructor.name === 'CSS2Properties') {
    computedStyle = Object.values(rawComputedStyle).map((key) => [key, rawComputedStyle.getPropertyValue(key)])
  }

  const styles = computedStyle.reduce((acc, [key, value]) => {
    if (/line|background|color|font|text/.test(key) && !['normal', 'auto', ''].includes(value)) {
      key = key.replaceAll(/[A-Z]/g, m => `-${m.toLowerCase()}`)
      acc.push(`${key}:${value}`)
    }
    return acc
  }, []).join(';')

  let svg = [
        `<svg width="${width}" height="0" xmlns="http://www.w3.org/2000/svg">`,
        '<foreignObject x="0" y="0" width="100%" height="100%">',
        '<style>',
        `#foreignObject-root { 
                ${styles}; 
                transform: scale(1); 
                transform-origin:0 0; 
                width: ${width}px;
                padding-bottom: .5%;
                ${options.styles};
            }`,
        '</style>',
        '<div id="foreignObject-root" xmlns="http://www.w3.org/1999/xhtml">',
        `${text}`,
        '</div>',
        '</foreignObject>',
        '</svg>'
  ].join('')

  // use iframe to avoid having the svg tainted by document styles
  const iframe = document.createElement('iframe')
  iframe.style.position = 'absolute'
  iframe.style.left = '-9999px'

  document.body.appendChild(iframe)
  iframe.contentDocument.body.innerHTML = svg
  const contentHeight = iframe.contentDocument.body.querySelector('svg foreignObject > div').getBoundingClientRect().height
  iframe.remove()

  // apply scaling and height to the svg here because the dims
  // will glitch if applied in the svg string before determining the content height
  svg = svg
    .replace('height="0"', `height="${contentHeight * options.scale}"`)
    .replace('transform: scale(1)', `transform: scale(${options.scale})`)
    .replace(`width="${width}"`, `width="${width * options.scale}"`)

  svg = unescape(encodeURIComponent(svg))

  const img = document.createElement('img')
  img.width = width
  img.height = contentHeight

  await new Promise((resolve) => { img.onload = resolve; img.src = `data:image/svg+xml;base64,${btoa(svg)}` })

  return img
}
