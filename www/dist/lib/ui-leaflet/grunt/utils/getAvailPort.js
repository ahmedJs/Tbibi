var exec=require("shelljs").exec,isWin=/^win/.test(process.platform),isPortOpen=function(e){var i;i=isWin?'netstat -an | find /i ":'+e+'" | find /i "listening"':"lsof -i:"+e+" | tail -n 1 | awk '{print $2}'";var n=exec(i,{silent:!0}).output;return!n};module.exports=function(e){for(;!isPortOpen(e);)e+=1;return e};