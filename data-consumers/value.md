---
title: Value consumer
layout: default
nav_order: 40
has_children: false
parent: Data Consumers
---

# ph-data-consumer="value"

Usually company with `ph-data-path` to extract the response data and set the value of the element.

<div class="code-example" markdown="1">
<input id="value-consumer"
  value="value will change"
  ph-data-consumer="value"
  ph-data-path="data[0].value"
  />

<code class="language-plaintext highlighter-rouge" ph-show-response-body>Show response body here.</code>

<form>
<select
ph-evtname="change"
ph-ajax="../../fixtures/group-changed"
ph-params="want::list"
ph-target="#value-consumer">

  <option value="a">one</option>
  <option value="b">two</option>
  <option value="c">three</option>
</select>
</form>
</div>
```html
<input id="value-consumer"
  value="value will change"
  ph-data-consumer="value"
  ph-data-path="data[0].value"
  />

<code class="language-plaintext highlighter-rouge" ph-show-response-body>Show response body here.</code>

<form>
<select
ph-evtname="change"
ph-ajax="../../fixtures/group-changed"
ph-params="want::list"
ph-target="#value-consumer">

  <option value="a">one</option>
  <option value="b">two</option>
  <option value="c">three</option>
</select>
</form>
```