/*!
 * Waves v0.6.6
 * http://fian.my.id/Waves 
 * 
 * Copyright 2014 Alfiana E. Sibuea and other contributors 
 * Released under the MIT license 
 * https://github.com/fians/Waves/blob/master/LICENSE 
 */
!function(t,e){"use strict";"function"==typeof define&&define.amd?define([],function(){return e.apply(t)}):"object"==typeof exports?module.exports=e.call(t):t.Waves=e.call(t)}("object"==typeof global?global:this,function(){"use strict";function t(t){return null!==t&&t===t.window}function e(e){return t(e)?e:9===e.nodeType&&e.defaultView}function n(t){var n,a,o={top:0,left:0},r=t&&t.ownerDocument;return n=r.documentElement,"undefined"!=typeof t.getBoundingClientRect&&(o=t.getBoundingClientRect()),a=e(r),{top:o.top+a.pageYOffset-n.clientTop,left:o.left+a.pageXOffset-n.clientLeft}}function a(t){var e="";for(var n in t)t.hasOwnProperty(n)&&(e+=n+":"+t[n]+";");return e}function o(t){if(c.allowEvent(t)===!1)return null;for(var e=null,n=t.target||t.srcElement;null!==n.parentElement;){if(!(n instanceof SVGElement||n.className.indexOf("waves-effect")===-1)){e=n;break}if(n.classList.contains("waves-effect")){e=n;break}n=n.parentElement}return e}function r(t){var e=o(t);null!==e&&(u.show(t,e),"ontouchstart"in window&&(e.addEventListener("touchend",u.hide,!1),e.addEventListener("touchcancel",u.hide,!1)),e.addEventListener("mouseup",u.hide,!1),e.addEventListener("mouseleave",u.hide,!1))}var i=i||{},s=document.querySelectorAll.bind(document),u={duration:750,show:function(t,e){if(2===t.button)return!1;var o=e||this,r=document.createElement("div");r.className="waves-ripple",o.appendChild(r);var i=n(o),s=t.pageY-i.top,c=t.pageX-i.left,d="scale("+o.clientWidth/100*3+")";"touches"in t&&(s=t.touches[0].pageY-i.top,c=t.touches[0].pageX-i.left),r.setAttribute("data-hold",Date.now()),r.setAttribute("data-scale",d),r.setAttribute("data-x",c),r.setAttribute("data-y",s);var l={top:s+"px",left:c+"px"};r.className=r.className+" waves-notransition",r.setAttribute("style",a(l)),r.className=r.className.replace("waves-notransition",""),l["-webkit-transform"]=d,l["-moz-transform"]=d,l["-ms-transform"]=d,l["-o-transform"]=d,l.transform=d,l.opacity="1",l["-webkit-transition-duration"]=u.duration+"ms",l["-moz-transition-duration"]=u.duration+"ms",l["-o-transition-duration"]=u.duration+"ms",l["transition-duration"]=u.duration+"ms",r.setAttribute("style",a(l))},hide:function(t){c.touchup(t);var e=this,n=(1.4*e.clientWidth,null),o=e.getElementsByClassName("waves-ripple");if(!(o.length>0))return!1;n=o[o.length-1];var r=n.getAttribute("data-x"),i=n.getAttribute("data-y"),s=n.getAttribute("data-scale"),d=Date.now()-Number(n.getAttribute("data-hold")),l=350-d;l<0&&(l=0),setTimeout(function(){var t={top:i+"px",left:r+"px",opacity:"0","-webkit-transition-duration":u.duration+"ms","-moz-transition-duration":u.duration+"ms","-o-transition-duration":u.duration+"ms","transition-duration":u.duration+"ms","-webkit-transform":s,"-moz-transform":s,"-ms-transform":s,"-o-transform":s,transform:s};n.setAttribute("style",a(t)),setTimeout(function(){try{e.removeChild(n)}catch(t){return!1}},u.duration)},l)},wrapInput:function(t){for(var e=0;e<t.length;e++){var n=t[e];if("input"===n.tagName.toLowerCase()){var a=n.parentNode;if("i"===a.tagName.toLowerCase()&&a.className.indexOf("waves-effect")!==-1)continue;var o=document.createElement("i");o.className=n.className+" waves-input-wrapper";var r=n.getAttribute("style");r||(r=""),o.setAttribute("style",r),n.className="waves-button-input",n.removeAttribute("style"),a.replaceChild(o,n),o.appendChild(n)}}}},c={touches:0,allowEvent:function(t){var e=!0;return"touchstart"===t.type?c.touches+=1:"touchend"===t.type||"touchcancel"===t.type?setTimeout(function(){c.touches>0&&(c.touches-=1)},500):"mousedown"===t.type&&c.touches>0&&(e=!1),e},touchup:function(t){c.allowEvent(t)}};return i.displayEffect=function(t){t=t||{},"duration"in t&&(u.duration=t.duration),u.wrapInput(s(".waves-effect")),"ontouchstart"in window&&document.body.addEventListener("touchstart",r,!1),document.body.addEventListener("mousedown",r,!1)},i.attach=function(t){"input"===t.tagName.toLowerCase()&&(u.wrapInput([t]),t=t.parentElement),"ontouchstart"in window&&t.addEventListener("touchstart",r,!1),t.addEventListener("mousedown",r,!1)},i});