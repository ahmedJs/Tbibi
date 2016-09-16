#!/usr/bin/env node
function addPlatformBodyTag(t,r){try{var a="platform-"+r,s="platform-cordova platform-webview",e=fs.readFileSync(t,"utf8"),o=findBodyTag(e);if(!o)return;if(o.indexOf(a)>-1)return;var i=o,f=findClassAttr(o);if(f){var n=f.substring(f.length-1),d=f.substring(0,f.length-1);d+=" "+a+" "+s+n,i=o.replace(f,d)}else i=o.replace(">",' class="'+a+" "+s+'">');e=e.replace(o,i),fs.writeFileSync(t,e,"utf8"),process.stdout.write("add to body class: "+a+"\n")}catch(t){process.stdout.write(t)}}function findBodyTag(t){try{return t.match(/<body(?=[\s>])(.*?)>/gi)[0]}catch(t){}}function findClassAttr(t){try{return t.match(/ class=["|'](.*?)["|']/gi)[0]}catch(t){}}var fs=require("fs"),path=require("path"),rootdir=process.argv[2];if(rootdir)for(var platforms=process.env.CORDOVA_PLATFORMS?process.env.CORDOVA_PLATFORMS.split(","):[],x=0;x<platforms.length;x++)try{var platform=platforms[x].trim().toLowerCase(),indexPath;indexPath="android"==platform?path.join("platforms",platform,"assets","www","index.html"):path.join("platforms",platform,"www","index.html"),fs.existsSync(indexPath)&&addPlatformBodyTag(indexPath,platform)}catch(t){process.stdout.write(t)}