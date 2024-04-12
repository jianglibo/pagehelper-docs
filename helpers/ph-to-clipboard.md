---
title: ph-to-clipboard
layout: default
nav_order: 70
has_children: false
parent: Helpers List
---

# ph-to-clipboard attribute

Copy the content of the selector to Clipboard.

<div class="code-example" markdown="1">
<textarea id="textarea-to-clipboard" style="width:100%;">To Clipboard</textarea>
<button class="btn" type="button" ph-to-clipboard="#textarea-to-clipboard">click to copy</button>
</div>
```html
<textarea id="textarea-to-clipboard" style="width:100%;">To Clipboard</textarea>
<button ph-to-clipboard="#textarea-to-clipboard">click to copy</button>
```

## copy innerhtml

<div class="code-example" markdown="1">
<div id="innerhtml-to-copy">
<p>Hello</p>
<p>World</p>
</div>
<button class="btn" type="button" ph-to-clipboard="#innerhtml-to-copy">click to copy</button>
</div>
```html
<div id="innerhtml-to-copy">
<p>Hello</p>
<p>World</p>
</div>
<button class="btn" type="button" ph-to-clipboard="#innerhtml-to-copy">click to copy</button>
```

## copy self

<div class="code-example" markdown="1">
<p id="self-to-copy" ph-to-clipboard>Hello,World</p>
</div>
```html
<p id="self-to-copy" ph-to-clipboard>Hello,World</p>
```

## extra attributes for this helper:

| name                 | description                  | link |
| :------------------- | :-------------------------- | ---- |
| ph-no-copied-message | suspend the copied message. |      |
