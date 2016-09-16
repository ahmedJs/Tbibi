!function e(r,n,o){function t(i,u){if(!n[i]){if(!r[i]){var c="function"==typeof require&&require;if(!u&&c)return c(i,!0);if(s)return s(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var l=n[i]={exports:{}};r[i][0].call(l.exports,function(e){var n=r[i][1][e];return t(n?n:e)},l,l.exports,e,r,n,o)}return n[i].exports}for(var s="function"==typeof require&&require,i=0;i<o.length;i++)t(o[i]);return t}({1:[function(e,r,n){angular.module("nemLogging",[]),angular.module("nemLogging").provider("nemDebug",function(){var r=null;return r=e("debug"),this.$get=function(){return r},this.debug=r,this});var o=function(e,r){return function(){return e.apply(r,arguments)}},t=[].slice;angular.module("nemLogging").provider("nemSimpleLogger",["nemDebugProvider",function(e){var r,n,s,i,u,c,a,l,f,g,d,h;for(d=e.debug,s={},i=["debug","info","warn","error","log"],r={},f=l=0,g=i.length;l<g;f=++l)h=i[f],r[h]=f;return c=function(e,r,n){if(e>=r)return n()},u=function(e){var r,n,o;if(r=!1,!e)return r;for(n=0,o=i.length;n<o&&(h=i[n],r=null!=e[h]&&"function"==typeof e[h],r);n++);return r},a=function(e,r){var n,o,t,u;for(null==s[e]&&(s[e]=d(e)),n=s[e],u={},o=0,t=i.length;o<t;o++)h=i[o],u[h]="debug"===h?n:r[h];return u},n=function(){function e(e){var n,s,a,l,f;if(this.$log=e,this.spawn=o(this.spawn,this),!this.$log)throw"internalLogger undefined";if(!u(this.$log))throw"@$log is invalid";for(this.doLog=!0,f={},n=function(e){return function(n){return f[n]=function(){var o;if(o=1<=arguments.length?t.call(arguments,0):[],e.doLog)return c(r[n],e.currentLevel,function(){var r;return(r=e.$log)[n].apply(r,o)})},e[n]=f[n]}}(this),s=0,a=i.length;s<a;s++)l=i[s],n(l);this.LEVELS=r,this.currentLevel=r.error}return e.prototype.spawn=function(r){if("string"==typeof r){if(!u(this.$log))throw"@$log is invalid";if(!d)throw"nemDebug is undefined this is probably the light version of this library sep debug logggers is not supported!";return a(r,this.$log)}return new e(r||this.$log)},e}(),this.decorator=["$log",function(e){var o;return o=new n(e),o.currentLevel=r.debug,o}],this.$get=["$log",function(e){return new n(e)}],this}])},{debug:2}],2:[function(e,r,n){function o(){return"WebkitAppearance"in document.documentElement.style||window.console&&(console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31}function t(){var e=arguments,r=this.useColors;if(e[0]=(r?"%c":"")+this.namespace+(r?" %c":" ")+e[0]+(r?"%c ":" ")+"+"+n.humanize(this.diff),!r)return e;var o="color: "+this.color;e=[e[0],o,"color: inherit"].concat(Array.prototype.slice.call(e,1));var t=0,s=0;return e[0].replace(/%[a-z%]/g,function(e){"%%"!==e&&(t++,"%c"===e&&(s=t))}),e.splice(s,0,o),e}function s(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function i(e){try{null==e?n.storage.removeItem("debug"):n.storage.debug=e}catch(e){}}function u(){var e;try{e=n.storage.debug}catch(e){}return e}function c(){try{return window.localStorage}catch(e){}}n=r.exports=e("./debug"),n.log=s,n.formatArgs=t,n.save=i,n.load=u,n.useColors=o,n.storage="undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage?chrome.storage.local:c(),n.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],n.formatters.j=function(e){return JSON.stringify(e)},n.enable(u())},{"./debug":3}],3:[function(e,r,n){function o(){return n.colors[l++%n.colors.length]}function t(e){function r(){}function t(){var e=t,r=+new Date,s=r-(a||r);e.diff=s,e.prev=a,e.curr=r,a=r,null==e.useColors&&(e.useColors=n.useColors()),null==e.color&&e.useColors&&(e.color=o());var i=Array.prototype.slice.call(arguments);i[0]=n.coerce(i[0]),"string"!=typeof i[0]&&(i=["%o"].concat(i));var u=0;i[0]=i[0].replace(/%([a-z%])/g,function(r,o){if("%%"===r)return r;u++;var t=n.formatters[o];if("function"==typeof t){var s=i[u];r=t.call(e,s),i.splice(u,1),u--}return r}),"function"==typeof n.formatArgs&&(i=n.formatArgs.apply(e,i));var c=t.log||n.log||console.log.bind(console);c.apply(e,i)}r.enabled=!1,t.enabled=!0;var s=n.enabled(e)?t:r;return s.namespace=e,s}function s(e){n.save(e);for(var r=(e||"").split(/[\s,]+/),o=r.length,t=0;t<o;t++)r[t]&&(e=r[t].replace(/\*/g,".*?"),"-"===e[0]?n.skips.push(new RegExp("^"+e.substr(1)+"$")):n.names.push(new RegExp("^"+e+"$")))}function i(){n.enable("")}function u(e){var r,o;for(r=0,o=n.skips.length;r<o;r++)if(n.skips[r].test(e))return!1;for(r=0,o=n.names.length;r<o;r++)if(n.names[r].test(e))return!0;return!1}function c(e){return e instanceof Error?e.stack||e.message:e}n=r.exports=t,n.coerce=c,n.disable=i,n.enable=s,n.enabled=u,n.humanize=e("ms"),n.names=[],n.skips=[],n.formatters={};var a,l=0},{ms:4}],4:[function(e,r,n){function o(e){if(e=""+e,!(e.length>1e4)){var r=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(r){var n=parseFloat(r[1]),o=(r[2]||"ms").toLowerCase();switch(o){case"years":case"year":case"yrs":case"yr":case"y":return n*f;case"days":case"day":case"d":return n*l;case"hours":case"hour":case"hrs":case"hr":case"h":return n*a;case"minutes":case"minute":case"mins":case"min":case"m":return n*c;case"seconds":case"second":case"secs":case"sec":case"s":return n*u;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n}}}}function t(e){return e>=l?Math.round(e/l)+"d":e>=a?Math.round(e/a)+"h":e>=c?Math.round(e/c)+"m":e>=u?Math.round(e/u)+"s":e+"ms"}function s(e){return i(e,l,"day")||i(e,a,"hour")||i(e,c,"minute")||i(e,u,"second")||e+" ms"}function i(e,r,n){if(!(e<r))return e<1.5*r?Math.floor(e/r)+" "+n:Math.ceil(e/r)+" "+n+"s"}var u=1e3,c=60*u,a=60*c,l=24*a,f=365.25*l;r.exports=function(e,r){return r=r||{},"string"==typeof e?o(e):r.long?s(e):t(e)}},{}]},{},[1]);