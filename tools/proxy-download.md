---
title: Proxy a download by cloudflare
layout: default
tagline: "If you encounter slow download speeds in a certain geographic area, try using this proxied download."
nav_order: 10
parent: Lets-script Tools
has_children: false
---

## Download a file through a proxy.

<div x-data="{url: ''}">
<label>
File URL:
<input type="text" 
style="width:100%"
x-model="url"
name="url"
/>
</label>
<span
class="error-message"
></span>
<br/>
<p>
<a x-bind:href="
  'https://pagehelper.lets-script.com/relay?url=' + url
" x-text="url"></a>
</p>
</div>

What's happening behind the scenes is:

```bash
curl -LO https://pagehelper.lets-script.com/relay?url=https://github.com/Kitware/CMake/releases/download/v3.29.3/cmake-3.29.3-linux-x86_64.sh
```