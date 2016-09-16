angular.module("ui.calendar",[]).constant("uiCalendarConfig",{calendars:{}}).controller("uiCalendarCtrl",["$scope","$locale",function(n,e){var a=n.eventSources,r=n.calendarWatchEvent?n.calendarWatchEvent:angular.noop,t=function(e){return function(){if(n.$root.$$phase)return e.apply(this,arguments);var a=arguments,r=this;return n.$root.$apply(function(){return e.apply(r,a)})}},l=1;this.eventFingerprint=function(n){n._id||(n._id=l++);var e=r({event:n})||"",a=moment.isMoment(n.start)?n.start.unix():n.start?moment(n.start).unix():"",t=moment.isMoment(n.end)?n.end.unix():n.end?moment(n.end).unix():"";return[n._id,n.id||"",n.title||"",n.url||"",a,t,n.allDay||"",n.className||"",e].join("")};var u=1,o=1;this.sourceFingerprint=function(n){var e=""+(n.__id||(n.__id=u++)),a=angular.isObject(n)&&n.events;return a&&(e=e+"-"+(a.__id||(a.__id=o++))),e},this.allEvents=function(){return Array.prototype.concat.apply([],(a||[]).reduce(function(n,e){if(angular.isArray(e))n.push(e);else if(angular.isObject(e)&&angular.isArray(e.events)){var a=Object.keys(e).filter(function(n){return"_id"!==n&&"events"!==n});e.events.forEach(function(n){angular.extend(n,a)}),n.push(e.events)}return n},[]))},this.changeWatcher=function(n,e){var a,r=function(){return((angular.isFunction(n)?n():n)||[]).reduce(function(n,a){var r=e(a);return l[r]=a,n.push(r),n},[])},t=function(n,e){var a=(e||[]).reduce(function(n,e){return n[e]=!0,n},Object.create(null));return(n||[]).filter(function(n){return!a[n]})},l={},u=function(n,r){var u,o,i={},d=t(r,n);for(u=0;u<d.length;u++){var c=d[u],f=l[c];delete l[c];var s=e(f);s===c?a.onRemoved(f):(i[s]=c,a.onChanged(f))}var v=t(n,r);for(u=0;u<v.length;u++)o=v[u],i[o]||a.onAdded(l[o])};return a={subscribe:function(n,e){n.$watch(r,function(n,a){var r=!(e&&e(n,a)===!1);r&&u(n,a)},!0)},onAdded:angular.noop,onChanged:angular.noop,onRemoved:angular.noop}},this.getFullCalendarConfig=function(n,e){var a={};return angular.extend(a,e),angular.extend(a,n),angular.forEach(a,function(n,e){"function"==typeof n&&(a[e]=t(a[e]))}),a},this.getLocaleConfig=function(n){if(!n.lang||n.useNgLocale){var a=function(n){return(Object.keys(n)||[]).reduce(function(e,a){return e.push(n[a]),e},[])},r=e.DATETIME_FORMATS;return{monthNames:a(r.MONTH),monthNamesShort:a(r.SHORTMONTH),dayNames:a(r.DAY),dayNamesShort:a(r.SHORTDAY)}}return{}}}]).directive("uiCalendar",["uiCalendarConfig",function(n){return{restrict:"A",scope:{eventSources:"=ngModel",calendarWatchEvent:"&"},controller:"uiCalendarCtrl",link:function(e,a,r,t){function l(){var a=r.uiCalendar?e.$parent.$eval(r.uiCalendar):{},l=t.getFullCalendarConfig(a,n),u=t.getLocaleConfig(l);angular.extend(u,l),f={eventSources:o},angular.extend(f,u),f.calendars=null;var i={};for(var d in f)"eventSources"!==d&&(i[d]=f[d]);return JSON.stringify(i)}var u,o=e.eventSources,i=!1,d=t.changeWatcher(o,t.sourceFingerprint),c=t.changeWatcher(t.allEvents,t.eventFingerprint),f=null;e.destroyCalendar=function(){u&&u.fullCalendar&&u.fullCalendar("destroy"),u=r.calendar?n.calendars[r.calendar]=angular.element(a).html(""):angular.element(a).html("")},e.initCalendar=function(){u||(u=angular.element(a).html("")),u.fullCalendar(f),r.calendar&&(n.calendars[r.calendar]=u)},e.$on("$destroy",function(){e.destroyCalendar()}),d.onAdded=function(e){u&&u.fullCalendar&&(u.fullCalendar(f),r.calendar&&(n.calendars[r.calendar]=u),u.fullCalendar("addEventSource",e),i=!0)},d.onRemoved=function(n){u&&u.fullCalendar&&(u.fullCalendar("removeEventSource",n),i=!0)},d.onChanged=function(){u&&u.fullCalendar&&(u.fullCalendar("refetchEvents"),i=!0)},c.onAdded=function(n){u&&u.fullCalendar&&u.fullCalendar("renderEvent",n,!!n.stick)},c.onRemoved=function(n){u&&u.fullCalendar&&u.fullCalendar("removeEvents",n._id)},c.onChanged=function(n){if(u&&u.fullCalendar)for(var e=u.fullCalendar("clientEvents",n._id),a=0;a<e.length;a++){var r=e[a];r=angular.extend(r,n),u.fullCalendar("updateEvent",r)}},d.subscribe(e),c.subscribe(e,function(){if(i===!0)return i=!1,!1}),e.$watch(l,function(n,a){n!==a?(e.destroyCalendar(),e.initCalendar()):n&&angular.isUndefined(u)&&e.initCalendar()})}}}]);