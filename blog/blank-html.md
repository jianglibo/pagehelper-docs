---
title: Blank html page generator
layout: default
nav_order: 90
has_children: false
description: Learn about setting up a C++ development environment on WSL2 in Windows 11 using vcpkg and VS Code. Gain insights into managing dependencies with CMake and setting up a uWebSockets tutorial project.
parent: Blogs for pagehelper
---

## A Blank HTML generator

<div id="blank-html-app"
 ph-data-consumer="alpine:data"
 x-data='{q: "",data: [{name: "html", content: `
	<!DOCTYPE html>\n
<html lang="en">\n
<head>\n
	<meta charset="UTF-8">\n
	<meta name="viewport" content="width=device-width, initial-scale=1.0">\n
	<title>Document</title>\n
</head>\n
<body>\n
\n
</body>\n
</html>
`}]}'>
<textarea name="content" 
  x-bind:value="(data.filter(it=>it.name.indexOf(q) !== -1).length > 0) ? data.filter(it=>it.name.indexOf(q) !== -1)[0].content : ''"
  style="width:100%;"
  id="blank-html-content"
  ph-validate="string::min:3,max:65536"
  spellcheck="false"
  rows="10">
</textarea>
<button class="btn btn-sm" type="button" ph-to-clipboard="#blank-html-content" aria-label="Copy code to clipboard">
copy
</button>
<p>Templates:</p>
<form class="ph">
<input type="text" 
name="email"
ph-once
ph-auto-start
x-model="q"
ph-target="#blank-html-app"
ph-ajax="https://lets-script.com/devtools/blank-htmls"
/>
</form>
<ul>
<template x-for="v in data.filter(it => it.name.indexOf(q) !== -1)">
<li x-text="v.name"></li>
</template>
</ul>
</div>
