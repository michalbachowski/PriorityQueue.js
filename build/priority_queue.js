define("src/priority_queue",["require"],function(e){var t=function(e,t){return t.priority-e.priority},n=function(e,t){return e.priority-t.priority};return function(e){var r=[],i=!1,s;e&&e.low?s=t:s=n;var o=function(){r.sort(s),i=!0},u={pop:function(){i||o();var e=r.pop();return e?e.object:void 0},top:function(){i||o();var e=r[r.length-1];return e?e.object:void 0},includes:function(e){for(var t=r.length-1;t>=0;t--)if(r[t].object===e)return!0;return!1},size:function(){return r.length},empty:function(){return r.length===0},push:function(e,t){r.push({object:e,priority:t}),i=!1},each:function(e){i||o();var t;for(t in r)r.hasOwnProperty(t)&&e(r[t].object)}};return u}});