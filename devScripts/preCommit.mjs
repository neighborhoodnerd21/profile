#!/usr/bin/env zx

const htmlSuccess = await $`bash ./devScripts/validateHtml.mjs`;
console.log(htmlSuccess.stdout);
const cssSuccess = await $`bash ./devScripts/validateCss.mjs`;
console.log(cssSuccess.stdout);

process.exit(0);
