import { ensureRunning, protocol, info } from 'pure-launcher/packages/web-api'

info().then(console.log)

const path = decodeURIComponent(location.search.slice(1))

ensureRunning()
  .then(() => path && protocol({ type: 'InstallLocal', path } as any))
  .then(() => {
    $('#text').text($i('installSuccess'))
    setTimeout(close, 5000)
  })
  .catch(e => {
    console.error(e)
    $('#text').text($i('installFailed'))
    setTimeout(() => (location.href = '/'), 7000)
  })
