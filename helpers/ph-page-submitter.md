---
title: ph-page-submitter
layout: default
nav_order: 11
has_children: false
parent: Helpers List
---

# ph-page-submitter attribute

When the value of an element changed, will summit the current page with changed value.

{: .highlight }

> Change the value of the form field and watch the url change.

## search field

<div class="code-example" markdown="1">
<code class="language-plaintext highlighter-rouge" ph-show-current-url></code>

<label>Type to search
<input type="search" name="search" ph-page-submitter="pjax" ph-config="delay::1500" ph-qs-to-value/>
</label>
</div>

```html
<label
  >Type to search
  <input
    type="search"
    name="search"
    ph-page-submitter="pjax"
    ph-config="delay::1500"
    ph-qs-to-value
  />
</label>
```

## select field

<div class="code-example" markdown="1">
<code class="language-plaintext highlighter-rouge" ph-show-current-url></code>

<label>Select size
<select name="size" 
 ph-page-submitter="pjax" 
 ph-qs-to-value="_:5">
<option value="5">5</option>
<option value="10">10</option>
<option value="20">20</option>
</select>
</label>
</div>

```html
<label
  >Select size
  <select
    name="size"
    ph-page-submitter="pjax"
    ph-qs-to-value="_:5"
  >
    <option value="5">5</option>
    <option value="10">10</option>
    <option value="20">20</option>
  </select>
</label>
```

## Checkbox field

<div class="code-example" markdown="1">
<code class="language-plaintext highlighter-rouge" ph-show-current-url></code>

<label>all
<input type="checkbox" name="all"
 ph-page-submitter="pjax"
 ph-qs-to-value="_:true"/>
</label>
</div>

```html
<label>all
<input type="checkbox" name="all"
 ph-page-submitter="pjax" 
 ph-qs-to-value="_:true"/>
</label>
<label>Type to search</label>
```

## submitter types

```typescript
type PjaxRequestType = "query" | "pjax" | "ajax";
```

{: .important }

> If you need more controll, consider using `ph-ajax` attribute.

## extra attributes for this helper:

| name           | descriptio                                                               | link |
| :------------- | :----------------------------------------------------------------------- | ---- |
| ph-qs-to-value | if you'd like to sync the submitter and the query string at client side. |      |

## ph-qs-to-value

The syntax is `qn:default,value|innerHTML|attributes`.

* qn:default Query name and default value
* value or innerHTML or attribute to set from the Query parameter from the url
