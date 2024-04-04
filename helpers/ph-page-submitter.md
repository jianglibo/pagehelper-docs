---
title: ph-page-submitter
layout: default
nav_order: 11
has_children: false
parent: Helpers List
---

# ph-page-submitter attribute

When the value of an element changed, will summit the current page with changed value.


## search field
<div class="code-example" markdown="1">
<label>Type to search
<input type="search" name="search" ph-page-submitter="pjax" ph-config="delay::1500" ph-qs-to-value/>
</label>
</div>

```html
<label>Type to search
<input type="search" name="search" ph-page-submitter="pjax" ph-config="delay::1500" ph-qs-to-value />
</label>
```

## select field

<div class="code-example" markdown="1">
<label>Select size
<select name="size" ph-page-submitter="pjax" ph-qs-to-value>
<option value="5">5</option>
<option value="10">10</option>
<option value="20">20</option>
</select>
</label>
</div>

```html
<label>Type to search
<label>Select size
<select name="size" ph-page-submitter="pjax" ph-qs-to-value>
<option value="5">5</option>
<option value="10">10</option>
<option value="20">20</option>
</select>
</label>
```

## Checkbox field

<div class="code-example" markdown="1">
<label>all
<input type="checkbox" name="all" ph-page-submitter="pjax" ph-qs-to-value/>
</label>
</div>

```html
<label>all
<input type="checkbox" name="all" ph-page-submitter="pjax" ph-qs-to-value/>
</label>
<label>Type to search
```

## submitter types

```typescript
type PjaxRequestType = 'query' | 'pjax' | 'ajax'
```

## extra attributes for this helper:

| name         | descriptio        | link |
|:-------------|:------------------|------|
| ph-qs-to-value    | if you'd like to sync the submitter and the query string at client side.  | |

