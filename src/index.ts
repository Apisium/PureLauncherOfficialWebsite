const data: { os: { name?: string }, cpu: { architecture?: string } } = new (window as any).UAParser().getResult()

const os = (data.os.name || '').toLowerCase()

const cn = {
  home: require('../assets/screenshots/home-cn.png'),
  resources: require('../assets/screenshots/versions-cn.png'),
  accounts: require('../assets/screenshots/accounts-cn.png')
}

const en = {
  home: require('../assets/screenshots/home.png'),
  resources: require('../assets/screenshots/versions.png'),
  accounts: require('../assets/screenshots/accounts.png')
}

const changeText = () => {
  let text: string
  let ext: string
  if (os.startsWith('android') || os.startsWith('blackberry') || os.startsWith('ios') || os.startsWith('windows phone')) {
    text = $i('notSupport')
    $('#download-now').prop('disabled', true)
  } else if (os.startsWith('windows')) {
    text = `Windows ${$i('32')}`
    ext = 'exe'
  } else if (os.startsWith('mac os')) {
    text = `MACOS ${$i('64')}`
    ext = 'dmg'
  } else if (os.startsWith('debian') || os.startsWith('ubuntu') || os.startsWith('deepin')) {
    text = `Debian Linux ${$i('64')}`
    ext = 'deb'
  } else if (os.startsWith('redhat') || os.startsWith('suse') || os.startsWith('centos')) {
    text = `RedHat Linux ${$i('64')}`
    ext = 'rpm'
  } else {
    text = `Linux ${$i('64')}`
    ext = 'tar.gz'
  }
  const btn = document.getElementById('download-now')
  if (ext) {
    $('#release-type').text(text + ` (${ext})`)
    btn.onclick = () => void window.open(
      `https://xmcl.azurewebsites.net/api/pl-get-release?ext=${ext}&gfw=${(window as any).currentLang === 'zh-cn'}`,
      '_blank'
    )
  } else {
    $('#release-type').text(text)
    btn.onclick = () => {}
  }
}
const fn = (window as any).setLanguague
const f = (window as any).setLanguague = (str: string, exec: boolean) => {
  const isCN = str === 'zh-cn'
  $('#screenshot-home').prop('src', isCN ? cn.home : en.home)
  $('#screenshot-resources').prop('src', isCN ? cn.resources : en.resources)
  $('#screenshot-accounts').prop('src', isCN ? cn.accounts : en.accounts)
  if (!exec) fn(str)
}
(window as any).changeText = changeText
f((window as any).currentLang, true)
changeText()
