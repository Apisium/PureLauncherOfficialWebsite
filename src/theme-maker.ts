import copy from 'copy-to-clipboard'
import { ensureRunning, protocol } from 'pure-launcher/packages/web-api'

const bg = document.getElementById('bg') as HTMLInputElement
document.getElementById('file').onchange = e => {
  const files = (e.target as HTMLInputElement).files
  if (!files.length) return
  const reader = new FileReader()
  reader.onload = () => {
    const ret = reader.result as string
    if (~ret.indexOf('data:image')) bg.value = `url(${ret})`
  }
  reader.readAsDataURL(files.item(0))
}

const genCode = () => {
  let code = ':root{'
  $('input[name]').each((_, it: HTMLInputElement) => {
    if (!it.value) return
    code += it.name
    code += ':'
    code += it.value
    code += ';'
  })
  return code + '}'
}

$('#copy').click(() => copy(genCode()))
const btn = $('#apply')
btn.click(() => {
  btn.attr('disabled', 'true').text('应用中...')
  ensureRunning()
    .then(() => protocol({ type: 'applyTheme', css: genCode() }))
    .catch(() => alert('应用失败! 请确认你已安装 PureLauncher！'))
    .finally(() => btn.attr('disabled', 'false').text('立即应用'))
})
