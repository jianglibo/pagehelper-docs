---
title: ph-row-selector
layout: default
nav_order: 3
has_children: false
parent: Helpers List
---

# ph-row-selector attribute

Will keep track of the selected rows and consume it in `ph-params`.

Default id extractor:

```typescript
this.valueAttr = (this.cfg && this.cfg.rowSelector?.attr) || "id";
this.idRegex = new RegExp(
  (this.cfg && this.cfg.rowSelector?.ptn) || "_row_(.*)"
);
```

<h2>Todo List</h2>

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
    <button>&laquo; Prev</button>
    <button class="active" ph-pjax-link="./" ph-params="*:*,page::1" ph-qs-to-css="page:1,innerHTML,active">1</button>
    <button ph-pjax-link="./" ph-params="*:*,page::2" ph-qs-to-css="page:1,innerHTML,active">2</button>
    <button ph-pjax-link="./" ph-params="*:*,page::3" ph-qs-to-css="page:1,innerHTML,active">3</button>
    <button>Next &raquo;</button>
    </div>
    <div>
        <span>Items per page:</span>
        <select ph-page-submitter="pjax" name="size" ph-sync="5">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
        </select>
    </div>
</div>

</div>

```html
<div
  ph-selector-listener="todo"
  ph-config="toggle::disabled"
>
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
      <th> <input type="checkbox" ph-row-selector-all="todo"/> </th>
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
  </tbody>
</table>
<div class="pagination">
    <div>
    <button>&laquo; Prev</button>
    <button class="active" ph-pjax-link="./" ph-params="*:*,page::1" ph-qs-to-css="page:1,innerHTML,active">1</button>
    <button ph-pjax-link="./" ph-params="*:*,page::2" ph-qs-to-css="page:1,innerHTML,active">2</button>
    <button ph-pjax-link="./" ph-params="*:*,page::3" ph-qs-to-css="page:1,innerHTML,active">3</button>
    <button>Next &raquo;</button>
    </div>
    <div>
        <span>Items per page:</span>
        <select ph-page-submitter="pjax" name="size" ph-sync="5">
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

## paginition by `ph-pjax-link` or `ph-ajax` and `ph-page-submitter`

by `ph-pjax-link`, the page number usually created at server side.

```html
    <div>
    <button>&laquo; Prev</button>
    <button class="active" ph-pjax-link="." ph-params="*:*,page::1">1</button>
    <button ph-pjax-link="." ph-params="*:*,page::2">2</button>
    <button ph-pjax-link="." ph-params="*:*,page::3">3</button>
    <button>Next &raquo;</button>
    </div>
```

If you prefer `ph-ajax`, using `ph-groupd-id` to link the paginition and the table, when json data return it will replace the content.

the return data shape doesn't matter, it's better to mustache friendly.


```html
<table ph-group-id="paginition-table" ph-on-group-response="innerHTML">
  <template>
    <!-- using mustache template to recreate the table content.  -->
  </template>
  <thead>
  </thead>
</table>

<button ph-pjax-link="." ph-params="*:*,page::2" ph-group-id="paginition-table">2</button>
```