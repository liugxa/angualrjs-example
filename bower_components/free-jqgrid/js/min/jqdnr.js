(function(c){"function"===typeof define&&define.amd?define(["jquery"],c):"object"===typeof exports?c(require("jquery")):c(jQuery)})(function(c){var d="mousedown",g="mousemove",h="mouseup",p=function(b){var a=b.originalEvent.targetTouches;return a?(a=a[0],{x:a.pageX,y:a.pageY}):{x:b.pageX,y:b.pageY}},m={drag:function(b){var a=b.data,c=a.e,e=a.dnr,q=a.ar,a=a.dnrAr;b=p(b);"move"===e.k?c.css({left:e.X+b.x-e.pX,top:e.Y+b.y-e.pY}):(c.css({width:Math.max(b.x-e.pX+e.W,0),height:Math.max(b.y-e.pY+e.H,0)}),
a&&q.css({width:Math.max(b.x-a.pX+a.W,0),height:Math.max(b.y-a.pY+a.H,0)}));return!1},stop:function(){c(document).unbind(g,m.drag).unbind(h,m.stop)}},l=function(b,a,l,e){return b.each(function(){a=a?c(a,b):b;a.bind(d,{e:b,k:l},function(a){var b=a.data,d={},l,f,k=function(a,b){return parseInt(a.css(b),10)||!1},n=p(a);if(!c(a.target).hasClass("ui-jqdialog-titlebar-close")&&!c(a.target).parent().hasClass("ui-jqdialog-titlebar-close")){a=b.e;f=e?c(e):!1;if("relative"!==a.css("position"))try{a.position(d)}catch(r){}l=
{X:d.left||k(a,"left")||0,Y:d.top||k(a,"top")||0,W:k(a,"width")||a[0].scrollWidth||0,H:k(a,"height")||a[0].scrollHeight||0,pX:n.x,pY:n.y,k:b.k};d=f&&"move"!==b.k?{X:d.left||k(f,"left")||0,Y:d.top||k(f,"top")||0,W:f[0].offsetWidth||k(f,"width")||0,H:f[0].offsetHeight||k(f,"height")||0,pX:n.x,pY:n.y,k:b.k}:!1;b=a.find("input.hasDatepicker");if(0<b.length)try{b.datepicker("hide")}catch(r){}a={e:a,dnr:l,ar:f,dnrAr:d};c(document).bind(g,a,m.drag);c(document).bind(h,a,m.stop);return!1}})})};window.PointerEvent?
(d+=".jqGrid pointerdown.jqGrid",g+=".jqGrid pointermove.jqGrid",h+=".jqGrid pointerup.jqGrid"):window.MSPointerEvent?(d+=".jqGrid mspointerdown.jqGrid",g+=".jqGrid mspointermove.jqGrid",h+=".jqGrid mspointerup"):(d+=".jqGrid touchstart.jqGrid",g+=".jqGrid touchmove.jqGrid",h+=".jqGrid touchend.jqGrid");c.jqDnR=m;c.fn.jqDrag=function(b){return l(this,b,"move")};c.fn.jqResize=function(b,a){return l(this,b,"resize",a)}});
//# sourceMappingURL=jqdnr.map
