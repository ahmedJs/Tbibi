"use strict";angular.module("ionic-toast").run(["$templateCache",function(s){var t='<div class="ionic_toast"><div class="toast_section" ng-class="ionicToast.toastClass" ng-style="ionicToast.toastStyle" ng-click="hideToast()"><span class="ionic_toast_close"><i class="ion-android-close toast_close_icon"></i></span><span ng-bind-html="ionicToast.toastMessage"></span></div></div>';s.put("ionic-toast/templates2/ionic-toast.html",t)}]);
