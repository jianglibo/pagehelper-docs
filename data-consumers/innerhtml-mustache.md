---
title: InnerHTML Mustache
layout: default
nav_order: 15
has_children: false
parent: Data Consumers
---

# innerhtml-mustache

Put a mustache template as a child in the HTML element.

```html
{% raw %}
<ul ph-data-consumer="innerhtml-mustach:any-custom-value">
  id="data-consumer"
  <template>
    {{#data}}
    <li>{{name}}({{id}})</li>
    {{/data}}
  </template>
</ul>
{% endraw %}
```

```html
<tbody
  ph-group-id="table1"
  ph-data-consumer="innerhtml-mustach:any-custom-value"
>
  {% raw %}
  <template>
    {{#data}}
    <tr>
      <td>
        <input
          type="checkbox"
          ph-row-selector="todo"
          id="_row_{{id}}"
        />
      </td>
      <td>{{id}}</td>
      <td>{{task}}</td>
      <td>{{dueDate}}</td>
      <td>{{priority}}</td>
    </tr>
    {{/data}}
  </template>
  {% endraw %}
</tbody>
```
