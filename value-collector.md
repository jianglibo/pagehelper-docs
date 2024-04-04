---
title: Collect values
layout: default
nav_order: 5
has_children: false
# nav_exclude: true
---

# Collect values and send them to backend.

Look at the code bellow:

```html
<button
  type="button"
  ph-mask="6"
  class="btn btn-sm"
  ph-params="ids:::__selected_ids__/usercmd,cat::abc,parentid:/1/,othervalue:qa"
  ph-method="delete"
  ph-confirm
  ph-ajax="."
>
  Delete
</button>
```

## ::: extract special value or by css selector

```javascript
it("should extract by selector", () => {
  const selectedIdHolder = new SelectedIdHolder({});
  selectedIdHolder.alter("user", "1", true);
  selectedIdHolder.alter("user", "2", true);

  expect(selectedIdHolder.idsByName("user")).toStrictEqual(["1", "2"]);

  // create an html element with tag and attributes
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

  const kvs = htmlUtil.getParams(div, selectedIdHolder);

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
> `id:/1/` will get the first part of the pathname.


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
