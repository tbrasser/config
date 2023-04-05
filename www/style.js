function resizeGridItem(item){
  var rowSpan = Math.ceil(item.getBoundingClientRect().height) + 8;
  item.style.gridRowEnd = "span "+rowSpan;
}

function resizeAllGridItems(){
  var grid = document.querySelector("body > home-assistant").shadowRoot.querySelector("home-assistant-main").shadowRoot.querySelector("ha-drawer > partial-panel-resolver > ha-panel-lovelace").shadowRoot.querySelector("hui-root").shadowRoot.querySelector("#view > hui-view > hui-panel-view").shadowRoot.querySelector("mod-card").shadowRoot.querySelector("ha-card > state-switch").shadowRoot.querySelector("#root > div.visible > hui-vertical-stack-card").shadowRoot.querySelector("#root > layout-card").shadowRoot.querySelector("grid-layout").shadowRoot.querySelector("#root");
  var allItems = grid.children;
  for(var x=0;x<allItems.length;x++){
    resizeGridItem(allItems[x]);
  }
}

var Ht = "1.0.0";
console.groupCollapsed(`%cMASONRY-GRID-LAYOUT ${Ht} IS RUNNING`, "color: purple; font-weight: bold"),
console.log("Readme:", "https://github.com/tbrasser/config"),
console.groupEnd();

setInterval(resizeAllGridItems, 1337)
