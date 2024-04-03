---
title: ph-pjax-link
layout: default
nav_order: 3
has_children: false
parent: Helpers List
---

# ph-pjax-link attribute

Convert the link to do a ajax fetch, then replace the content and pushstate.

1. First click will create a query string: `ph-pjax-link?a=b&n=1`
2. Click again, will get `ph-pjax-link?a=b&n=1&fromqs=b`

<div class="code-example" markdown="1">
<button type="button" 
  name="button"
  class="btn"
  ph-params="a::b,n::1,fromqs:a"
  ph-pjax-link=".">
  Go
  </button>
</div>
```html
<button
  type="button"
  ph-mask="2"
  class="btn btn-sm"
  ph-params="a::b,n::1,fromqs:a"
  ph-link="."
>
  <span>Go</span>
</button>
```

{: .warning }
The pjax won't execute the script tag inside the body, if you need the script to be executed, you should add `ph-execute-me` attribute to script tag.

