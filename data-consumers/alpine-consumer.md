---
title: Alpine Consumer
layout: default
nav_order: 50
has_children: false
parent: Data Consumers
---

# Alpine Consumer

[Alpine](https://alpinejs.dev/) provide the most flexable consumer.


{: .warning}

> When using Alpine consumer, remember to add `x-data` attribute to the parent node.
>
> Only existance of `x-data` will trigger the Alpine consumer.

As a convention only change the **data** field of the data context.

<button
  type="button"
  ph-params="id::3"
  ph-pjax-link="../../playground/"
  class="btn btn-sm">
<span x-text="btnLabel">Live DEMO</span>
</button>

<code class="language-plaintext highlighter-rouge" ph-show-response-body>Show response body here.</code>

<div class="code-example" markdown="1">
<ul
  ph-data-consumer="alpine:data"
  x-data="{data: [{name: 'a', id : 1}]}"
  id="data-consumer-1">
  <template x-for="it in data">
    <li x-text="`${it.name}(${it.id})`"></li>
  </template>
</ul>
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
<ul
  ph-data-consumer="alpine:data"
  x-data="{data: [{name: 'a', id : 1}]}"
  id="data-consumer-1">
  <template x-for="it in data">
    <li x-text="`${it.name}(${it.id})`"></li>
  </template>
</ul>
<button
  type="button"
  name="button"
  class="btn"
  ph-ajax="/fixtures/data-consumer"
  ph-target="#data-consumer-1">
  Query
</button>
```

## Parameters

`ph-data-consumer="alpine:data"` The `data` after the alpine is the path to the data.

In this example, the server response:

```json
{
  "data": [
    { "id": 1, "name": "A" },
    { "id": 2, "name": "B" },
    { "id": 3, "name": "C" }
  ]
}
```

So the `data` in the `x-data` context of the Alpine will be assign the new value:

```json
[
  { "id": 1, "name": "A" },
  { "id": 2, "name": "B" },
  { "id": 3, "name": "C" }
]
```

**The reactive nature of the Apline will update the UI**
