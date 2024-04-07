---
title: How Manage Page Works
layout: default
nav_order: 36
has_children: false
parent: Lets-script
---

# Manger page interact with shell command

When you click an action on manage page, the backend react to this action and return a result actions.

## The UI is a table

<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Cat</th>
            <th>Action</th>
            <th>Actions</th>
            <th>Data</th>
        </tr>
    </thead>
    <tbody ph-group-id="table1" ph-ajax="../../fixtures/manage" ph-params="selector::this" ph-auto-start ph-once>
		{% raw %}
		<template>
		{{#items}}
		<tr>
            <td>{{id}}</td>
            <td>{{name}}</td>
            <td>{{cat}}</td>
            <td>{{action}}</td>
            <td>
				{{#actions}}
					{{.}},
				{{/actions}}
			</td>
            <td>
			<ul>
				{{stringifyData}}
            </ul>
			</td>
        </tr>
		{{/items}}
		</template>
		{% endraw %}
        <tr>
            <td>docker-ps</td>
            <td>docker ps</td>
            <td>docker</td>
            <td>ps</td>
            <td>ps,stop,start,rm</td>
            <td>{"name":"ak"}</td>
        </tr>
        <tr>
            <td>docker-imgs</td>
            <td>docker images</td>
            <td>image</td>
            <td>delete</td>
            <td>delete, </td>
            <td>{"name":"cc"}</td>
        </tr>
    </tbody>
</table>

## The data format is fixed

When user clicked an action on the table, the data bellow will send to the runner server.

```json
{
  "runner": {
    "settingsstr": "string value",
    "settings": {}
  },
  "items": [
    {
      "id": "str",
      "name": "name",
      "cat": "category",
      "action": "current action",
      "actions": ["start", "stop", "rm"],
      "data": {
        "any": "kvs"
      }
    }
  ]
}
```

The shell script will receive envs:

| name          | descriptio                                                                  | link |
| :------------ | :-------------------------------------------------------------------------- | ---- |
| INSTRUCTOR    | the data struct shown above.                                                |      |
| SCRIPTS_DIR   | the script directory so that you can call the other script beside runner.sh |      |
| ALL_ENV_NAMES | print out all env names.                                                    |      |
