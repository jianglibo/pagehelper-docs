---
title: Home
layout: home
nav_order: 1
---

# A Pagehelper.

Pagehelper is a utility designed to make common processes simpler and more efficient in web page development.

It's not a framework, just a tool.

get started:

```html
<script type="module">
  import {
    PageHelper,
    FormEnricher,
  } from "https://cdn.jsdelivr.net/gh/jianglibo/pagehelper-docs@latest/dist/bundle.min.es.js";
  const pageHelper = new PageHelper({ debug: true }); // Cfg
  // pageHelper.disableAll().add(new FormEnricher()).enrich();
  pageHelper.enrich();
</script>
```

the config object:

```typescript
export type Cfg = {
	selectedIdSeparator?: string // default: ','
	debug?: boolean
	disable_pjax?: boolean
	execute_scripts_default?: boolean
	script_exclude_patterns?: RegExp[]
	rowSelector?: {
		attr?: string,
		ptn?: string
	},
}
```

add attributes to html tag:

```html
<a
  href="../pjax-link-1.html"
  ph-pjax-link
  ph-params="a::1,b::2,c::3"
>
  To pjax-link-1</a
>
```



<div class="code-example" markdown="1">
<button type="button" name="button" class="btn" ph-pjax-link="./examples/ph-pjax-link-1/">Will load by pjax</button>

</div>
```html
<button type="button" 
name="button" 
class="btn" 
ph-pjax-link="./examples/ph-pjax-link-1/">
  Will load by pjax
</button>
```

<ph ph-css-to-head="https://pagehelper.lets-script.com/highlight/" ph-params="css::highlight.js" inline />
