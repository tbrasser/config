/**
 * Masonry for Grid Layout - Optimized version
 * 
 * Optimizations from v1.1.4:
 * - Cached DOM traversal with 5s validity (vs repeated deep querySelector)
 * - MutationObserver for DOM changes (vs setInterval polling every 666ms)
 * - ResizeObserver for viewport changes with 100ms debouncing
 * - Preserved all fallback paths from 1.1.4
 * - Improved browser compatibility
 */

function resizeGridItem (item) {
  var rowSpan = Math.ceil(item.getBoundingClientRect().height) + 8
  item.style.gridRowEnd = 'span ' + rowSpan
}

// Cache for DOM elements to avoid repeated traversals
var domCache = {
  grid: null,
  lastUpdate: 0,
  isValid: function() {
    return this.grid && this.grid.parentNode && Date.now() - this.lastUpdate < 5000
  },
  update: function(gridElement) {
    this.grid = gridElement
    this.lastUpdate = Date.now()
  },
  clear: function() {
    this.grid = null
    this.lastUpdate = 0
  }
}
function findGridElement() {
  // Use cached result if still valid
  if (domCache.isValid()) {
    return domCache.grid
  }

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
  
  // Cache the result
  domCache.update(grid)
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

// Observers for efficient change detection
var observers = {
  mutation: null,
  resize: null,
  
  init: function() {
    this.setupMutationObserver()
    this.setupResizeObserver()
  },
  
  setupMutationObserver: function() {
    if (this.mutation) return
    
    this.mutation = new MutationObserver(function(mutations) {
      var shouldResize = false
      mutations.forEach(function(mutation) {
        // Check for relevant DOM changes
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Clear cache when DOM structure changes
          domCache.clear()
          shouldResize = true
        }
      })
      
      if (shouldResize) {
        resizeAllGridItems()
      }
    })
    
    // Observe the document for changes
    this.mutation.observe(document.body, {
      childList: true,
      subtree: true
    })
  },
  
  setupResizeObserver: function() {
    if (!window.ResizeObserver || this.resize) return
    
    this.resize = new ResizeObserver(function(entries) {
      // Debounce resize events
      clearTimeout(observers.resizeTimeout)
      observers.resizeTimeout = setTimeout(function() {
        resizeAllGridItems()
      }, 100)
    })
    
    // Observe viewport changes
    this.resize.observe(document.body)
  },
  
  disconnect: function() {
    if (this.mutation) {
      this.mutation.disconnect()
      this.mutation = null
    }
    if (this.resize) {
      this.resize.disconnect()
      this.resize = null
    }
    clearTimeout(this.resizeTimeout)
  }
}

var Ht = '1.1.5'
console.groupCollapsed(`%cMASONRY-GRID-LAYOUT ${Ht} IS RUNNING`, 'color: purple; font-weight: bold')
console.log('Readme:', 'https://github.com/tbrasser/config')
console.log('Optimizations: Cached DOM traversal, MutationObserver, ResizeObserver')
console.groupEnd()

// Initialize observers
observers.init()

// Keep click handler for manual triggers
document.onclick = resizeAllGridItems

// Preserve existing event listeners for compatibility
window.addEventListener("load", function(event) {
  resizeAllGridItems()
});

document.addEventListener("readystatechange", function(event) {
  resizeAllGridItems()
});

document.addEventListener("DOMContentLoaded", function(event) {
  resizeAllGridItems()
});

// Initial resize
resizeAllGridItems()