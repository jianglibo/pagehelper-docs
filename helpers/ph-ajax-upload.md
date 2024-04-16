---
title: ph-ajax-upload
layout: default
nav_order: 60
has_children: false
parent: Helpers List
---

# ph-ajax-upload attribute

{: .important }

> This widget can be used directly on your website, uploaded file will go to Cloudflare R2.

<button
  type="button"
  ph-params="id::3"
  ph-pjax-link="../../playground/"
  class="btn btn-sm">
<span x-text="btnLabel">Live DEMO</span>
</button>


<div class="code-example" markdown="1">
<div
      id="blob-result" 
      ph-highlight="https://pagehelper.lets-script.com/highlight/"
      ph-params="lang::json,inline::true"
      ph-data-consumer="innerhtml">
      <pre>
    upload result will be here.
</pre>
</div>

<ul ph-data-consumer="innerhtml-mustache" id="blob-result-live">
{% raw %}
<template>
{{#.}}
<a href="{{url}}" target="_blank">{{originFileName}}</a>
{{/.}}
</template>
{% endraw %}
</ul>
<form
  method="put"
  ph-target="#blob-result,#blob-result-live"
  ph-ajax-upload="https://pagehelper.lets-script.com/upload/r2-blob"
  ph-callback-remote="get:/save-urls"
  action=""
  novalidate
>
  <input type="file" name="file" multiple ph-disable-on-working/>
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
<div
      id="blob-result" 
      ph-highlight="https://pagehelper.lets-script.com/highlight/"
      ph-params="lang::json,inline::true"
      ph-data-consumer="innerhtml">
      <pre>
    upload result will be here.
</pre>
</div>
<ul ph-data-consumer="innerhtml-mustache" id="blob-result-live">
{% raw %}
<template>
{{#.}}
<a href="{{url}}" target="_blank">{{originFileName}}</a>
{{/.}}
</template>
{% endraw %}
</ul>
<form
  method="put"
  ph-target="#blob-result,#blob-result-live"
  ph-ajax-upload="https://pagehelper.lets-script.com/upload/r2-blob"
  action=""
  novalidate
>
  <input type="file" name="file" multiple ph-disable-on-working/>
  <div
    ph-error-css="is-invalid"
    ph-error-message="please select a file."
  ></div>
  <button type="submit" ph-disable-on-working class="btn">Upload</button>
</form>
```

## auto upload after select

<div class="code-example" markdown="1">
<span id="blob-result-auto" ph-data-consumer="innerhtml">upload result will be here.</span>
<ul ph-data-consumer="innerhtml-mustache" id="blob-result-auto-live">
{% raw %}
<template>
{{#.}}
<a href="{{url}}" target="_blank">{{originFileName}}</a>
{{/.}}
</template>
{% endraw %}
</ul>
<form
  method="put"
  ph-auto-start
  ph-target="#blob-result-auto,#blob-result-auto-live"
  ph-ajax-upload="https://pagehelper.lets-script.com/upload/r2-blob"
  ph-callback-remote="get:/save-me"
  action=""
  novalidate
>
  <input type="file" name="file" multiple ph-disable-on-working />
  <div
    ph-error-css="is-invalid"
    ph-error-message="please select a file."
  ></div>
</form>
</div>
```html
<span id="blob-result-auto" ph-data-consumer="innerhtml"></span>
<ul ph-data-consumer="innerhtml-mustache" id="blob-result-auto-live">
{% raw %}
<template>
{{#.}}
<a href="{{url}}" target="_blank">{{originFileName}}</a>
{{/.}}
</template>
{% endraw %}
</ul>
<form
  method="put"
  ph-auto-start
  ph-target="#blob-result-auto,#blob-result-auto-live"
  ph-ajax-upload="https://pagehelper.lets-script.com/upload/r2-blob"
  action=""
  novalidate
>
  <input type="file" name="file" multiple />
  <div
    ph-error-css="is-invalid"
    ph-error-message="please select a file."
  ></div>
</form>
```

## extra attributes for this helper:

| name               | descriptio                                             | link                                   |
| :----------------- | :----------------------------------------------------- | -------------------------------------- |
| ph-not-blob        | default submit File as the body to server.             | [fileupload](/blog/fileupload/)        |
| ph-api-key         | add an apikey so that you will own the uploaded files. | [Get Apikey](/blog/get-upload-apikey/) |
| ph-callback-remote | callback the url with the data just received.          | format: `method:url`, `post:/mycb`     |
