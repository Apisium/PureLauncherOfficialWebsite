const fn1 = (window as any).setLanguague
const f1 = (window as any).setLanguague = (str: string, exec: boolean) => {
  const isCN = str === 'zh-cn'
  $('[data-ext]').each((_, it) => {
    const e = $(it)
    const ext = e.data('ext')
    e.prop(
      'href',
      isCN
        ? 'https://dl.pl.apisium.cn/pl/PureLauncher.' + ext
        : 'https://github.com/Apisium/PureLauncher/releases/latest/download/PureLauncher.' + ext
    )
  })
  if (!exec) fn1(str)
}
f1((window as any).currentLang, true)
