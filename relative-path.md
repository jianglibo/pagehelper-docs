---
title: Relative path explained
layout: default
nav_order: 10
has_children: false
---

# Relative path

To make relative path caculate unambiguously, follow strictly two rules.

1. think the current path as a directory, no matter it ends with slash or not.
2. the provided path ends with a slash the final path will end with a slash, vise versa.

## Explain

**Think `/one/two/` and `/one/two` as the same. Both are `/one/two/`.**

{: .note }
> `..` will be `/one`
>
> `../` will be `/one/`
>
> `.` will be `/one/two`
>
> `./` will be `/one/two/`




## Example

if current path is `/abc/`.

```html
<a
  href="#"
  ph-link="."
  >will be: /abc</a
>
```

```html
<a
  href="#"
  ph-link="../xyz"
  >will be: /xyz</a
>
```

```html
<a
  href="#"
  ph-link="../xyz/"
  >will be: /xyz/</a
>
```

```typescript
it("should remove the last slash", () => {
  tutil.setpathname("/abc/"); // treat it as a directory
  const dataUrl = ".";
  const url = urlUtil.calUrl(dataUrl);
  expect(url).toBe("/abc");
});

it("should add the last slash", () => {
  tutil.setpathname("/abc"); // treat it as a directory
  const dataUrl = "./";
  const url = urlUtil.calUrl(dataUrl);
  expect(url).toBe("/abc/");
});
```
