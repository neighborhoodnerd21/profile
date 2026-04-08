#!/usr/bin/env zx

// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var runtimeData = [];
var cssMsgs = [];
var logData = [];

// Recursively find all .css files in and below
// the working directory, then store the paths in an array
const files = await $`find . -name "*.css"`.quiet();
const cssFiles = files.stdout.trim().split("\n");

// iterate through the array of .css file paths and run the
// vnu validator on each file, storing the output in an array
for (const i of cssFiles) {
  const path = `${process.cwd()}/${i}`;
  const output = await $({ nothrow: true })`css-validator file:${path}`.quiet();
  cssMsgs = output.stdout.trim().split("\n");
  const checkTime = await $`date -Iseconds`;
  if (cssMsgs[1] === "" && cssMsgs[3] === "") {
    runtimeData.push({ name: i, result: 0, msgs: "" });
    logData.push(`[${checkTime.stdout.trim()}] File ${i}: PASSED\n`);
  } else {
    runtimeData.push({ name: i, result: 1, msgs: cssMsgs });
    logData.push(
      `[${checkTime.stdout.trim()}] File ${i}: FAILED\n\nWith message:\n\n${cssMsgs.join("\n")}\n`
    );
  }
}

// Construct output message
const endMessage = `\nCSS VALIDATION COMPLETED\n\n${cssFiles.length} files checked,\n${runtimeData.filter((d) => d.result === 0).length} files passed, ${runtimeData.filter((d) => d.result === 1).length} files failed.`;

console.log(endMessage + "\n\nDetails:\n\n" + logData.join("\n"));

if (runtimeData.filter((d) => d.result === 1).length === 0) {
  console.log("All CSS files were validated and ready for commit.");
  process.exit(0);
} else {
  console.error(
    "Some CSS files did not validate. Please fix the errors before committing."
  );
  await $`touch cssvalidationfail.log`;
  await $`echo "${logData.join("\n")}\n${endMessage}" >> cssvalidationfail.log`;
  process.exit(1);
}
