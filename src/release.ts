const fn1 = (window as any).setLanguague
const f1 = (window as any).setLanguague = (str: string, exec: boolean) => {
  const isCN = str === 'zh-cn'
  $('[data-ext]').each((_, it) => {
    const e = $(it)
    e.prop(
      'href',
      `https://xmcl.azurewebsites.net/api/pl-get-release?ext=${e.data('ext')}&gfw=${isCN}`
    )
  })
  if (!exec) fn1(str)
}
f1((window as any).currentLang, true)
