define(["./core","./var/rnotwhite"],function(n,t){function i(i){var e=r[i]={};return n.each(i.match(t)||[],function(n,t){e[t]=!0}),e}var r={};return n.Callbacks=function(t){t="string"==typeof t?r[t]||i(t):n.extend({},t);var e,u,o,c,f,h,a=[],s=!t.once&&[],l=function(n){for(e=t.memory&&n,u=!0,h=c||0,c=0,f=a.length,o=!0;a&&h<f;h++)if(a[h].apply(n[0],n[1])===!1&&t.stopOnFalse){e=!1;break}o=!1,a&&(s?s.length&&l(s.shift()):e?a=[]:d.disable())},d={add:function(){if(a){var i=a.length;!function i(r){n.each(r,function(r,e){var u=n.type(e);"function"===u?t.unique&&d.has(e)||a.push(e):e&&e.length&&"string"!==u&&i(e)})}(arguments),o?f=a.length:e&&(c=i,l(e))}return this},remove:function(){return a&&n.each(arguments,function(t,i){for(var r;(r=n.inArray(i,a,r))>-1;)a.splice(r,1),o&&(r<=f&&f--,r<=h&&h--)}),this},has:function(t){return t?n.inArray(t,a)>-1:!(!a||!a.length)},empty:function(){return a=[],f=0,this},disable:function(){return a=s=e=void 0,this},disabled:function(){return!a},lock:function(){return s=void 0,e||d.disable(),this},locked:function(){return!s},fireWith:function(n,t){return!a||u&&!s||(t=t||[],t=[n,t.slice?t.slice():t],o?s.push(t):l(t)),this},fire:function(){return d.fireWith(this,arguments),this},fired:function(){return!!u}};return d},n});