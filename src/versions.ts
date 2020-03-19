import copy from 'copy-to-clipboard'

interface Version {
  id: string
  time: number
  fabric?: string
  forge?: string
  optifine?: [string, string]
  type?: 'snapshot' | 'old'
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
    if (!showOldVersion && it.type) return
    let type: string
    let typeName: string
    switch (it.type) {
      case 'snapshot':
        type = 'snapshot'
        typeName = snapshot
        break
      case 'old':
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
      ${it.optifine ? `<span class="badge optifine" onclick="install(event, ${i}, 3)">Optifine</span>` : ''}
      <p>${releaseTime}: ${date.getFullYear()}-${ft(date.getMonth() + 1)}-${ft(date.getDay())} ${ft(date.getHours())}:${ft(date.getHours())}</p>
    </li>`
  }).filter(Boolean).join('')
  $('#book-body').html(`<ul>
    <li id="list-header">${$i('versionsTopText')} <span class="badge fabric">Fabric</span> <span class="badge forge">Forge</span> <span class="badge optifine">Optifine</span></li>
    ${versionsStr}
  </ul>`)
}

(window as any).install = (e: MouseEvent, id: number, type: 0 | 1 | 2 | 3) => {
  const v = data.versions[id]
  let json: any = { type: 'Version', mcVersion: v.id }
  switch (type) {
    case 1:
      json.id = v.fabric + '-Fabric'
      json.$fabric = [v.fabric, data.latest.fabricLoader]
      break
    case 2:
      json.id = v.id + '-Forge' + '-' + v.forge
      json.$forge = v.forge
      break
    case 3:
      json.id = v.id + '-Optifine' + '-' + v.optifine[0] + '-' + v.optifine[0]
      json.$optifine = v.optifine
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

fetch('https://xmcl.blob.core.windows.net/pure-launcher/vanillaData.json')
  .then(it => it.json())
  .then((it: Data) => {
    data = it
    genList()
  })
  .catch(console.error)
