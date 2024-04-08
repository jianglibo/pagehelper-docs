---
title: Runner
layout: default
nav_order: 7
has_children: false
parent: Lets-script
---

## Files Running on server

After create the runner the files listed bellow will attach to the runner.

![Runner Image](/assets/imgs/runner.png)

Before executing the command the runner will prepare all the files in one temporary directory and then run the command.

## arguments to the runner.sh

| name        | description                                             | link |
| :---------- | :------------------------------------------------------ | ---- |
| getlistenip | Ask listening ip of the host from inside the container. |      |
| execcmd     | execute normal command.                                 |      |
| manage      | for customize manage interface.                         |      |

## Envs

| name               | description                                                                        | link |
| :----------------- | :--------------------------------------------------------------------------------- | ---- |
| SCRIPT_ENVS        | all the settings in your Runner and Usercmd and payloads                           |
| SCRIPT_ENVS_CLEAR  | like RUNNER_AND_CMD but hide some fields.                                          |
| IMAGE_NAME         | Lxd image name Or Docker image name or Other meaning.                              |
| INSTANCE_ID        | Lxd container or docker container or Other meaning.                                |
| CMD_VARS           | line like `lets-script.cmdvars.name: varvalue` in the source file, will put there. |
| HOST_IP            | for script to communicate with the agent service                                   |
| HOST_LISTEN_PORT   | for script to communicate with the agent service                                   |
| HOST_LISTEN_SCHEMA | for script to communicate with the agent service                                   |
