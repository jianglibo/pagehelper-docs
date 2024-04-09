---
title: Swal consumer
layout: default
nav_order: 30
has_children: false
parent: Data Consumers
---

# Show Swal Widget

This is a global consumer that means it's triggered by the response message, if this consumer find the pattern in the message and think it as a show Swal instruction it will show it.

It's easy to write your own and register it.

<div class="code-example" markdown="1">
<button
  type="button"
  name="button"
  class="btn"
  ph-params="position::top-end,toast::true"
  ph-ajax="/fixtures/toast">
  Toast
</button>


<button
  type="button"
  name="button"
  class="btn"
  ph-ajax="/fixtures/toast">
  Alert
</button>
</div>
```html
<button
  type="button"
  name="button"
  class="btn"
  ph-params="position::top-end,toast::true"
  ph-ajax="/fixtures/toast">
  Toast
</button>


<button
  type="button"
  name="button"
  class="btn"
  ph-ajax="/fixtures/toast">
  Alert
</button>
```
```json
{
  "data": [
    {
      "action": "TOAST",
      "params": {
        "toast": {
          "position": "top-end",
          "icon": "warning",
          "title": "validate failed.",
          "timer": 3000
        }
      }
    }
  ]
}
```
