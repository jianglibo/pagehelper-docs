---
title: Play Ground
layout: default
tagline: 'Unlock the Power: Experiment and Innovate with Alpine.js and PageHelper – Your Playground for Interactive Frontend Development!'
nav_order: 5
has_children: false
---

# Play Ground for Alpine and Pagehelper

<div x-data="{...demos(), loading: false, showLoadAll: false}">
<form class="ph">
<select  style="width:100%;" 
  x-model="$store.demos.currentItem.id"
  x-bind="initdemo"
  x-on:change="$store.demos.setCurrentItem($el.value);loading='Please select a Demo';$nextTick(() => $dispatch('demo-change', {}))"
  name="demo">
  <option value='' disabled x-text="loading ? 'Loading...' : 'Please select a Demo'">Please select a Demo</option>
  <template x-for="item in $store.demos.all">
    <option x-bind:value="item.id + ''" x-text="`${item.name}(${item.id})`">hello</option>
  </template>
</select>
<a x-bind="loadalldemos" href="#" x-show="showLoadAll" x-text="loading ? 'Loading...' : 'Load Others' ">Load Others</a>
</form>

<div>
<span>HTML content:</span>
<div class="cm-editor-wrap">
  <input
    type="hidden"
    name="html"
    id="playground-html"
    x-on:demo-change.window="$el.value=$store.demos.currentItem.html;$dispatch('writeback', {value: $store.demos.currentItem.html})"
    x-on:cmwritein.debounce.2000ms="if($event.detail.cmid === 'playground-html'){ $store.demos.currentItem.html = $event.detail.value }  "
    data-final-try="/devtools/finaltry"
    data-finalc="https://lets-script.com/devtools/ph-playground-completion"
    data-lang="html"
    data-height="150px"
    data-max-height="250px"
    data-firewritein
    data-mode="normal"
  />
</div>
</div>

<div style="margin-top: 18px;border: thick double #32a1ce;padding:5px;"
 x-on:demo-change.window="$el.innerHTML=$store.demos.currentItem.html;"
 x-on:json-change.window="$el.innerHTML=$store.demos.currentItem.html;"
 class="ph" id="playground-result" x-html="$store.demos.currentItem.html">
</div>

<div style="margin-top: 10px;" x-data="{styles: {color: ''}}">
<span x-bind:style="styles">Response json for ajax test:</span>
<div class="cm-editor-wrap">
  <input
    type="hidden"
    name="json"
    id="playground-json"
    x-on:demo-change.window="$el.value=$store.demos.currentItem.jsonvalue;$dispatch('writeback', {value: $store.demos.currentItem.jsonvalue})"
    x-on:cmwritein.debounce.1000ms="if($event.detail.cmid === 'playground-json'){ $store.demos.currentItem.jsonvalue = $event.detail.value };
          try { JSON.parse($event.detail.value);styles.color='';$dispatch('json-change', {})} catch (error) {styles.color='red'} "
    data-lang="json"
    data-height="150px"
    data-firewritein
    data-mode="normal"
  />
</div>
</div>

<div class="ph" x-data="{btnLabel: 'Share Link', demoname: ''}" style="margin-top: 15px;">
<input type="text" name="demoname" placeholder="Give it a name" x-model="demoname"/>
<button
  type="button"
  class="btn btn-sm"
  x-on:click="$store.demos.copyCurrentLink(demoname);btnLabel='Copied';setTimeout(() => {btnLabel = 'Share Link'}, 2000)">
<span x-text="btnLabel">Share Link</span>
</button>
</div>
</div>

## Docs

**echo json to mock server response**

Add `ph-params="echo:::#playground-json/value"` to the `ph-ajax="https://pagehelper.lets-script.com/ph-misc/echo"` link will bring the json value to the server and echo back for testing.

**This page already add a `demos` Alpine store**
```html
<div x-data x-init="$store.demos.a=1">
  <span x-text="$store.demos.a"></span>
</div>
```