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
<code class="language-plaintext highlighter-rouge" x-data x-text="window.location.href" ></code>


<button type="button" 
  name="button"
  class="btn"
  ph-params="a::b,n::1,fromqs:a"
  ph-pjax-link="./">
  Go
  </button>
</div>
```html
<button
  type="button"
  ph-mask="2"
  class="btn btn-sm"
  ph-params="a::b,n::1,fromqs:a"
  ph-link="./"
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
Because replace the innerHTML of the body won't fire DOMContentLoaded event. You maybe should fire it manually.

There's an event be fired after replace:

```typescript
export type PjaxPageLoadedEvent = CustomEvent<{
  url: string;
  fromPopState: boolean;
}>;

window.addEventListener("pjaxPageLoaded", (e) => {
  var domContentLoadedEvent = new Event("DOMContentLoaded", {
    bubbles: true,
    cancelable: true,
  });
  // Dispatch the event on the document object
  document.dispatchEvent(domContentLoadedEvent);
});
```

{: .warning }

> Mind the global Cfg object. The `ph-not-execute-me` and `ph-execte-me` always take effect. but the `script_exclude_patterns` dependends on `execute_scripts_default`.
>
> If `execute_scripts_default=false(default)`, `script_exclude_patterns` will match the scripts to run.
>
> If `execute_scripts_default=true`, `script_exclude_patterns` will match the scripts **not** to run.

```typescript
export type Cfg = {
  selectedIdSeparator?: string; // default: ','
  debug?: boolean;
  disable_pjax?: boolean;
  execute_scripts_default?: boolean;
  script_exclude_patterns?: RegExp[];
  rowSelector?: {
    attr?: string;
    ptn?: string;
  };
};
```

## The config of this site

The config bellow will execute these two script tag after Ajax replace the page.

```html
<script
  type="module"
  ph-not-execute-me
>
  import { PageHelper } from "{{ site.baseurl }}/dist/bundle.min.es.js";
  const pageHelper = new PageHelper({
    debug: true,
  });
  console.log(pageHelper.listBuiltins());
  pageHelper.enrich();
  window.addEventListener("pjaxPageLoaded", (e) => {
    var domContentLoadedEvent = new Event("DOMContentLoaded", {
      bubbles: true,
      cancelable: true,
    });
    // Dispatch the event on the document object
    document.dispatchEvent(domContentLoadedEvent);
  });
</script>
```
