---
title: ph-link
layout: default
nav_order: 1
has_children: false
parent: Helpers List
---

# ph-link attribute

It's just a link, you could add parameters easily.

```html
<button
  type="button"
  ph-mask="2"
  class="btn btn-sm"
  ph-params="selectedIds:::__selected_ids__/apikey"
  ph-link="./edit"
>
  <span>Edit</span>
</button>
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
