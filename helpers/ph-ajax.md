---
title: ph-ajax
layout: default
nav_order: 5
has_children: false
parent: Helpers List
---

# ph-ajax attribute

Do ajax work. The table bellow is a mix of pjax and ajax calls. The browser's backward and forward keep working.

{: .note }
> If you only use pjax, it will be easier.

<div class="code-example" markdown="1">
<div class="select-all" ph-selector-listener="todo" ph-config="toggle::disabled">
    <button type="button"
     class="btn"
     ph-mask="7"
     ph-pjax-link="../ph-form/">
     New</button>
    <button type="button"
     class="btn"
     ph-mask="2" 
     ph-pjax-link="./"
     ph-params="ids:::__selected_ids__/todo">
    Edit</button>
    <button type="button" class="btn"
     ph-mask="6" 
     ph-ajax="../../fixtures/todo"
     ph-method="delete"
     ph-params="ids:::__selected_ids__/todo">
    Delete</button>
</div>

<table>
    <thead>
        <tr>
            <th style="text-align:left;">
              <input type="checkbox" ph-row-selector-all="todo">
            </th>
            <th>ID</th>
            <th>Task</th>
            <th>Due Date</th>
            <th>Priority</th>
        </tr>
    </thead>
    <tbody ph-group-id="table1" ph-on-group-response="innerHTML">
        {% raw %}
        <template>
          {{#data}}
          <tr>
            <td><input type="checkbox" ph-row-selector="todo" id="_row_{{id}}"></td>
            <td>{{id}}</td>
            <td>{{task}}</td>
            <td>{{dueDate}}</td>
            <td>{{priority}}</td>
            </tr>
            {{/data}}
        </template>
        {% endraw %}
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
    <button ph-ajax="./" 
      ph-push-state
      ph-params="*:*"
      ph-qs-step="page:1,min:1"
      ph-group-id="table1">
    &laquo; Prev</button>
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
    <button ph-ajax="./" 
      ph-push-state
      ph-params="*:*"
      ph-qs-step="page:1,max:3"
      ph-group-id="table1">Next
      &raquo;</button>
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

```html
<div class="select-all" ph-selector-listener="todo" ph-config="toggle::disabled">
    <button type="button"
     class="btn"
     ph-mask="7"
     ph-pjax-link="../ph-form/">
     New</button>
    <button type="button"
     class="btn"
     ph-mask="2" 
     ph-pjax-link="./"
     ph-params="ids:::__selected_ids__/todo">
    Edit</button>
    <button type="button" class="btn"
     ph-mask="6" 
     ph-ajax="../../fixtures/todo"
     ph-method="delete"
     ph-params="ids:::__selected_ids__/todo">
    Delete</button>
</div>

<table>
    <thead>
        <tr>
            <th style="text-align:left;">
              <input type="checkbox" ph-row-selector-all="todo">
            </th>
            <th>ID</th>
            <th>Task</th>
            <th>Due Date</th>
            <th>Priority</th>
        </tr>
    </thead>
    <tbody ph-group-id="table1" ph-on-group-response="innerHTML">
        {% raw %}
        <template>
          {{#data}}
          <tr>
            <td><input type="checkbox" ph-row-selector="todo" id="_row_{{id}}"></td>
            <td>{{id}}</td>
            <td>{{task}}</td>
            <td>{{dueDate}}</td>
            <td>{{priority}}</td>
            </tr>
            {{/data}}
        </template>
        {% endraw %}
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
    <button ph-ajax="./" 
      ph-push-state
      ph-params="*:*"
      ph-qs-step="page:1,min:1"
      ph-group-id="table1">
    &laquo; Prev</button>
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
    <button ph-ajax="./" 
      ph-push-state
      ph-params="*:*"
      ph-qs-step="page:1,max:3"
      ph-group-id="table1">Next
      &raquo;</button>
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
```
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

<!-- export type GroupMessageHandleCat =  -->

## extra attributes for this helper:

| name                 | descriptio                                                                        | link                                                                                                                                                                                                |
| :------------------- | :-------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ph-on-group-response | react to group response. when the repsponse's Ph-Group-Id matches my ph-group-id. | 'outHTML' , **'innerHTML'** , 'innerText' , **'value'** , 'src' , 'href' , 'style' , 'class' , 'append' , 'prepend' , 'remove' , 'replace' , 'insertBefore' , 'insertAfter' , 'removeChild' , 'appendChild', **Only support bolded item only** |
| ph-data-path         | extract final data from response                                                  |                                                                                                                                                                                                     |
