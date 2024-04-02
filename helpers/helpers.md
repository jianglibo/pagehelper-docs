---
title: Helpers List
layout: default
nav_order: 20
has_children: true
---

# Helpers

By adding custom attributes to the HTML tag give the element extra functions.

The following code will enhance the link by fetching the target page and replace the page then push state.

```html
<a
  href="/new-page"
  ph-pjax-link
  ph-params="id:idInUrl"
  >ToNewPage</a
>
```
## List of helpers

* [ph-link]
* [ph-pjax-link]
* [ph-ajax]
* [ph-form]
* [ph-page-submitter]
* [ph-row-selector]

----

[ph-link]: helpers/