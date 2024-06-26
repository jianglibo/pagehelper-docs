---
title: ph-form
layout: default
nav_order: 7
has_children: false
description: Enhance your front-end development with our ph-form attribute, designed for seamless event handling and form validation. Simply apply it to HTML elements to trigger AJAX requests upon events like click, while also providing built-in validation functions for smoother user interactions.
parent: Helpers List
---

# ph-form attribute

Submit a form and add extra functions.
<button
  type="button"
  ph-params="id::10"
  ph-pjax-link="../../playground/"
  class="btn btn-sm">
<span x-text="btnLabel">Live DEMO</span>
</button>


## client side validate

<div class="code-example" markdown="1">
<form class="ph"
ph-form="../../fixtures/ph-form"
ph-method="post"
ph-confirm
>
<label>
email:
<input type="text" 
name="email"
ph-validate="string::min:5,max:24"
ph-error-css-for-email="is-invalid"
/>
</label>
<span
class="error-message"
ph-error-css-for-email="is-invalid"
ph-error-message-for-email="must be a valid email."
></span>
<br/>
<label>
password:
<input type="text" 
name="password"
ph-validate="string::min:6,max:32"
ph-error-css-for-password="is-invalid"
/>
</label>
<span
class="error-message"
ph-error-css-for-password="is-invalid"
ph-error-message-for-password="at least 6 characters"
></span>
<br/>
<button type="submit" 
  name="button"
  class="btn">
  Submit
  </button>
</form>
</div>

```html
<form
  class="ph"
  ph-form="../../fixtures/ph-form"
  ph-method="post"
  ph-confirm
>
  <label>
    email:
    <input
      type="text"
      name="email"
      ph-validate="string::min:5,max:24"
      ph-error-css-for-email="is-invalid"
    />
  </label>
  <span
    class="error-message"
    ph-error-css-for-email="is-invalid"
    ph-error-message-for-email="must be a valid email."
  ></span>
  <br />
  <label>
    password:
    <input
      type="text"
      name="password"
      ph-validate="string::min:6,max:32"
      ph-error-css-for-password="is-invalid"
    />
  </label>
  <span
    class="error-message"
    ph-error-css-for-password="is-invalid"
    ph-error-message-for-password="at least 6 characters"
  ></span>
  <br />
  <button
    type="submit"
    name="button"
    class="btn"
  >
    Submit
  </button>
</form>
```

## Server side validate

Even if remove the `ph-validate` attribute, the server side could hanle the validation too, but need return the data in specific format.
<button
  type="button"
  ph-params="id::11"
  ph-pjax-link="../../playground/"
  class="btn btn-sm">
<span x-text="btnLabel">Live DEMO</span>
</button>


<code class="language-plaintext highlighter-rouge" ph-show-response-body>Show response body here</code>
<div class="code-example" markdown="1">
<form class="ph"
ph-form="../../fixtures/ph-form"
ph-method="post"
ph-json
ph-confirm='{"title": "Do you want to save the changes?", "showCancelButton": true, "confirmButtonText": "Save"}'
>
<label>
email:
<input type="text" 
name="email"
ph-error-css-for-email="is-invalid"
/>
</label>
<span
class="error-message"
ph-error-message-for-email="must be a valid email."
ph-error-css-for-email="is-invalid"
></span>
<br/>
<label>
password:
<input type="text" 
name="password"
ph-error-css-for-password="is-invalid"
/>
</label>
<span class="error-message"
ph-error-message-for-password="at least 6 characters"
ph-error-css-for-password="is-invalid"
></span>
<br/>
<button type="submit" 
  name="button"
  class="btn">
  Submit
  </button>
</form>
</div>

```html
<form
  class="ph"
  ph-form="../../fixtures/ph-form"
  ph-method="post"
  ph-confirm='{"title": "Do you want to save the changes?", "showCancelButton": true, "confirmButtonText": "Save"}'
>
  <label>
    email:
    <input
      type="text"
      name="email"
      ph-error-css-for-email="is-invalid"
    />
  </label>
  <span
    class="error-message"
    ph-error-message-for-email="must be a valid email."
  ></span>
  <br />
  <label>
    password:
    <input
      type="text"
      name="password"
      ph-error-css-for-password="is-invalid"
    />
  </label>
  <span
    class="error-message"
    ph-error-message-for-password="at least 6 characters"
  ></span>
  <br />
  <button
    type="submit"
    name="button"
    class="btn"
  >
    Submit
  </button>
</form>
```

the returned data. it locates the field by name.

```json
{
  "data": [
    {
      "action": "FAILED_VALIDATES",
      "params": {
        "failedValidates": [
          {
            "name": "content",
            "message": "size must be between 6 and 1048576"
          }
        ]
      }
    },
    {
      "action": "TOAST",
      "params": {
        "toast": {
          "icon": "warning",
          "title": "validate failed.",
          "timer": 3000
        }
      }
    }
  ]
}
```

{: .note }

> Change the data type by add `ph-data-type` attribute on the input field. like `number` make server side json parse easier.

## extra attributes for this helper:

| name                 | descriptio                                                                  | link                                                |
| :------------------- | :-------------------------------------------------------------------------- | --------------------------------------------------- |
| ph-params            | append extra value to form submit                                           | [value-collector](/value-collector/)                |
| ph-validate          | validate the field. number::min:3,max:365                                   | syntax follow [Yup](https://github.com/jquense/yup) |
| ph-error-message     | The error message to display                                                |                                                     |
| ph-error-message-for | the field name                                                              |                                                     |
| ph-error-css         | The css name to add when validate failed.                                   |                                                     |
| ph-error-css-for     | the field name                                                              |                                                     |
| ph-json              | submit all data as a json, If the method is GET, will apped to `body` query |                                                     |
| ph-confirm           | confirm before submit. If passin a Json value, it will be treat as Swal     |                                                     |
| ph-save-keybind      | ph-save-keybind="Ctrl+s", unchangable at the moment.                        |                                                     |
| ph-fire-event        | fire a custom event with the data just received.                            | format: `name:target`, `foo:window`                 |
