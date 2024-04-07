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

## extra attributes for this helper:

| name      | descriptio                         | link                                                                         |
| :-------- | :--------------------------------- | ---------------------------------------------------------------------------- |
| ph-params | append query parameters to the url | <a href="{{site.baseurl}}/value-collector/" ph-pjax-link>value collector</a> |

## Caveats

{: .warning }
The pjax will default execute all the script tag inside the body after replace the page content, if you don't want the script to be executed, you should add `ph-not-execute-me` attribute to script tag.

{: .warning }
And the events listen on the `document.body` need to add again after page replace.

There's an event be fired after replace:

```typescript
window.addEventListener("pjaxPageLoaded", (e) => {
  if (this.cfg.debug) {
    console.log("pjaxPageLoaded event from pjax:", e);
  }
  document.body.addEventListener("click", (ee) => {
    // add your code here.
  });
});
```

## Execute scripts in the header

Sometimes you cannot control or it's not easy to controll the source of the page, like this Jekyll template, you could add patterns to `script_execlude_patterns` to avoid re-execute of the script tag.


```typescript
export type Cfg = {
  selectedIdSeparator?: string;
  selectedIdHolder?: SelectedIdHolder;
  debug?: boolean;
  disable_pjax?: boolean;
  scripts_exclude_patterns?: RegExp[];
  rowSelector?: {
    attr?: string;
    ptn?: string;
  };
};
```

## The config of this site

The config bellow will execute these two script tag after Ajax replace the page.

```html
<script type="module" ph-not-execute-me>
  import { PageHelper } from "{{ site.baseurl }}/dist/bundle.min.es.js";
  const pageHelper = new PageHelper({
    debug: true
  });
  console.log(pageHelper.listBuiltins());
  pageHelper.enrich();
</script>
```
