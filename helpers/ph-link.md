---
title: ph-link
layout: default
nav_order: 1
has_children: false
parent: Helpers List
---

# ph-link attribute

It's just a link, you could add parameters easily.


<div class="code-example" markdown="1">
<span id="value-to-query">toServer</span>
</div>
```html
<span id="value-to-query">toServer</span>
```

<script>
  let vtq = document.getElementById('value-to-query');
  let v = Math.floor(Math.random() * (100 - 1)) + 1;
  vtq.innerHTML = 'toServer-' + v
</script>

<div class="code-example" markdown="1">
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
