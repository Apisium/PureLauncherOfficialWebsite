import { ensureRunning } from 'pure-launcher/packages/web-api'

ensureRunning()
  .then(() => $('.loading').hide('slow', () => $('#drag').show('slow')))
  .catch(e => {
    console.error(e)
    $('#text').text($i('installFailed'))
    setTimeout(() => (location.href = '/'), 7000)
  })
