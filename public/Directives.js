angular.module("tbibi").directive("validPasswordC",function(){return{require:"ngModel",link:function(i,e,n,r){r.$parsers.unshift(function(e,n){console.log("viewValue"+JSON.stringify(e));var t=e!=i.ClientInscrire.password.$viewValue;r.$setValidity("noMatch",!t)})}}});