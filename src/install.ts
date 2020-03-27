import { ensureRunning, protocol } from 'pure-launcher/packages/web-api'

let resource = decodeURIComponent(location.search.slice(1))
try { resource = JSON.parse(resource) } catch { }

ensureRunning()
  .then(() => protocol({ type: 'Install', resource } as any))
  .then(() => {
    $('#text').text($i('installSuccess'))
    setTimeout(close, 5000)
  })
  .catch(e => {
    console.error(e)
    $('#text').text($i('installFailed'))
    setTimeout(() => (location.href = '/'), 7000)
  })
