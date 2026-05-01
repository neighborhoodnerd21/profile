#!/usr/bin/env zx
//
// Should be run before starting any edits.
//
// check origin state to make sure we are not behind or ahead of origin, and that there are no uncommitted changes.
// If there are uncommitted changes, stash them and pop the stash after the session is done?
// If we are behind or ahead of origin, print a warning and exit.

const gitStatus = await $`git status --porcelain`;

if (gitStatus.exitCode === 0) {
  console.log("No uncommitted changes.");
} else {
  console.log("There are uncommitted changes.");
  process.exit(1);
}
