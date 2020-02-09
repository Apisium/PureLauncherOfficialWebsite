import copy from 'copy-to-clipboard'

interface ForgeFile {
  md5: string
  path: string
}

interface Forge {
  version: string
  universal: ForgeFile
  installer: ForgeFile
}

interface Version {
  id: string
  type: 'snapshot' | 'old_beta' | 'old_alpha' | 'release'
  time: number
  fabric?: string
  forge?: Forge
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
$('#copy-mode').click(function () {
  copyMode = $(this).prop('checked')
})

const ft = (t: number) => t.toString().padStart(2, '0')

let data: Data
const genList = () => {
  const release = $i('releaseVersion')
  const snapshot = $i('snapshotVersion')
  const old = $i('oldVersion')
  const releaseTime = $i('releaseTime')

  const versionsStr = data.versions.map((it, i) => {
    if (!showOldVersion && it.type !== 'release') return
    let type: string
    let typeName: string
    switch (it.type) {
      case 'snapshot':
        type = 'snapshot'
        typeName = snapshot
        break
      case 'old_alpha':
      case 'old_beta':
        type = 'snapshot'
        typeName = old
        break
      default:
        type = 'release'
        typeName = release
    }
    const date = new Date(it.time)
    return `<li onclick="install(event, ${i}, 0)">
      ${it.id} <span class="badge ${type}">${typeName}</span>
      ${it.fabric ? `<span class="badge fabric" onclick="install(event, ${i}, 1)">Fabric</span>` : ''}
      ${it.forge ? `<span class="badge forge" onclick="install(event, ${i}, 2)">Forge</span>` : ''}
      <p>${releaseTime}: ${date.getFullYear()}-${ft(date.getMonth() + 1)}-${ft(date.getDay())} ${ft(date.getHours())}:${ft(date.getHours())}</p>
    </li>`
  }).filter(Boolean).join('')
  $('#book-body').html(`<ul>
    <li id="list-header">${$i('versionsTopText')} <span class="badge fabric">Fabric</span> <span class="badge forge">Forge</span></li>
    ${versionsStr}
  </ul>`)
}

(window as any).install = (e: MouseEvent, id: number, type: 0 | 1 | 2) => {
  const v = data.versions[id]
  let json: any = { type: 'Version', mcVersion: v.id, useIdAsName: true }
  switch (type) {
    case 1:
      json.id = v.fabric + '-Fabric'
      json.$fabric = { version: v.fabric, loader: data.latest.fabricLoader }
      break
    case 2:
      json.id = v.id + '-' + v.forge.version + '-Forge'
      json.$forge = v.forge
      break
    default:
      json.id = v.id
      json.$vanilla = true
  }
  json = JSON.stringify(json)
  if (copyMode) copy(json)
  else window.open('/i.html?' + encodeURIComponent(json), '_blank')
  if (e.stopPropagation) e.stopPropagation()
  else e.cancelBubble = true
}

fetch('https://xmcl.blob.core.windows.net/integration/vanillaData.json', { cache: 'no-cache' })
  .then(it => it.json())
  .then((it: Data) => {
    data = it
    genList()
  })
  .catch(console.error)
