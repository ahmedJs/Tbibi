"use strict";module.exports=function(){var r;try{r=require("angular")}catch(r){}if(r&&r.version||(r=window.angular),!r||!r.version)throw new Error("ionic-material could not load angular module :(");var i=r.module("ionic-material",["ionic"]);return require("./lib/_ink")(i),require("./lib/_motion")(i),"ionic-material"}();