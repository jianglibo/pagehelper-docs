---
title: How to resize codemirror6
layout: default
nav_order: 40
has_children: false
parent: Blogs for pagehelper
---

# Resize the Codemirror6

It's actually little to do with Codemirror itself but the div wrap it.

<button
  type="button"
  ph-params="id::9"
  ph-pjax-link="../../playground/"
  class="btn btn-sm">
<span x-text="btnLabel">Live DEMO</span>
</button>


Here is a codemirror html snippet

```html
<div class="a-demo-cm6 cm-editor-wrap">
  <input type="hidden"/>
</div>
```
After codemirror initialized the final html structure will be:
```html
<div class="a-demo-cm6 cm-editor-wrap">
  <input type="hidden"/>
  <div class="cm-editor">
    <div class="cm-scroller">
      <div class="cm-gutters"></div>
      <div class="cm-content"></div>
    </div>
  </div>
</div>
```

## No extra css
Now after render it will be show one line.

![oneline](/assets/imgs/cm6-oneline.png)

## Give `cm-editor` a `min-height`
Give `cm-editor` a `min-height`, It will be like bellow. But still only one line in the editor.
```css
.a-demo-cm6 .cm-editor {
  min-height: 150px;
}
```

![editor-min-height](/assets/imgs/cm6-editor-min-height.png)

## Give `cm-gutters` and `cm-content` a `min-height`

It's better to apply the `min-height` at `cm-gutters` and `cm-content`. It looks better because the gutters is same height as editor.

```css
.a-demo-cm6 .cm-gutter, .a-demo-cm6 .cm-contnet {
   min-height: 100px;
}
```
![gutters-min-height](/assets/imgs/cm6-gutters-min-height.png)

## Let wrap resizable
```css
.a-demo-cm6  {
  resize: vertical;
  overflow: auto;
}
```
![cm6-editor-no-height](/assets/imgs/cm6-editor-no-height.png)

**but when the wrap resize, the editor didn't resize.**

Appy css to editor

```css
.a-demo-cm6 .cm-editor {
  height: 100%;
}
```
## Now the editor will auto grow as line increasing

To disable this behaiver, add css
```css
.a-demo-cm6 .cm-editor {
  height: 100%;
  max-height: 400px;
}
```

## The Final CSS

```css
.a-demo-cm6  {
  resize: vertical;
  overflow: auto;
}
.a-demo-cm6 .cm-editor {
  height: 100%;
  max-height: 400px;
}
.a-demo-cm6 .cm-gutter, .a-demo-cm6 .cm-contnet {
  min-height: 100px;
}
```

**remove max-height from .cm-editor** to disable auto grow.
