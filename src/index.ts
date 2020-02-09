const data: { os: { name?: string }, cpu: { architecture?: string } } = new (window as any).UAParser().getResult()

const os = (data.os.name || '').toLowerCase()

let text: string
if (os.startsWith('android') || os.startsWith('blackberry') || os.startsWith('ios') || os.startsWith('windows phone')) {
  text = $i('notSupport')
  $('#download-now').prop('disabled', true)
} else if (os.startsWith('windows')) text = `Windows ${$i((data.cpu.architecture || '').includes('64') ? '64' : '32')} (.exe)`
else if (os.startsWith('mac os')) text = `MACOS ${$i('64')} (.dmg)`
else if (os.startsWith('debian') || os.startsWith('ubuntu') || os.startsWith('deepin')) text = `Debian Linux ${$i('64')} (.deb)`
else if (os.startsWith('redhat') || os.startsWith('suse') || os.startsWith('centos')) text = `RedHat Linux ${$i('64')} (.rpm)`
else text = `Linux ${$i('64')} (.tar.gz)`
$('#release-type').text(text)
