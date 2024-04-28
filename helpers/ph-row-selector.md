---
title: ph-row-selector
layout: default
nav_order: 3
has_children: false
description: A table row selector for server side rendered static web pages, make the super easy to track the selected rows.
parent: Helpers List
---

# ph-row-selector attribute

{: .important }

> It's for traditional multipage webpages, Single page app has no need to use this pagehelper.

Will keep track of the selected rows and consume it in `ph-params`.

Default id extractor:

```typescript
this.valueAttr = (this.cfg && this.cfg.rowSelector?.attr) || "id";
this.idRegex = new RegExp(
  (this.cfg && this.cfg.rowSelector?.ptn) || "_row_(.*)"
);
```

## attributes for this helper:

| name                 | descriptio                                                                                              | link |
| :------------------- | :------------------------------------------------------------------------------------------------------ | ---- |
| ph-row-selector      | `ph-row-selector="todo"`, for individual select item                                                    |      |
| ph-row-selector-all  | `ph-row-selector-all="todo"`, for select all item                                                       |      |
| ph-selector-listener | `ph-selector-listener="todo"`, for menuitem to react on selection number.`ph-config="toggle::disabled"` or `ph-config="toggle::classname"` |      |

## How row selector works?

Say we have a `ph-row-selector="fruit"`, when user click to the value, the selected ids in memory/sessionStorage/localStorage will keep sync..

Bellow is select state of this path.

<code class="language-plaintext highlighter-rouge" ph-show-select-state>Show select state here.</code>

<div class="code-example" markdown="1">
<form>
    <input type="checkbox" ph-row-selector="fruit" id="_row_101"/>
    <input type="checkbox" ph-row-selector="fruit" id="_row_102"/>
    <input type="checkbox" ph-row-selector="fruit" id="_row_103"/>
</form>
<label>All<input type="checkbox" ph-row-selector-all="fruit"></label>
</div>
```html
<input type="checkbox" ph-row-selector="fruit" id="_row_101"/>
<input type="checkbox" ph-row-selector="fruit" id="_row_102"/>
<input type="checkbox" ph-row-selector="fruit" id="_row_103"/>
<label>All<input type="checkbox" ph-row-selector-all="fruit"></label>
```

And a `ph-selector-listener="fruit"` will be notified when selected id changes. Here use `ph-config="toggle::disabled"` to toggle the status of the button based on the selection number. User `ph-config="toggle::your-class-name` to toggle class.

<div class="code-example" markdown="1">
<div class="select-all" ph-selector-listener="fruit" ph-config="toggle::disabled">
    <button type="button" ph-mask="7" class="btn"
     ph-pjax-link="."
     ph-params="ids:::__selected_ids__/fruit">
     New</button>
    <button type="button" ph-mask="2" class="btn"
     ph-pjax-link="."
     ph-params="ids:::__selected_ids__/fruit">
    Edit</button>
    <button type="button" ph-mask="6" class="btn"
     ph-ajax="../../fixtures/fruit"
     ph-method="delete"
     ph-params="ids:::__selected_ids__/fruit">
    Delete</button>
</div>
</div>
```html
<div class="select-all" ph-selector-listener="fruit" ph-config="toggle::disabled">
    <button type="button" ph-mask="7" class="btn"
     ph-pjax-link="."
     ph-params="ids:::__selected_ids__/fruit">
     New</button>
    <button type="button" ph-mask="2" class="btn"
     ph-pjax-link="."
     ph-params="ids:::__selected_ids__/fruit">
    Edit</button>
    <button type="button" ph-mask="6" class="btn"
     ph-ajax="../../fixtures/fruit"
     ph-method="delete"
     ph-params="ids:::__selected_ids__/fruit">
    Delete</button>
</div>
```

## How to get the selected ids by JS

Using `ph.getSelectedIds()` to get the selected ids for current url path.

<div x-data class="code-example" markdown="1">
<button
type="button"
class="btn"
x-on:click.prevent="alert(JSON.stringify(ph.getSelectedIds(),null, 2))">
 Show selectedIds
</button>
</div>
```html
<button
type="button"
class="btn"
x-on:click.prevent="alert(JSON.stringify(ph.getSelectedIds(),null, 2))">
 Show selectedIds
</button>
</div>
```

## Todo List

<code class="language-plaintext highlighter-rouge" x-data x-text="window.location.href" ></code>

<code class="language-plaintext highlighter-rouge" ph-show-select-state="__ph">Show history state here.</code>

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
    <tbody>
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
    <button
     ph-params="*:*"
     ph-qs-step="page:1,min:1,disabled"
     ph-pjax-link="./">&laquo; Prev</button>
    <button class="active" ph-pjax-link="./" ph-params="*:*,page::1" ph-qs-to-css="page:1,innerHTML,active">1</button>
    <button ph-pjax-link="./" ph-params="*:*,page::2" ph-qs-to-css="page:1,innerHTML,active">2</button>
    <button ph-pjax-link="./" ph-params="*:*,page::3" ph-qs-to-css="page:1,innerHTML,active">3</button>
    <button 
    ph-params="*:*"
    ph-qs-step="page:1,max:3,disabled" ph-pjax-link="./">Next &raquo;</button>
    </div>
    <div>
        <span>Items per page:</span>
        <select ph-page-submitter="pjax" name="size" ph-qs-to-value="size:5">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
        </select>
    </div>
</div>

</div>

```html
<div
  class="select-all"
  ph-selector-listener="todo"
  ph-config="toggle::disabled"
>
  <button
    type="button"
    ph-mask="7"
    class="btn"
    ph-pjax-link="."
    ph-params="ids:::__selected_ids__/todo"
  >
    New
  </button>
  <button
    type="button"
    ph-mask="2"
    class="btn"
    ph-pjax-link="."
    ph-params="ids:::__selected_ids__/todo"
  >
    Edit
  </button>
  <button
    type="button"
    ph-mask="6"
    class="btn"
    ph-ajax="../../fixtures/todo"
    ph-method="delete"
    ph-params="ids:::__selected_ids__/todo"
  >
    Delete
  </button>
</div>

<table>
  <thead>
    <tr>
      <th style="text-align:left;">
        <input
          type="checkbox"
          ph-row-selector-all="todo"
        />
      </th>
      <th>ID</th>
      <th>Task</th>
      <th>Due Date</th>
      <th>Priority</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <input
          type="checkbox"
          ph-row-selector="todo"
          id="_row_1"
        />
      </td>
      <td>1</td>
      <td>Finish project report</td>
      <td>2024-03-25</td>
      <td>High</td>
    </tr>
    <tr>
      <td>
        <input
          type="checkbox"
          ph-row-selector="todo"
          id="_row_2"
        />
      </td>
      <td>2</td>
      <td>Buy groceries</td>
      <td>2024-03-24</td>
      <td>Medium</td>
    </tr>
    <tr>
      <td>
        <input
          type="checkbox"
          ph-row-selector="todo"
          id="_row_3"
        />
      </td>
      <td>3</td>
      <td>Call mom</td>
      <td>2024-03-26</td>
      <td>Low</td>
    </tr>
  </tbody>
</table>
<div class="pagination">
  <div>
    <button
      ph-params="*:*"
      ph-qs-step="page:1,min:1,disabled"
      ph-pjax-link="./"
    >
      &laquo; Prev
    </button>
    <button
      class="active"
      ph-pjax-link="./"
      ph-params="*:*,page::1"
      ph-qs-to-css="page:1,innerHTML,active"
    >
      1
    </button>
    <button
      ph-pjax-link="./"
      ph-params="*:*,page::2"
      ph-qs-to-css="page:1,innerHTML,active"
    >
      2
    </button>
    <button
      ph-pjax-link="./"
      ph-params="*:*,page::3"
      ph-qs-to-css="page:1,innerHTML,active"
    >
      3
    </button>
    <button
      ph-params="*:*"
      ph-qs-step="page:1,max:3,disabled"
      ph-pjax-link="./"
    >
      Next &raquo;
    </button>
  </div>
  <div>
    <span>Items per page:</span>
    <select
      ph-page-submitter="pjax"
      name="size"
      ph-qs-to-value="size:5"
    >
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
    </select>
  </div>
</div>
```

How `ph-selector-listener` react to the selection change.
string will be treat as a class name.

```typescript
type ToggleName = "disabled" | "visibility" | "display" | string;
```

## Delete item

When delete button clicked, the Ajax reques will add a header named `Ph-Selector-Name`, when the server returns data, carry the value so that the row will be deleted.

```json
{
  "data": [
    {
      "action": "TOAST",
      "params": {
        "toast": {
          "icon": "success",
          "title": "Deleted.",
          "timer": 3000
        }
      }
    },
    {
      "action": "DELETE_ROWS",
      "params": {
        "ids": [
          {
            "id": 694,
            "name": "todo"
          }
        ]
      }
    }
  ]
}
```
