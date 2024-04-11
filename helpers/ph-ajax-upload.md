---
title: ph-ajax-upload
layout: default
nav_order: 60
has_children: false
parent: Helpers List
---

# ph-ajax-upload attribute

<div class="code-example" markdown="1">
<span id="blob-result" ph-data-consumer="innerhtml"></span>
<form
  method="put"
  ph-blob
  ph-target="#blob-result"
  ph-ajax-upload="https://pagehelper.lets-script.com/upload/r2-blob"
  action=""
  novalidate
>
  <input type="file" name="file" ph-disable-on-working/>
  <div
    ph-error-css="is-invalid"
    ph-error-message="please select a file."
  ></div>
  <button type="submit" class="btn"
  ph-disable-on-working
  >Upload</button>
</form>
</div>
```html
<span id="blob-result" ph-data-consumer="innerhtml"></span>
<form
  method="put"
  ph-blob
  ph-target="#blob-result"
  ph-ajax-upload="https://pagehelper.lets-script.com/upload/r2-blob"
  action=""
  novalidate
>
  <input type="file" name="file" ph-disable-on-working/>
  <div
    ph-error-css="is-invalid"
    ph-error-message="please select a file."
  ></div>
  <button type="submit" ph-disable-on-working class="btn">Upload</button>
</form>
```

## auto upload after select

<div class="code-example" markdown="1">
<span id="blob-result-auto" ph-data-consumer="innerhtml"></span>
<form
  method="put"
  ph-blob
  ph-auto-start
  ph-target="#blob-result-auto"
  ph-ajax-upload="https://pagehelper.lets-script.com/upload/r2-blob"
  action=""
  novalidate
>
  <input type="file" name="file" />
  <div
    ph-error-css="is-invalid"
    ph-error-message="please select a file."
  ></div>
</form>
</div>
```html
<span id="blob-result-auto" ph-data-consumer="innerhtml"></span>
<form
  method="put"
  ph-blob
  ph-auto-start
  ph-target="#blob-result-auto"
  ph-ajax-upload="https://pagehelper.lets-script.com/upload/r2-blob"
  action=""
  novalidate
>
  <input type="file" name="file" />
  <div
    ph-error-css="is-invalid"
    ph-error-message="please select a file."
  ></div>
</form>
```
