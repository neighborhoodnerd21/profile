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

// Should be run before starting any edits.
//
// check origin state to make sure we are not behind or ahead of origin, and that there are no uncommitted changes.
// If there are uncommitted changes, stash them and pop the stash after the session is done?
// If we are behind or ahead of origin, print a warning and exit.
