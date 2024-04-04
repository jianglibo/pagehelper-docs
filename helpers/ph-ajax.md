---
title: ph-ajax
layout: default
nav_order: 5
has_children: false
parent: Helpers List
---

# ph-ajax attribute

Do ajax work.

{: .important }
> When invoking the ajax, if the source element has an attribute `ph-group-id`, it will send to the server with the header name: `Ph-Group-Id`, your server side code should echo the value. It's easy to write a fiter for it.
>
> When server response with data and an element with a `ph-on-group-response` will react to response.


## change group value

<div class="code-example" markdown="1">
<form>
<input type="text" name="name" ph-group-id="group-1" ph-on-group-response="value" ph-data-path="data.__changed_value" />
<select
  ph-evtname="change"
  ph-ajax="../../fixtures/group-changed?want=map"
  ph-group-id="group-1"
>
  <option value="1">one</option>
  <option value="2">two</option>
  <option value="3">three</option>
</select>

</form>
</div>
```html
<input type="text"
  name="name"
  ph-group-id="group-1"
  ph-on-group-response="value"
  ph-data-path="data.__changed_value" />
<select
  ph-evtname="change"
  ph-ajax="../../fixtures/group-changed?want=map"
  ph-group-id="group-1"
>
  <option value="1">one</option>
  <option value="2">two</option>
  <option value="3">three</option>
</select>
```

## change group by template

<div class="code-example" markdown="1">
{% raw %}
<form>
<select
  ph-group-id="group-1"
  ph-on-group-response="innerHTML"
>
<template>
  {{#data}}
  <option value="{{value}}">{{value}}</option>
  {{/data}}
</template>
</select>

<select
  ph-evtname="change"
  ph-ajax="../../fixtures/group-changed?want=list"
  ph-group-id="group-1"
>
  <option value="1">one</option>
  <option value="2">two</option>
  <option value="3">three</option>
</select>
{% endraw %}
</form>
</div>
```html
{% raw %}
<select
  ph-group-id="group-1"
  ph-on-group-response="innerHTML"
>
<template>
  {{#data}}
  <option value="{{value}}">{{value}}</option>
  {{/data}}
</template>
</select>

<select
  ph-evtname="change"
  ph-ajax="../../fixtures/group-changed?want=list"
  ph-group-id="group-1"
>
  <option value="1">one</option>
  <option value="2">two</option>
  <option value="3">three</option>
</select>
{% endraw %}
```


<!-- export type GroupMessageHandleCat =  -->

## extra attributes for this helper:

| name         | descriptio        | link |
|:-------------|:------------------|------|
| ph-on-group-response    | react to group response. when the repsponse's Ph-Group-Id matches my ph-group-id.  | 'outHTML' , 'innerHTML' , 'innerText' , 'value' , 'src' , 'href' , 'style' , 'class' , 'append' , 'prepend' , 'remove' , 'replace' , 'insertBefore' , 'insertAfter' , 'removeChild' , 'appendChild' |
| ph-data-path | extract final data from response| |

