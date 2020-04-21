const data: { os: { name?: string }, cpu: { architecture?: string } } = new (window as any).UAParser().getResult()

const os = (data.os.name || '').toLowerCase()
const isX64 = (data.cpu.architecture || '').indexOf('64') !== -1

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
  if (os === 'android' || os === 'blackberry' || os === 'ios' || os === 'windows phone') {
    text = $i('notSupport')
    $('#download-now').prop('disabled', true)
  } else if (os === 'windows') {
    text = `Windows ${$i(isX64 ? '64' : '32')}`
    ext = 'exe'
  } else if (os === 'mac os') {
    text = `MACOS ${$i('64')}`
    ext = 'dmg'
  } else if (os === 'debian' || os === 'ubuntu' || os === 'deepin') {
    text = `Debian Linux ${$i('64')}`
    ext = 'deb'
  } else if (os === 'redhat' || os === 'suse' || os === 'centos') {
    text = `RedHat Linux ${$i('64')}`
    ext = 'rpm'
  } else {
    text = `Linux ${$i('64')}`
    ext = 'tar.gz'
  }
  if (ext) {
    $('#release-type').text(text + ` (${ext})`)
    $('#download-now').prop('href', 'https://dl.pl.apisium.cn/PureLauncher.' + ext)
  } else $('#release-type').text(text)
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
