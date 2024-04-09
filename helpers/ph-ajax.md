---
title: ph-ajax
layout: default
nav_order: 5
has_children: false
parent: Helpers List
---

# ph-ajax attribute

Do ajax work. The table bellow is a mix of pjax and ajax calls. The browser's backward and forward keep working.

<!-- export type GroupMessageHandleCat =  -->

## extra attributes for this helper:

| name          | descriptio                                                                                  | link                                 |
| :------------ | :------------------------------------------------------------------------------------------ | ------------------------------------ |
| ph-params     | append extra values to ajax request                                                         | [value-collector](/value-collector/) |
| ph-headers    | append extra headers to ajax request                                                        | [value-collector](/value-collector/) |
| ph-json       | all kvs will send as a json object, if the method is GET, will append to `body` query name. |                                      |
| ph-auto-start | will invoke the ajax request when dom ready.                                                |                                      |
| ph-once       | will only invoke once. sometimes element with ph-auto-start need this.                      |                                      |

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
    <tbody ph-group-id="table1" ph-data-consumer="innerhtml-mustache">
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
      ph-qs-step="page:1,min:1,disabled"
      ph-target='[ph-group-id="table1"]'>
    &laquo; Prev</button>
    <button class="active" 
     ph-target='[ph-group-id="table1"]'
     ph-push-state
     ph-ajax="./"
     ph-id="p-1"
     ph-params="*:*,page::1"
     ph-qs-to-css="page:1,innerHTML,active">1</button>
    <button 
    ph-target='[ph-group-id="table1"]'
    ph-ajax="./"
     ph-id="p-2"
    ph-push-state
    ph-params="*:*,page::2" 
    ph-qs-to-css="page:1,innerHTML,active">2</button>
    <button 
    ph-target='[ph-group-id="table1"]'
    ph-ajax="./"  
    ph-push-state 
    ph-id="p-3"
    ph-params="*:*,page::3"
    ph-qs-to-css="page:1,innerHTML,active">3</button>
    <button ph-ajax="./" 
      ph-push-state
      ph-params="*:*"
      ph-qs-step="page:1,max:3,disabled"
      ph-target='[ph-group-id="table1"]'>Next
      &raquo;</button>
    </div>
    <div>
        <span>Items per page:</span>
        <select 
           ph-target='[ph-group-id="table1"]'
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

## change target value

Using `ph-data-consumer="value"` to consume the server response.

<div class="code-example" markdown="1">
<form>
<input type="text" name="name" 
  id="input-select-value"
  ph-data-consumer="value"
  ph-data-path="data.__changed_value" />
<select
  ph-evtname="change"
  ph-ajax="../../fixtures/group-changed"
  ph-params="want::map"
  ph-target="#input-select-value"
>
  <option value="1">one</option>
  <option value="2">two</option>
  <option value="3">three</option>
</select>

</form>
</div>
```html
<input type="text" name="name" 
  id="input-select-value"
  ph-data-consumer="value"
  ph-data-path="data.__changed_value" />
<select
  ph-evtname="change"
  ph-ajax="../../fixtures/group-changed"
  ph-params="want::map"
  ph-target="#input-select-value"
>
  <option value="1">one</option>
  <option value="2">two</option>
  <option value="3">three</option>
</select>
```

## change target innerHTML

Using `ph-data-consumer="innerhtml-mustach"` to consume the data from response.

<div class="code-example" markdown="1">
{% raw %}
<form>
<select
  id="select-consumer"
  ph-data-consumer="innerhtml-mustache"
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
ph-target="#select-consumer">

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
  id="select-consumer"
  ph-data-consumer="innerhtml-mustache"
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
ph-target="#select-consumer">

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

Using a `__pn` namespace in the history.state to keep the state.

```json
{
  "selectedIds": {
    "todo": [1, 2, 3]
  },
  "phIdStates": {
    "ph-id-value": {
      "any": "data from the server by this trigger"
    }
  }
}
```

{: .warning }
> Don't over use this function, Maybe you shoud use other framework instead of this tool to do that kind of things.