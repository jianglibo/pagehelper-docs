---
title: Play Ground
layout: default
tagline: "Unlock the Power: Experiment and Innovate with Alpine.js and PageHelper – Your Playground for Interactive Frontend Development!"
nav_order: 5
has_children: false
---

# Play Ground for Alpine and Pagehelper

<div x-data="{...demos(), loading: false, cmheight: '200px', showLoadAll: false}"
  x-on:cmcontainerchanged.window.debounce.500ms="console.log('target', $event);updateCmSizes($event.target.id, $event.detail.height)">
<table>
<tr>
<td>
<form class="ph">
<select
  x-model="$store.demos.currentItem.id"
  x-bind="initdemo"
  x-on:change="
    $store.demos.setCurrentItem($el.value);
    loading='Please select a Demo';
    $nextTick(() => $dispatch('demo-change', {}))"
  name="demo">
  <option value='' disabled x-text="loading ? 'Loading...' : 'Please select a Demo'">
  Please select a Demo
  </option>
  <template x-for="item in $store.demos.all">
    <option x-bind:value="item.id + ''" x-text="`${item.name}(${item.id})`">hello</option>
  </template>
</select>
</form>
</td>
<td>
<a x-bind="loadalldemos" href="#" x-show="showLoadAll" x-text="loading ? 'Loading...' : 'Load Others' ">Load Others</a>
</td>
</tr>
</table>

<div x-data="{
  activetab: $persist('html'), 
  styles: {color: ''}
  }">
<div>
<button
  type="button"
  x-bind:disabled="activetab === 'html'"
  x-on:click="activetab = 'html'"
  class="btn btn-sm" >
HTML
</button>
<button
  type="button"
  x-bind:disabled="activetab === 'css'"
  x-on:click="activetab = 'css'"
  class="btn btn-sm" >
CSS
</button>
<button
  type="button"
  x-bind:disabled="activetab === 'json'"
  x-on:click="activetab = 'json'"
  class="btn btn-sm" >
<span x-bind:style="styles">JSON</span>
</button>
<button
  type="button"
  x-bind:disabled="activetab === 'js'"
  x-on:click="activetab = 'js'"
  class="btn btn-sm" >
JS
</button>
<select x-bind:disabled="activetab !== 'js'" x-model="runjsAt">
<option value="both">both</option>
<option value="before">before</option>
<option value="after">after</option>
</select>
</div>
<div class="cm-editor-wrap"
 id="html-cm-wrap"
 x-show="activetab === 'html'">
  <input
    type="hidden"
    name="html"
    id="playground-html"
    x-on:demo-change.window="
      $el.value=$store.demos.currentItem.html;
      $dispatch('writeback', {value: $store.demos.currentItem.html})"
    x-on:cmwritein.debounce.2000ms="
      if($event.detail.cmid === 'playground-html')
      { 
        $store.demos.currentItem.html = $event.detail.value;
        $dispatch('html-change', {});
      }"
    data-final-try="/devtools/finaltry"
    data-finalc="https://lets-script.com/devtools/ph-playground-completion"
    data-lang="html"
    x-bind:data-height="cmheight"
    x-bind:data-max-height="cmSizes['html-cm-wrap']"
    data-firewritein
    data-resizable
    data-mode="normal"
  />
</div>
<div class="cm-editor-wrap"
  id="js-cm-wrap"
 x-show="activetab === 'js'">
  <input
    type="hidden"
    name="js"
    id="playground-js"
    x-on:demo-change.window="
      $el.value=$store.demos.currentItem.jsvalue;
      $dispatch('writeback', {value: $store.demos.currentItem.jsvalue})"
    x-on:cmwritein.debounce.1000ms="if($event.detail.cmid === 'playground-js'){ 
      $store.demos.currentItem.jsvalue = $event.detail.value;
      $dispatch('js-change', {});
      }"
    data-lang="javascript"
    x-bind:data-height="cmheight"
    x-bind:data-max-height="cmSizes['js-cm-wrap']"
    data-firewritein
    data-resizable
    data-mode="normal"
  />
</div>
<div class="cm-editor-wrap"
 id="css-cm-wrap"
 x-show="activetab === 'css'">
  <input
    type="hidden"
    name="css"
    id="playground-css"
    x-on:demo-change.window="
      $el.value=$store.demos.currentItem.cssvalue;
      $dispatch('writeback', {value: $store.demos.currentItem.cssvalue})"
    x-on:cmwritein.debounce.1000ms="
      if($event.detail.cmid === 'playground-css')
      { 
        $store.demos.currentItem.cssvalue = $event.detail.value;
        $dispatch('css-change', {});
      }"
    data-lang="css"
    x-bind:data-height="cmheight"
    x-bind:data-max-height="cmSizes['css-cm-wrap']"
    data-resizable
    data-firewritein
    data-mode="normal"
  />
</div>
<div class="cm-editor-wrap"
 id="json-cm-wrap"
 x-show="activetab === 'json'">
  <input
    type="hidden"
    name="json"
    id="playground-json"
    x-on:demo-change.window="
      $el.value=$store.demos.currentItem.jsonvalue;
      $dispatch('writeback', {value: $store.demos.currentItem.jsonvalue})"
    x-on:cmwritein.debounce.1000ms="
    if($event.detail.cmid === 'playground-json'){ 
      $store.demos.currentItem.jsonvalue = $event.detail.value;
      try { 
        JSON.parse($event.detail.value || '{}');
        styles.color='';
        $dispatch('json-change', {});
      } catch (error) {
        styles.color='red'};
      };"
    data-lang="json"
    x-bind:data-height="cmheight"
    x-bind:data-max-height="cmSizes['json-cm-wrap']"
    data-firewritein
    data-resizable
    data-mode="normal"
  />
</div>

</div>

<div style="margin-top: 18px;border: thick double #32a1ce;padding:5px;"
 class="ph" id="playground-result" x-bind="setResultInnerHTML">
</div>

<div class="ph" x-data="{btnLabel: 'Share Link', demoname: ''}" style="margin-top: 15px;">
<input type="text" name="demoname" placeholder="Give it a name" x-model="demoname"/>
<button
  type="button"
  class="btn btn-sm"
  x-on:click="
    $store.demos.copyCurrentLink(demoname);
    btnLabel='Copied';
    setTimeout(() => {btnLabel = 'Share Link'}, 2000)">
<span x-text="btnLabel">Share Link</span>
</button>
</div>

<div style="margin-top: 20px;">
<span>Logs</span>
<div id="console">
<pre>
<code x-effect="$store.demos.currentItem.html;$el.innerHTML='';"></code>
</pre>
</div>
</div>

<div style="margin-top: 20px;" x-data="{dumpValue: '', show: false}">
<a href="#" x-on:click.prevent="dumpValue = dumpStore(); show = ! show">dump demo store</a>
<pre>
<code x-text="dumpValue" x-show="show">
</code>
</pre>
</div>
</div>

## Share your Code

Go to [lets-script.com](https://lets-script.com), write your code snippets and share it by the url like:

`https://pagehelper.lets-script.com/playground/?id=xx&uid=xx`

## Docs

**echo any data to mock server response**

Add `ph-params="echo:::#playground-json/value"` to the `ph-ajax="https://pagehelper.lets-script.com/ph-misc/echo"` link will bring the json value to the server and echo back for testing.

- when `echo` query parameter exists,always echo this value
- if is post method, echo the body

**This page already add a `demos` Alpine store**

```html
<div
  x-data
  x-init="$store.demos.a=1"
>
  <span x-text="$store.demos.a"></span>
</div>
```
