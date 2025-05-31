function resizeGridItem (item) {
  var rowSpan = Math.ceil(item.getBoundingClientRect().height) + 8
  item.style.gridRowEnd = 'span ' + rowSpan
}

function findGridElement() {
  // Efficient DOM traversal with early exits - preserving all 1.1.4 fallback paths
  var current = document.querySelector('body > home-assistant')
  if (!current || !current.shadowRoot) return null
  
  current = current.shadowRoot.querySelector('home-assistant-main')
  if (!current || !current.shadowRoot) return null
  
  current = current.shadowRoot.querySelector('ha-drawer > partial-panel-resolver > ha-panel-lovelace')
  if (!current || !current.shadowRoot) return null
  
  current = current.shadowRoot.querySelector('hui-root')
  if (!current || !current.shadowRoot) return null
  
  current = current.shadowRoot.querySelector('#view > hui-view > hui-panel-view')
  if (!current || !current.shadowRoot) return null
  
  // Try both possible verts locations (from 1.1.4)
  var verts = current.shadowRoot.querySelector('hui-card > hui-vertical-stack-card')
  if (!verts || !verts.shadowRoot) {
    verts = current.shadowRoot.querySelector('hui-vertical-stack-card')
  }
  if (!verts || !verts.shadowRoot) return null
  
  // Try all possible ssc locations (from 1.1.4)
  var ssc = verts.shadowRoot.querySelector('#root > hui-conditional-card > mod-card')
  if (!ssc || !ssc.shadowRoot) {
    ssc = verts.shadowRoot.querySelector('#root > hui-card:nth-child(2) > hui-conditional-card > hui-card > mod-card')
  }
  if (!ssc || !ssc.shadowRoot) {
    ssc = verts.shadowRoot.querySelector('#root > hui-card:nth-child(1) > hui-conditional-card > hui-card > mod-card')
  }
  if (!ssc || !ssc.shadowRoot) return null
  
  current = ssc.shadowRoot.querySelector('ha-card > hui-vertical-stack-card')
  if (!current || !current.shadowRoot) return null
  
  // Try all possible layout-card locations (from 1.1.4)
  var layc = current.shadowRoot.querySelector('#root > layout-card')
  if (!layc || !layc.shadowRoot) {
    layc = current.shadowRoot.querySelector('#root > auto-entities > layout-card')
  }
  if (!layc || !layc.shadowRoot) {
    layc = current.shadowRoot.querySelector('#root > hui-card:nth-child(2) > auto-entities > layout-card')
  }
  if (!layc || !layc.shadowRoot) {
    layc = current.shadowRoot.querySelector('#root > hui-card:nth-child(1) > auto-entities > layout-card')
  }
  if (!layc || !layc.shadowRoot) return null
  
  current = layc.shadowRoot.querySelector('grid-layout')
  if (!current || !current.shadowRoot) return null
  
  var grid = current.shadowRoot.querySelector('#root')
  if (!grid || !grid.children) return null
  
  return grid
}

function resizeAllGridItems () {
  var grid = findGridElement()
  if (!grid) return
  
  var allItems = grid.children
  for (var x = 0; x < allItems.length; x++) {
    resizeGridItem(allItems[x])
  }
}

var Ht = '1.1.5'
console.groupCollapsed(`%cMASONRY-GRID-LAYOUT ${Ht} IS RUNNING`, 'color: purple; font-weight: bold')
console.log('Readme:', 'https://github.com/tbrasser/config')
console.groupEnd()

// Simple, reliable interval approach (like original but with optimized DOM traversal)
setInterval(resizeAllGridItems, 666)

// Keep click handler for manual triggers
document.onclick = resizeAllGridItems

// Fixed event listeners from v1.1.4 (added missing parentheses)
window.addEventListener("load", function(event) {
  resizeAllGridItems()
});

document.addEventListener("readystatechange", function(event) {
  resizeAllGridItems()
});

document.addEventListener("DOMContentLoaded", function(event) {
  resizeAllGridItems()
});
