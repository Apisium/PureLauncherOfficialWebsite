import enUS from '../langs/en-us.json'

const langs: Record<string, typeof enUS> = require('../langs/*.json')

const $i = (key: string): string => currentLang[key]

let currentLang: typeof enUS
export const setLanguague = (l: string) => {
  currentLang = langs[l] || enUS
  $('[data-t]').each((_, e) => void (e.innerText = $i($(e).data('t'))))
}
setLanguague((navigator.language || (navigator as any).userLanguage).toLowerCase())
;(window as any).setLanguague = setLanguague

export default $i
