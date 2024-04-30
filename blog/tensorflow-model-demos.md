---
title: how to run tensorflow tfjs-models demos?
layout: default
nav_order: 110
has_children: false
description: Solve the problems when running tensorflow demos. like 'Manifest not found', 'deasync couldn't be built successfully', 'Couldn't find a script name "node-gyp" in the top-level' etc.
parent: Blogs for pagehelper
---

## Error messages

if you follow the guider in README.md, it may fail.

```sh
rm -rf .cache dist node_modules
yarn
```

It will prompt you to run yarn install first.

```sh
Internal Error: @tensorflow-models/pose-detection@workspace:.: This package doesn't seem to be present in your lockfile; run "yarn install" to update the lockfile
    at Xx.getCandidates (/home/jianglibo/.yarn/releases/yarn-4.1.1.cjs:205:8149)
    at Dd.getCandidates (/home/jianglibo/.yarn/releases/yarn-4.1.1.cjs:141:1311)
    at /home/jianglibo/.yarn/releases/yarn-4.1.1.cjs:210:8409
    at Ky (/home/jianglibo/.yarn/releases/yarn-4.1.1.cjs:140:53916)
    at Fe (/home/jianglibo/.yarn/releases/yarn-4.1.1.cjs:210:8389)
    at async Promise.allSettled (index 0)
    at async Uc (/home/jianglibo/.yarn/releases/yarn-4.1.1.cjs:140:53244)
    at async /home/jianglibo/.yarn/releases/yarn-4.1.1.cjs:210:9140
    at async Qi.startProgressPromise (/home/jianglibo/.yarn/releases/yarn-4.1.1.cjs:140:137284)
    at async Pt.resolveEverything (/home/jianglibo/.yarn/releases/yarn-4.1.1.cjs:210:7138)
```

and you may encounter this error too.

```sh
➤ YN0001: │ Error: @tensorflow-models/pose-detection@file:../../dist#../../dist::hash=6b035b&locator=posedetection_demo%40workspace%3A.: Manifest not found
    at AE.find (/home/jianglibo/.yarn/releases/yarn-4.1.1.cjs:140:120021)
    at async /home/jianglibo/.yarn/releases/yarn-4.1.1.cjs:559:6256
    at async Object.bZe (/home/jianglibo/.yarn/releases/yarn-4.1.1.cjs:140:53847)
    at async O2.resolve (/home/jianglibo/.yarn/releases/yarn-4.1.1.cjs:559:6217)
    at async Dd.resolve (/home/jianglibo/.yarn/releases/yarn-4.1.1.cjs:141:1451)
    at async Dd.resolve (/home/jianglibo/.yarn/releases/yarn-4.1.1.cjs:141:1451)
    at async /home/jianglibo/.yarn/releases/yarn-4.1.1.cjs:210:7249
    at async Ky (/home/jianglibo/.yarn/releases/yarn-4.1.1.cjs:140:53910)
    at async ne (/home/jianglibo/.yarn/releases/yarn-4.1.1.cjs:210:7231)
    at async Promise.allSettled (index 4)
```

and:

```sh
➤ YN0007: │ core-js@npm:2.6.12 must be built because it never has been before or the last one failed
➤ YN0007: │ deasync@npm:0.1.23 must be built because it never has been before or the last one failed
➤ YN0009: │ deasync@npm:0.1.23 couldn't be built successfully (exit code 1, logs can be found here: /tmp/xfs-e1d2fa9e/build.log)
➤ YN0007: │ parcel-bundler@npm:1.12.5 must be built because it never has been before or the last one failed
```

```sh
# This file contains the result of Yarn building a package (deasync@npm:0.1.23)
# Script name: install

Usage Error: Couldn't find a script name "node-gyp" in the top-level (used by deasync@npm:0.1.23). This typically happens because some package depends on "node-gyp" to build itself, but didn't list it in their dependencies. To fix that, please run "yarn add node-gyp" into your top-level workspace. You also can open an issue on the repository of the specified package to suggest them to use an optional peer dependency.
```


## Steps to run demos

The working step are as follows:

* go to the parent folder of demos, like `~/tfjs-models/pose-detection`
* invoke `yarn` and `yarn build`, it will get ./dist folder ready.
* `echo '{}' > ./dist/package.json, If not you may enconter the "Manifest not found" error
* go to `~/tfjs-models/pose-detection/demos/live_video`
* `yarn add node-gyp` and `yarn` and `yarn watch`
