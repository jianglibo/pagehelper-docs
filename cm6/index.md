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
    data-firewritein
    data-showdoclength
    data-cmid=""
  />
</div>
```

If has attribute `data-firewritein`, it will fire:

```typescript
if (this.firewritein) {
  const ce = new CustomEvent("cmwritein", {
    detail: { value: e.state.doc.toString(), cmid: this.cmid },
  });
  this._input.dispatchEvent(ce);
}
```