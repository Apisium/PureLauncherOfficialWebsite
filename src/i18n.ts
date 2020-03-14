import enUS from '../langs/en-us.json'

const langs: Record<string, typeof enUS> = require('../langs/*.json')

const $i = (key: keyof typeof enUS): string => currentLang[key]
window.$i = $i

let currentLang: typeof enUS
export const setLanguague = (l: string) => {
  (window as any).currentLang = l
  currentLang = langs[l] || enUS
  $('[data-t]').each((_, e) => void (e.innerText = $i($(e).data('t'))))
  $('[data-t-src]').each((_, e: HTMLImageElement) => {
    const src = $i($(e).data('t-src'))
    if (src) e.src = src
  })
}
setLanguague((navigator.language || (navigator as any).userLanguage).toLowerCase())
;(window as any).setLanguague = setLanguague

export default $i
