---
title: ph-link
layout: default
nav_order: 1
has_children: false
description: Elevate your link functionality with our ph-link attribute. Seamlessly append additional parameters from various sources, including URL path, query string, HTML element values, and inner HTML content. Expand the versatility of your links for enhanced user engagement and dynamic content delivery.
parent: Helpers List
---

# ph-link attribute

It's just a link, you could add parameters easily.

<div class="code-example" markdown="1">
<span id="value-to-query">toServer</span>
</div>
```html
<span id="value-to-query">toServer</span>
<script>
  let vtq = document.getElementById('value-to-query');
  let v = Math.floor(Math.random() * (100 - 1)) + 1;
  vtq.innerHTML = 'toServer-' + v
</script>
```

<script>
  let vtq = document.getElementById('value-to-query');
  let v = Math.floor(Math.random() * (100 - 1)) + 1;
  vtq.innerHTML = 'toServer-' + v
</script>

<div class="code-example" markdown="1">
<code class="language-plaintext highlighter-rouge" x-data x-text="window.location.href" ></code>

<button
type="button"
ph-mask="2"
class="btn btn-sm"
ph-params="selectedIds:::#value-to-query/innerHTML"
ph-link="./">
 <span>Add Query</span>
</button>
</div>

```html
<button
  type="button"
  ph-mask="2"
  class="btn btn-sm"
  ph-params="selectedIds:::#value-to-query/innerHTML"
  ph-link="./"
>
  <span>Edit</span>
</button>
```

## extra attributes for this helper:

| name      | descriptio                         | link                                                                         |
| :-------- | :--------------------------------- | ---------------------------------------------------------------------------- |
| ph-params | append query parameters to the url | <a href="{{site.baseurl}}/value-collector/" ph-pjax-link>value collector</a> |
