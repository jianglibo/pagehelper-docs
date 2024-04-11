---
title: Data Consumers
layout: default
nav_order: 15
has_children: true
---

# Data Consumer

An HTML element which consumes data.

<code class="language-plaintext highlighter-rouge" ph-show-response-body>Show response body here.</code>
<div class="code-example" markdown="1">
{% raw %}
<ul ph-data-consumer="innerhtml-mustache:any-value"
  id="data-consumer-1">
  <template>
    {{#data}}
    <li>{{name}}({{id}})</li>
    {{/data}}
  </template>
</ul>
{% endraw %}
<button
  type="button"
  name="button"
  class="btn"
  ph-ajax="/fixtures/data-consumer"
  ph-target="#data-consumer-1">
  Query
</button>
</div>
```html
{% raw %}
<ul ph-data-consumer="innerhtml-mustach:any-custom-value"
  id="data-consumer">
  <template>
    {{#data}}
    <li>{{name}}({{id}})</li>
    {{/data}}
  </template>
</ul>
{% endraw %}
<button
  type="button"
  name="button"
  class="btn"
  ph-ajax="/fixtures/data-consumer"
  ph-target="#data-consumer"
>
  Query
</button>
```

If the server returns data

```json
{
  "data": [
    { "name": "a", "id": 1 },
    { "name": "b", "id": 2 },
    { "name": "c", "id": 3 }
  ]
}
```

## Register Data Consumer Handler

```html
<script type="module">
  import {
    PageHelper,
    FormEnricher,
  } from "https://cdn.jsdelivr.net/gh/jianglibo/pagehelper-docs@latest/dist/bundle.min.es.js";
  const pageHelper = new PageHelper({ debug: true }); // Cfg
  pageHelper.registerDataConsumer(
    "my-consumer-handler",
    (src, target, responseData) => {
      target.innerHTML = "";
    }
  );
  pageHelper.enrich();
</script>
```
