const fn1 = (window as any).setLanguague
const f1 = (window as any).setLanguague = (str: string, exec: boolean) => {
  $('[data-ext]').each((_, it) => {
    const e = $(it)
    e.prop('href', 'https://dl.pl.apisium.cn/PureLauncher.' + e.data('ext'))
  })
  if (!exec) fn1(str)
}
f1((window as any).currentLang, true)
