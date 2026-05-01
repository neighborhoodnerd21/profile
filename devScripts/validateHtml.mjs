#!/usr/bin/env zx

var runtimeData = [];
var vnuMsgs = [];
var logData = [];

// Recursively find all .html files in and below
// the working directory, then store the paths in an array
const files = await $`find . -name "*.html"`.quiet();
const htmlFiles = files.stdout.trim().split("\n");

// iterate through the array of .html file paths and run the
// vnu validator on each file, storing the output in an array
for (const i of htmlFiles) {
  const output = await $({ nothrow: true })`vnu --errors-only --stdout ${i}`;
  vnuMsgs = output.stdout.trim().split("\n");
  const checkTime = await $`date -Iseconds`;
  if (vnuMsgs.length === 1 && vnuMsgs[0] === "") {
    runtimeData.push({ name: i, result: 0, msgs: vnuMsgs });
    logData.push(`[${checkTime.stdout.trim()}] File ${i}: PASSED\n`);
  } else {
    runtimeData.push({ name: i, result: 1, msgs: vnuMsgs });
    logData.push(
      `[${checkTime.stdout.trim()}] File ${i}: FAILED\n\nWith errors:\n\n${vnuMsgs.join("\n")}\n`
    );
  }
}

// Construct output message
const endMessage = `\nHTML VALIDATION COMPLETED\n\n${htmlFiles.length} files checked,\n${runtimeData.filter((d) => d.result === 0).length} files passed, ${runtimeData.filter((d) => d.result === 1).length} files failed.`;

console.log(endMessage + "\n\nDetails:\n\n" + logData.join("\n"));

if (runtimeData.filter((d) => d.result === 1).length === 0) {
  console.log("All HTML files were validated and ready for commit.");
  process.exit(0);
} else {
  console.error(
    "Some HTML files did not validate. Please fix the errors before committing."
  );
  await $`touch htmlvalidationfail.log`;
  await $`echo "${logData.join("\n")}\n${endMessage}" >> htmlvalidationfail.log`;
  process.exit(1);
}
