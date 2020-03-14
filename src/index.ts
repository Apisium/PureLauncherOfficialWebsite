const data: { os: { name?: string }, cpu: { architecture?: string } } = new (window as any).UAParser().getResult()

const os = (data.os.name || '').toLowerCase()

const cn = {
  home: require('../assets/screenshots/home-cn.png'),
  resources: require('../assets/screenshots/resources-cn.png'),
  accounts: require('../assets/screenshots/accounts-cn.png')
}

const en = {
  home: require('../assets/screenshots/home.png'),
  resources: require('../assets/screenshots/resources.png'),
  accounts: require('../assets/screenshots/accounts.png')
}

const changeText = () => {
  let text: string
  if (os.startsWith('android') || os.startsWith('blackberry') || os.startsWith('ios') || os.startsWith('windows phone')) {
    text = $i('notSupport')
    $('#download-now').prop('disabled', true)
  } else if (os.startsWith('windows')) text = `Windows ${$i('32')} (.exe)`
  else if (os.startsWith('mac os')) text = `MACOS ${$i('64')} (.dmg)`
  else if (os.startsWith('debian') || os.startsWith('ubuntu') || os.startsWith('deepin')) text = `Debian Linux ${$i('64')} (.deb)`
  else if (os.startsWith('redhat') || os.startsWith('suse') || os.startsWith('centos')) text = `RedHat Linux ${$i('64')} (.rpm)`
  else text = `Linux ${$i('64')} (.tar.gz)`
  $('#release-type').text(text)
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
