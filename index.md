---
title: Home
layout: default
nav_order: 1
---

# A pagehelper make some things easier.

It's not a framework. It's a small tool.

get started:

```html
<script type="module">
  import { PageHelper, FormEnricher } from "/dist/bundle.es.js";
  const pageHelper = new PageHelper({ debug: true }); // Cfg
  // pageHelper.disableAll().add(new FormEnricher()).enrich();
  pageHelper.enrich();
</script>
```

the config object:

```typescript
export type Cfg = {
  selectedIdSeparator?: string; // default: ','
  selectedIdHolder?: SelectedIdHolder;
  debug?: boolean;
  disable_pjax?: boolean;
  rowSelector?: {
    attr?: string;
    ptn?: string;
  };
};
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
