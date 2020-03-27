import { ensureRunning, protocol } from 'pure-launcher/packages/web-api'

try {
  ensureRunning()
    .then(() => protocol(JSON.parse(decodeURIComponent(location.search.slice(1)))))
    .then(() => {
      $('#text').text($i('installSuccess'))
      setTimeout(close, 5000)
    })
    .catch(e => {
      console.error(e)
      $('#text').text($i('installFailed'))
      setTimeout(() => (location.href = '/'), 7000)
    })
} catch (e) {
  console.error(e)
  $('#text').text($i('protocolWrong'))
  setTimeout(() => (location.href = '/'), 7000)
}
