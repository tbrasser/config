/**
 * Masonry for Grid Layout - Optimized version
 * 
 * Optimizations from v1.1.4:
 * - Cached DOM traversal with 5s validity (vs repeated deep querySelector)
 * - Individual grid item ResizeObserver for precise height change detection
 * - Comprehensive MutationObserver for DOM/attribute changes (vs setInterval polling every 666ms)
 * - URL/path change detection for single-page app navigation
 * - ResizeObserver for viewport/grid changes with debouncing
 * - Additional event listeners for layout-affecting events (images, fonts, window resize)
 * - Light fallback interval (5s) to ensure no changes are missed
 * - Preserved all fallback paths from 1.1.4
 * - Fixed broken event listeners from original v1.1.4
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
  fallbackInterval: null,
  gridItemObservers: [], // Track individual grid item observers
  
  init: function() {
    this.setupMutationObserver()
    this.setupResizeObserver()
    this.setupURLChangeObserver()
    this.setupFallback()
  },
  
  setupMutationObserver: function() {
    if (!window.MutationObserver || this.mutation) return
    
    var self = this
    this.mutation = new MutationObserver(function(mutations) {
      var shouldResize = false
      var shouldRefreshObservers = false
      
      mutations.forEach(function(mutation) {
        // Check for relevant DOM changes that could affect layout
        if (mutation.type === 'childList') {
          // Clear cache when DOM structure changes
          if (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0) {
            domCache.clear()
            shouldResize = true
            shouldRefreshObservers = true
          }
        } else if (mutation.type === 'attributes') {
          // Attribute changes that could affect layout
          var attrName = mutation.attributeName
          if (attrName === 'style' || attrName === 'class' || 
              attrName === 'hidden' || attrName === 'width' || 
              attrName === 'height') {
            shouldResize = true
          }
        }
      })
      
      if (shouldResize) {
        // Stop initial detection if it's still running
        if (window.initialDetection && window.initialDetection.interval) {
          window.initialDetection.stop()
        }
        
        // Refresh grid item observers if needed
        if (shouldRefreshObservers) {
          clearTimeout(observers.observerRefreshTimeout)
          observers.observerRefreshTimeout = setTimeout(function() {
            self.setupGridItemObservers()
          }, 100)
        }
        
        // Debounce mutation-triggered resizes
        clearTimeout(observers.mutationTimeout)
        observers.mutationTimeout = setTimeout(function() {
          resizeAllGridItems()
        }, 50)
      }
    })
    
    // Observe the document for comprehensive changes
    this.mutation.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class', 'hidden', 'width', 'height']
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
    
    // Setup grid item observers
    this.setupGridItemObservers()
  },
  
  setupGridItemObservers: function() {
    if (!window.ResizeObserver) return
    
    // Clear existing grid item observers
    this.clearGridItemObservers()
    
    var grid = findGridElement()
    if (grid && grid.children) {
      // Observe each grid item individually for height changes
      for (var i = 0; i < grid.children.length; i++) {
        var item = grid.children[i]
        if (item) {
          var itemObserver = new ResizeObserver(function(entries) {
            // Debounce individual item resize events
            clearTimeout(observers.itemResizeTimeout)
            observers.itemResizeTimeout = setTimeout(function() {
              // Only resize the specific items that changed
              entries.forEach(function(entry) {
                resizeGridItem(entry.target)
              })
            }, 50)
          })
          
          itemObserver.observe(item)
          this.gridItemObservers.push(itemObserver)
        }
      }
      
      // Also observe the grid container itself
      if (this.resize) {
        this.resize.observe(grid)
      }
    }
  },
  
  clearGridItemObservers: function() {
    this.gridItemObservers.forEach(function(observer) {
      observer.disconnect()
    })
    this.gridItemObservers = []
  },
  
  setupURLChangeObserver: function() {
    // Listen for URL/path changes that might affect layout
    var self = this
    
    // Handle back/forward navigation
    window.addEventListener('popstate', function(event) {
      // Clear cache and re-detect grid on navigation
      domCache.clear()
      self.clearGridItemObservers()
      
      // Delayed execution to allow DOM to update after navigation
      setTimeout(function() {
        self.setupGridItemObservers()
        resizeAllGridItems()
      }, 100)
    })
    
    // Handle hash changes
    window.addEventListener('hashchange', function(event) {
      // Clear cache and re-detect grid on hash change
      domCache.clear()
      self.clearGridItemObservers()
      
      // Delayed execution to allow DOM to update
      setTimeout(function() {
        self.setupGridItemObservers()
        resizeAllGridItems()
      }, 100)
    })
    
    // Intercept pushState/replaceState for single-page app navigation
    var originalPushState = history.pushState
    var originalReplaceState = history.replaceState
    
    history.pushState = function() {
      originalPushState.apply(history, arguments)
      // Clear cache and re-detect grid on programmatic navigation
      domCache.clear()
      self.clearGridItemObservers()
      setTimeout(function() {
        self.setupGridItemObservers()
        resizeAllGridItems()
      }, 100)
    }
    
    history.replaceState = function() {
      originalReplaceState.apply(history, arguments)
      // Clear cache and re-detect grid on programmatic navigation
      domCache.clear()
      self.clearGridItemObservers()
      setTimeout(function() {
        self.setupGridItemObservers()
        resizeAllGridItems()
      }, 100)
    }
  },
  
  setupFallback: function() {
    // Gentle fallback check every 5 seconds to catch any missed changes
    // Much less aggressive than original 666ms interval
    this.fallbackInterval = setInterval(function() {
      var grid = findGridElement()
      if (grid && grid.children && grid.children.length > 0) {
        // Only resize if we can actually find grid items
        resizeAllGridItems()
      }
    }, 5000)
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
    this.clearGridItemObservers()
    if (this.fallbackInterval) {
      clearInterval(this.fallbackInterval)
      this.fallbackInterval = null
    }
    clearTimeout(this.resizeTimeout)
    clearTimeout(this.mutationTimeout)
    clearTimeout(this.itemResizeTimeout)
    clearTimeout(this.observerRefreshTimeout)
  }
}

var Ht = '1.1.7'
console.groupCollapsed(`%cMASONRY-GRID-LAYOUT ${Ht} IS RUNNING`, 'color: purple; font-weight: bold')
console.log('Readme:', 'https://github.com/tbrasser/config')
console.log('Optimizations: Cached DOM, individual grid item observers, URL change detection, event-driven layout, 5s fallback')
console.groupEnd()

// Initialize observers
observers.init()

// Keep click handler for manual triggers
document.onclick = resizeAllGridItems

// Initial grid detection with retry mechanism
var initialDetection = {
  attempts: 0,
  maxAttempts: 50, // Try for up to 5 seconds (50 * 100ms)
  interval: null,
  
  start: function() {
    this.attempts = 0
    this.interval = setInterval(this.check.bind(this), 100)
    // Also try immediately
    this.check()
  },
  
  check: function() {
    this.attempts++
    var grid = findGridElement()
    
    if (grid && grid.children && grid.children.length > 0) {
      // Grid found and has items - setup observers and resize
      observers.setupGridItemObservers()
      resizeAllGridItems()
      this.stop()
      console.log('Masonry: Initial grid layout applied after', this.attempts * 100, 'ms')
    } else if (this.attempts >= this.maxAttempts) {
      // Max attempts reached - stop checking
      this.stop()
      console.log('Masonry: Initial grid detection timeout after', this.maxAttempts * 100, 'ms')
    }
  },
  
  stop: function() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }
}

// Make globally accessible for observers
window.initialDetection = initialDetection

// Event listeners for layout-affecting changes
window.addEventListener("load", function(event) {
  resizeAllGridItems()
});

document.addEventListener("readystatechange", function(event) {
  resizeAllGridItems()
});

document.addEventListener("DOMContentLoaded", function(event) {
  resizeAllGridItems()
});

// Additional events that can affect layout
window.addEventListener("resize", function(event) {
  resizeAllGridItems()
});

// Listen for image loading which affects layout
document.addEventListener("load", function(event) {
  if (event.target.tagName === 'IMG') {
    resizeAllGridItems()
  }
}, true);

// Listen for font loading
if (document.fonts) {
  document.fonts.addEventListener('loadingdone', function(event) {
    resizeAllGridItems()
  });
}

// Start initial detection
initialDetection.start()