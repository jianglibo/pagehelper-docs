---
title: Special Groups
layout: default
nav_order: 13
has_children: false
parent: Lets-script
---

## Creating groups has special meaning in the system.

It's an admin action, go to the SettingsInDb page, add value as a JSON array.

![Create Special Group Image](/assets/imgs/special-groups.png)

Now only the users in the group 2 are allowed to add `dind` tag for UserCmd object.

## Predefined tag names.

| name | description                                                              | link |
| :--- | :----------------------------------------------------------------------- | ---- |
| dind | If a command has a tag `dind` it will run with 'docker run --privileged` |      |
