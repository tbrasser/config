function resizeGridItem (item) {
  var rowSpan = Math.ceil(item.getBoundingClientRect().height) + 8
  item.style.gridRowEnd = 'span ' + rowSpan
}
function resizeAllGridItems () {
  var ha = document.querySelector('body > home-assistant')
  if (!ha || !ha.shadowRoot) return
  var ham = ha.shadowRoot.querySelector('home-assistant-main')
  if (!ham || !ham.shadowRoot) return
  var hap = ham.shadowRoot.querySelector('ha-drawer > partial-panel-resolver > ha-panel-lovelace')
  if (!hap || !hap.shadowRoot) return
  var har = hap.shadowRoot.querySelector('hui-root')
  if (!har || !har.shadowRoot) return
  var hapv = har.shadowRoot.querySelector('#view > hui-view > hui-panel-view')
  if (!hapv || !hapv.shadowRoot) return
  var verts = hapv.shadowRoot.querySelector('hui-vertical-stack-card')
  if(!verts || !verts.shadowRoot) return
  var ssc = verts.shadowRoot.querySelector('#root > hui-conditional-card > mod-card')
  if (!ssc || !ssc.shadowRoot) return
  var vss = ssc.shadowRoot.querySelector('ha-card > hui-vertical-stack-card')
  if (!vss || !vss.shadowRoot) return
  var layc = vss.shadowRoot.querySelector('#root > layout-card')
  if (!layc || !layc.shadowRoot) return
  var gridl = layc.shadowRoot.querySelector('grid-layout')
  if (!gridl || !gridl.shadowRoot) return
  var grid = gridl.shadowRoot.querySelector('#root')
  if (!grid || !grid.children) return
  var allItems = grid.children
  for (var x = 0; x < allItems.length; x++) {
    resizeGridItem(allItems[x])
  }
}

var Ht = '1.0.4'
console.groupCollapsed(`%cMASONRY-GRID-LAYOUT ${Ht} IS RUNNING`, 'color: purple; font-weight: bold')
console.log('Readme:', 'https://github.com/tbrasser/config')
console.groupEnd()
document.onclick = resizeAllGridItems
setInterval(resizeAllGridItems, 1337)
