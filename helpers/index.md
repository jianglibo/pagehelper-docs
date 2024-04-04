---
title: Helpers List
layout: default
nav_order: 20
has_children: true
---

# Helpers

By adding custom attributes to the HTML tag give the element extra functions.

The following code will enhance the link by fetching the target page and replace the page then push state.

<div class="code-example" markdown="1">
<a href="./"
  ph-pjax-link
  ph-params="id:idInUrl">ToNewPage</a>
</div>
```html
<a href="./"
  ph-pjax-link
  ph-params="id:idInUrl">
  ToNewPage</a>
```
