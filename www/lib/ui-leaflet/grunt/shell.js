"use strict";module.exports=function(e,o){return{options:{stdout:!0},selenium:{command:"node node_modules/protractor/bin/webdriver-manager start",options:{stdout:!1,async:!0}},protractor_update:{command:"node node_modules/protractor/bin/webdriver-manager update"},npm_install:{command:"npm install"},examples:{command:"node generate-examples.js"}}};