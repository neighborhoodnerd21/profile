#!/usr/bin/env zx

const htmlSuccess = await $`zx devScripts/validateHtml.mjs`;
console.log(htmlSuccess.stdout);
const cssSuccess = await $`zx devScripts/validateCss.mjs`;
console.log(cssSuccess.stdout);

console.log("All files validated and ready for commit.");
process.exit(0);
