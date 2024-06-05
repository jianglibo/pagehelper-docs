---
title: ph-toggler
layout: default
nav_order: 80
has_children: false
parent: Helpers List
---

# ph-toggler attribute

Toggle the state of an html element.


<div class="code-example" markdown="1">
<textarea id="textarea-to-clipboard" style="width:100%;">Toggle me</textarea>
<button class="btn" type="button" ph-toggler="prev!..textarea" ph-config="ontext::Hide textarea,offtext::Show textarea">Hide textarea</button>
</div>
```html
<textarea id="textarea-to-clipboard" style="width:100%;">Toggle me</textarea>
<button class="btn" type="button" ph-toggler="prev!..textarea" ph-config="ontext::Hide textarea,offtext::Show textarea">Hide textarea</button>
```


## extra attributes for this helper:

| name                 | description                  | link |
| :------------------- | :-------------------------- | ---- |
| ph-config            | ontext and offtext. default is `class=display`, switch between `block` and `none`        |      |
| ph-toggler           | `prev!tag`, `next!tag`, `prev!..tag` or css selector. |          |      
