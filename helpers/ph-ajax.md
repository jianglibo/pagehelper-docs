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
  ph-ajax="../../fixtures/group-changed"
  ph-params="want::map"
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
  ph-ajax="../../fixtures/group-changed"
  ph-params="want::map"
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
  ph-qs-to-value="_:1,value"
>
<template>
  {{#data}}
  <option value="{{value}}">{{value}}</option>
  {{/data}}
</template>
</select>

<select
ph-evtname="change"
ph-ajax="../../fixtures/group-changed"
ph-params="want::list"
ph-group-id="group-1"

>

  <option value="a">one</option>
  <option value="b">two</option>
  <option value="c">three</option>
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
ph-ajax="../../fixtures/group-changed"
ph-params="want::list"
ph-group-id="group-1"

>

  <option value="a">one</option>
  <option value="b">two</option>
  <option value="c">three</option>
</select>
{% endraw %}
```

{: .note }

> Ajax and the State.
>
> Explain the ajax and state in detail

## Ajax and State

Use attribute `ph-gropu-id` to map a UI element to a data received from the server.

The ajax element.

```html
<a
  href="."
  ph-ajax="."
  ph-group-id="list-users"
  ph-push-state
>
  Query
</a>
```

The response data.

```json
{
  "data": [
    { "name": "a", "age": 20 },
    { "name": "b", "age": 10 }
  ]
}
```

The history state will holder the value.

```json
{
  "phGroupStates": {
    "list-users": {
      "data": [
        { "name": "a", "age": 20 },
        { "name": "b", "age": 10 }
      ]
    }
  }
}
```

<div class="code-example" markdown="1">
<div class="select-all" ph-selector-listener="todo" ph-config="toggle::disabled">
    <button type="button" ph-mask="7" class="btn"
     ph-pjax-link="."
     ph-params="ids:::__selected_ids__/todo">
     New</button>
    <button type="button" ph-mask="2" class="btn"
     ph-pjax-link="."
     ph-params="ids:::__selected_ids__/todo">
    Edit</button>
    <button type="button" ph-mask="6" class="btn"
     ph-ajax="../../fixtures/todo"
     ph-method="delete"
     ph-params="ids:::__selected_ids__/todo">
    Delete</button>
</div>

<table>
    <thead>
        <tr>
            <th style="text-align:left;"><input type="checkbox" ph-row-selector-all="todo"></th>
            <th>ID</th>
            <th>Task</th>
            <th>Due Date</th>
            <th>Priority</th>
        </tr>
    </thead>
    <tbody ph-group-id="table1">
        <tr>
            <td><input type="checkbox" ph-row-selector="todo" id="_row_1"></td>
            <td>1</td>
            <td>Finish project report</td>
            <td>2024-03-25</td>
            <td>High</td>
        </tr>
        <tr>
            <td><input type="checkbox" ph-row-selector="todo" id="_row_2"></td>
            <td>2</td>
            <td>Buy groceries</td>
            <td>2024-03-24</td>
            <td>Medium</td>
        </tr>
        <tr>
            <td><input type="checkbox" ph-row-selector="todo" id="_row_3"></td>
            <td>3</td>
            <td>Call mom</td>
            <td>2024-03-26</td>
            <td>Low</td>
        </tr>
    </tbody>
</table>

<div class="pagination">
    <div>
    <button>&laquo; Prev</button>
    <button class="active" 
     ph-group-id="table1"
     ph-push-state
     ph-ajax="./"
     ph-params="*:*,page::1"
     ph-qs-to-css="page:1,innerHTML,active">1</button>
    <button 
    ph-group-id="table1" 
    ph-ajax="./"
    ph-push-state
    ph-params="*:*,page::2" 
    ph-qs-to-css="page:1,innerHTML,active">2</button>
    <button 
    ph-group-id="table1" 
    ph-ajax="./" 
    ph-push-state 
    ph-params="*:*,page::3"
    ph-qs-to-css="page:1,innerHTML,active">3</button>
    <button>Next &raquo;</button>
    </div>
    <div>
        <span>Items per page:</span>
        <select 
           ph-group-id="table1"
           ph-ajax="./" 
           ph-params="*:*,size:::this/value" 
           ph-push-state
           ph-evtname="change"
           name="size"
           ph-qs-to-value="size:5">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
        </select>
    </div>
</div>

</div>

<!-- export type GroupMessageHandleCat =  -->

## extra attributes for this helper:

| name                 | descriptio                                                                        | link                                                                                                                                                                                                |
| :------------------- | :-------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ph-on-group-response | react to group response. when the repsponse's Ph-Group-Id matches my ph-group-id. | 'outHTML' , 'innerHTML' , 'innerText' , 'value' , 'src' , 'href' , 'style' , 'class' , 'append' , 'prepend' , 'remove' , 'replace' , 'insertBefore' , 'insertAfter' , 'removeChild' , 'appendChild' |
| ph-data-path         | extract final data from response                                                  |                                                                                                                                                                                                     |
