!function(s,e){"use strict";function o(){function s(s,e,o,r){var a=r[1],t=r[0],n=a[o.matchPassword];t.$validators?t.$validators.passwordMatch=function(s){return s===n.$modelValue}:t.$parsers.push(function(s){return console.log("the value is"+s),t.$setValidity("passwordMatch",s===n.$viewValue),s}),n.$parsers.push(function(s){return console.log("the value is"+s),t.$setValidity("passwordMatch",s===t.$viewValue),s})}var e=["^ngModel","^form"];return{restrict:"A",require:e,link:s}}s.module("ngPassword",[]).directive("matchPassword",o),s.module("angular.password",["ngPassword"]),s.module("angular-password",["ngPassword"]),"object"==typeof module&&"function"!=typeof define&&(module.exports=s.module("ngPassword"))}(angular);