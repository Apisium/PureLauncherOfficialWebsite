import copy from 'copy-to-clipboard'

interface Version {
  i: string // id
  t: number // time
  a?: string // fabric
  f?: string // forge
  o?: [string, string] // optifine
  k?: 1 | 2 // kind
}

interface Data {
  latest: {
    release: string
    snapshot: string
    fabricLoader: string
  }
  versions: Version[]
}

let copyMode = false
let showOldVersion = false

$('#old-versions').click(function () {
  showOldVersion = $(this).prop('checked')
  genList()
})
$('#copy-mode').click(function () { copyMode = $(this).prop('checked') })

const ft = (t: number) => {
  const ret = t.toString()
  return ret.length < 2 ? '0' + ret : ret
}

let data: Data
const genList = () => {
  const release = $i('releaseVersion')
  const snapshot = $i('snapshotVersion')
  const old = $i('oldVersion')
  const releaseTime = $i('releaseTime')

  let versionsStr = ''
  const len = data.versions.length
  for (let i = 0; i < len; i++) {
    const it = data.versions[i]
    if (!showOldVersion && it.k) continue
    let type: string
    let typeName: string
    switch (it.k) {
      case 1:
        type = 'snapshot'
        typeName = snapshot
        break
      case 2:
        type = 'snapshot'
        typeName = old
        break
      default:
        type = 'release'
        typeName = release
    }
    const date = new Date(it.t * 1000)
    versionsStr += `<li onclick="install(event, ${i}, 0)">
      ${it.i} <span class="badge ${type}">${typeName}</span>
      ${it.a ? `<span class="badge fabric" onclick="install(event, ${i}, 1)">Fabric</span>` : ''}
      ${it.f ? `<span class="badge forge" onclick="install(event, ${i}, 2)">Forge</span>` : ''}
      ${it.o ? `<span class="badge optifine" onclick="install(event, ${i}, 3)">Optifine</span>` : ''}
      <p>${releaseTime}: ${date.getFullYear()}-${ft(date.getMonth() + 1)}-${ft(date.getDay())} ${ft(date.getHours())}:${ft(date.getHours())}</p>
    </li>`
  }
  $('#book-body').html(`<ul>
    <li id="list-header">${$i('versionsTopText')} <span class="badge fabric">Fabric</span> <span class="badge forge">Forge</span> <span class="badge optifine">Optifine</span></li>
    ${versionsStr}
  </ul>`)
}

(window as any).install = (e: MouseEvent, id: number, type: 0 | 1 | 2 | 3) => {
  const v = data.versions[id]
  let json: any = { type: 'Version', mcVersion: v.i }
  switch (type) {
    case 1:
      json.id = v.a + '-Fabric'
      json.$fabric = [v.a, data.latest.fabricLoader]
      break
    case 2:
      json.id = v.i + '-Forge' + '-' + v.f
      json.$forge = v.f
      break
    case 3:
      json.id = v.i + '-Optifine' + '-' + v.o[0] + '-' + v.o[0]
      json.$optifine = v.o
      break
    default:
      json.id = v.i
      json.$vanilla = true
  }
  json = JSON.stringify(json)
  if (copyMode) copy(json)
  else window.open('/i.html?' + encodeURIComponent(json), '_blank')
  if (e.stopPropagation) e.stopPropagation()
  else e.cancelBubble = true
}

fetch('https://s.pl.apisium.cn/minecraft.json')
  .then(it => it.json())
  .then((it: Data) => {
    data = it
    genList()
  })
  .catch(console.error)
