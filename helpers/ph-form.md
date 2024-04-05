---
title: ph-form
layout: default
nav_order: 7
has_children: false
parent: Helpers List
---

# ph-form attribute

Submit a form and add extra functions.

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
ph-error-css="is-invalid"
ph-error-css-for="email"
/>
</label>
<span
class="error-message"
ph-error-message="must be a valid email."
ph-error-message-for="email"
></span>
<br/>
<label>
password:
<input type="text" 
name="password"
ph-validate="string::min:6,max:32"
ph-error-css="is-invalid"
ph-error-css-for="password"
/>
</label>
<span
class="error-message"
ph-error-message="at least 6 characters"
ph-error-message-for="password"
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
      ph-error-css="is-invalid"
      ph-error-css-for="email"
    />
  </label>
  <span
    class="error-message"
    ph-error-message="must be a valid email."
    ph-error-message-for="email"
  ></span>
  <br />
  <label>
    password:
    <input
      type="text"
      name="password"
      ph-validate="string::min:6,max:32"
      ph-error-css="is-invalid"
      ph-error-css-for="password"
    />
  </label>
  <span
    class="error-message"
    ph-error-message="at least 6 characters"
    ph-error-message-for="password"
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

<div class="code-example" markdown="1">
<form class="ph"
ph-form="../../fixtures/ph-form"
ph-method="post"
  ph-confirm='{"title": "Do you want to save the changes?", "showCancelButton": true, "confirmButtonText": "Save"}'
>
<label>
email:
<input type="text" 
name="email"
ph-error-css="is-invalid"
ph-error-css-for="email"
/>
</label>
<span
class="error-message"
ph-error-message="must be a valid email."
ph-error-message-for="email"
></span>
<br/>
<label>
password:
<input type="text" 
name="password"
ph-error-css="is-invalid"
ph-error-css-for="password"
/>
</label>
<span class="error-message"
ph-error-message="at least 6 characters"
ph-error-message-for="password"
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
      ph-error-css="is-invalid"
      ph-error-css-for="email"
    />
  </label>
  <span
    class="error-message"
    ph-error-message="must be a valid email."
    ph-error-message-for="email"
  ></span>
  <br />
  <label>
    password:
    <input
      type="text"
      name="password"
      ph-error-css="is-invalid"
      ph-error-css-for="password"
    />
  </label>
  <span
    class="error-message"
    ph-error-message="at least 6 characters"
    ph-error-message-for="password"
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

## extra attributes for this helper:

| name                 | descriptio                                                              | link                                                                         |
| :------------------- | :---------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| ph-params            | append extra value to form submit                                       | <a href="{{site.baseurl}}/value-collector/" ph-pjax-link>value collector</a> |
| ph-validate          | validate the field. number::min:3,max:365                               | syntax follow [Yup](https://github.com/jquense/yup)                          |
| ph-error-message     | The error message to display                                            |                                                                              |
| ph-error-message-for | the field name                                                          |                                                                              |
| ph-error-css         | The css name to add when validate failed.                               |                                                                              |
| ph-error-css-for     | the field name                                                          |                                                                              |
| ph-config            | dataType::origin, dataType::json(default)                               |                                                                              |
| ph-confirm           | confirm before submit. If passin a Json value, it will be treat as Swal |                                                                              |
