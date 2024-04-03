---
title: ph-ajax
layout: default
nav_order: 5
has_children: false
parent: Helpers List
---

# ph-ajax attribute

Do ajax work.

<div class="code-example" markdown="1">
<form>
<input type="text" name="name"/>
<select
  ph-evtname="change"
  ph-ajax="../../fixtures/group-response.json"
  ph-group-id="group-1"
>
  <option value="1">one</option>
  <option value="2">two</option>
  <option value="3">three</option>
</select>

</form>
</div>
```html
<select
  ph-evtname="change"
  ph-ajax="../../fixtures/group-response.json"
  ph-group-id="group-1"
>
  <option value="1">one</option>
  <option value="2">two</option>
  <option value="3">three</option>
</select>

```

when clicked will visit:

```
/edit?selectedIds=1,2,3
```

the default id separator is ',', but you could customize it.

```typescript
export type Cfg = {
  selectedIdSeparator?: string; // default: ','
  selectedIdHolder?: SelectedIdHolder;
  debug?: boolean;
  disable_pjax?: boolean;
  rowSelector?: {
    attr?: string;
    ptn?: string;
  };
}
```
