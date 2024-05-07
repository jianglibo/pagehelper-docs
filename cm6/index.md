---
title: Codemirror tools
layout: default
nav_order: 95
has_children: true
---

## Codemirror tools

Some data about codemirror tools.

### makecm6 function

```typescript
export default async function cm6({
  wrap,
  stateInUrl,
  cb,
}: {
  wrap: HTMLElement | string;
  stateInUrl?: string | StateInUrl;
  cb?: (currentContent: string) => void;
}) {}
```

### wrapped input attributes

```html
<div class="cm-editor-wrap">
  <input
    type="hidden"
    name="html"
    id="playground-html"
    x-data
    x-on:demo-change.window="$el.value=$store.demos.currentItem.html;$dispatch('writeback', {value: $store.demos.currentItem.html})"
    x-on:change="console.log($el.value)"
    data-final-try="/devtools/finaltry"
    data-finalc="https://pagehelper.lets-script.com/completions/ph"
    data-lang="html"
    data-height="150px"
    data-mode="vim"
    data-acplugins="asdf,default"
    data-firewritein
    data-showdoclength
    data-cmid=""
  />
</div>
```

Available `acplugins`

{: .important }

> assing value `disabled` to `acplugins` will disabled all bulitin plugins. but can still enable selected plugins.
>
> like `acplugins="disabled,asdf,json".

```json
[
  "default",
  "json",
  "url",
  "html-entities",
  "codemirror",
  "unicode",
  "eval",
  "asdf",
  "string",
  "base64",
  "chatgpt",
  "password",
  "websocket",
  "download-attach"
]
```

If has attribute `data-firewritein`, it will fire event when user typing in the editor:

```typescript
if (this.firewritein) {
  const ce = new CustomEvent("cmwritein", {
    detail: { value: e.state.doc.toString(), cmid: this.cmid },
  });
  this._input.dispatchEvent(ce);
}
```

{: .important}

> fire `writeback` event on the wrapped hidden input element will copy the value of the input to editor.
>
> Say, if you change the input field programlly.

```html
<input
  x-on:demo-change.window="
      $el.value=$store.demos.currentItem.cssvalue;
   $dispatch('writeback', {value: $store.demos.currentItem.cssvalue})"
/>
```
