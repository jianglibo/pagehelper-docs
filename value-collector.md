---
title: Collect values
layout: default
nav_order: 5
has_children: false
# nav_exclude: true
---

# Collect values and send them to backend.

{: .important }

> This rule apply to mutiple attributes, include `ph-params`, `ph-headers` etc.

<div x-data="{tourl: '', 
params: 'ids:::__selected_ids__/fruit,cat::abc,frompath:/0/,fromqs:qa',
somethingChanged: 1
}"
x-on:selector-changed.window="somethingChanged++"
>
<label>Type path and query for test:
<input type="text"
 x-model="tourl"
 x-on:input="history.pushState(null, '', tourl);somethingChanged++;"
 name="to-url" style="width: 100%;"/>
</label>

<p>Selected ids fixtures(fruit):</p>

<form>
<label>101
    <input type="checkbox" ph-row-selector="fruit" id="_row_101"/>
    </label>
<label>102
    <input type="checkbox" ph-row-selector="fruit" id="_row_102"/>
    </label>
<label>103
    <input type="checkbox" ph-row-selector="fruit" id="_row_103"/>
    </label>
</form>
<div>
  <p style="font-weight: bold;"
   x-effect="somethingChanged &&
  $nextTick(() => ($el.innerHTML=ph.fullUrl($refs.pathinput, window.location.pathname)))"
  x-init="$nextTick(() => $el.innerHTML=ph.fullUrl($refs.pathinput, window.location.pathname))"></p>
  <input type="text"
   x-bind:ph-params="params" 
   x-model="params"
   x-ref="pathinput"
   name="abc"
   spellcheck="false"
   x-on:input.debounce.750ms="somethingChanged++"
   value="" 
   style="width:100%;" />
</div>
</div>

## ::: extract special value or by css selector

```javascript
it("should extract by selector", () => {
  // create an html element with tag and attributes
  tutil.setpathname("/hello");
  SelectedIdsStore.getInstance().saveNewSelectedIds("user", ["1", "2"]);
  const input = document.createElement("input");
  input.value = "55";
  input.name = "age";

  const div = document.createElement("div");
  div.id = "myid";
  div.textContent = "hello innerhtml";
  div.setAttribute("ph-id", "my-ph-id");
  div.setAttribute(
    "ph-params",
    "selectedIds:::__selected_ids__/user,id:::this/id,dataid:::this/attribute/ph-id,html:::this/innerHTML,age:::input[name=age]/value"
  );
  document.body.appendChild(div);
  document.body.appendChild(input);

  const kvs = htmlUtil.getParams(div);

  expect(kvs).toStrictEqual({
    id: "myid",
    dataid: "my-ph-id",
    html: "hello innerhtml",
    age: "55",
    selectedIds: "1,2",
  });
});
```

{: .note }

> Special cases:
>
> `__selected_ids__/user` will get current selected ids. see: [ph-row-selector](/helpers/ph-row-selector/)
>
> `this/attribute/href` will get the attribute value.
>
> `&ph-abc` If starts with a `&`, it will get the attribute on the same element, Usually it's because the value is too large or too complex to mixed up with other parameters.

```html
<a
  href="http://localhost:8787/upload/"
  ph-ajax
  ph-json
  ph-method="post"
  ph-params-in-url="action::mpu-complete,uploadId::6fEP9oVB1AMIbT2Q9cdRLS2-WTe0-vsd7Ew1uMULrh1VVwR1BDxedoHKtxH-ijFtUknWUH9z1h01IE7gw1IqiVMzQ4JtDbRfn0f-b_fuVHTmLbQ_XySDLYv5U5P01Bw1i-v03StYlUOvUtqlJX8ZJSMpOXAcH-WObrh8WWV6Uas"
  ph-params="parts:::&ph-param-parts"
  ph-params-type-map="parts:json"
  ph-param-parts='[{"partNumber":1,"etag":"71BxsQTUX2hbt3FfOd5Nd7ga8t3dbh22zQ0_N2v63R1d1cgUC4cFja2MWBpV79AE_HqxIhn4ThnY69shI4RMtufkZpLPtE7hSxxqkylgcil6_f5zhGDqqmnlriemygKD2mRmPhsOvJd-AOHvQJGpPVHiVrQILwgdSkTJM1Ux11Q"}]'
>
  Complete</a
>
```

## :: add constant value

```html
<a
  href="../pjax-link-1.html"
  ph-pjax-link
  ph-params="a::1,b::2,c::hello"
  id="to-pjax-link-1"
>
  To pjax-link-1</a
>
```

## : extract values from url

```javascript
it("should parse from query", () => {
  tutil.setpathname("/hello/55/x");
  tutil.setquery("id=123&dataid=456&html=hello%20world");
  let div = document.createElement("div");
  // zero based path parts
  div.setAttribute("ph-params", "id:/1/,html,dataid1:dataid");
  document.body.appendChild(div);
  let kvs = htmlUtil.getParams(div);
  expect(kvs).toEqual({ id: "55", html: "hello world", dataid1: "456" });

  div = document.createElement("div");
  // there's no 10th part.
  div.setAttribute("ph-params", "id:/10/");
  document.body.appendChild(div);
  kvs = htmlUtil.getParams(div);
  expect(kvs).toStrictEqual({});

  div = document.createElement("div");
  div.setAttribute("ph-params", "id:/-1/");
  document.body.appendChild(div);
  kvs = htmlUtil.getParams(div);
  expect(kvs).toStrictEqual({});

  div = document.createElement("div");
  div.setAttribute("ph-params", "id:/abc/");
  document.body.appendChild(div);
  kvs = htmlUtil.getParams(div);
  expect(kvs).toStrictEqual({});

  div = document.createElement("div");
  div.setAttribute("ph-params", "id://");
  document.body.appendChild(div);
  kvs = htmlUtil.getParams(div);
  expect(kvs).toStrictEqual({});
});
```

{: .note }

> Special cases:
>
> `id:idInUrl` will get the idInUrl and as id to new url parameter.
>
> `id:/0/` will get the first part of the pathname.

## get all query

```javascript
it("should extract by selector, keep current query.", () => {
  // create an html element with tag and attributes
  tutil.setquery("id=123&dataid=456&html=hello%20world");
  let div = document.createElement("div");
  div.setAttribute("ph-params", "*:*");
  document.body.appendChild(div);
  let kvs = htmlUtil.getParams(div);

  expect(kvs).toStrictEqual({ id: "123", dataid: "456", html: "hello world" });

  div = document.createElement("div");
  div.setAttribute("ph-params", "*:*,id::321");
  document.body.appendChild(div);
  kvs = htmlUtil.getParams(div);

  expect(kvs).toStrictEqual({ id: "321", dataid: "456", html: "hello world" });

  div = document.createElement("div");
  div.setAttribute("ph-params", "all:*json");
  document.body.appendChild(div);
  kvs = htmlUtil.getParams(div);

  expect(kvs).toStrictEqual({
    all: JSON.stringify({ id: "123", dataid: "456", html: "hello world" }),
  });

  div = document.createElement("div");
  div.setAttribute("ph-params", "all:*");
  document.body.appendChild(div);
  kvs = htmlUtil.getParams(div);

  expect(kvs).toStrictEqual({ all: "id=123&dataid=456&html=hello+world" });
});
```

{: .note }

> Special cases:
>
> `*:*,page::3` will include all the current query string in the url, the page will override if exists.
>
> `all:*json` will add queries to all as a json string.
>
> `all:*` will add query string to all.
