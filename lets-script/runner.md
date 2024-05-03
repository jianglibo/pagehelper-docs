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

## Pattern to access the variables

Using `jq` to access the variables.

```bash
github_pat=$(echo $SCRIPT_ENVS_CLEAR | jq -r '.usercmd.settings.github_pat')
```

Example `$SCRIPT_ENVS_CLEAR`

```json
{
  "runner": {
    "settingsstr": "{\"basedir\":\"/opt/letsscript\",\"appuser\":\"letsscript\",\"has_nginx\":\"true\",\"networkname\":\"lxdbr1\",\"ssh\":\"******\",\"azblobsas\":\"******\",\"hides\":[\"ssh\",\"cloudflare\",\"azblobsas\"],\"cloudflare\":\"******\"}",
    "settings": {
      "basedir": "/opt/letsscript",
      "appuser": "letsscript",
      "has_nginx": "true",
      "networkname": "lxdbr1",
      "ssh": "******",
      "azblobsas": "******",
      "hides": [
        "ssh",
        "cloudflare",
        "azblobsas"
      ],
      "cloudflare": "******"
    },
    "runnertype": null,
    "hostname": "worker-1.lets-script.com",
    "schema": "http:https",
    "port": "8080:443",
    "files": [
      "runner.sh",
      "deploy.sh",
      "entrypoint.sh",
      "start.pl"
    ],
    "skipuploadjar": true,
    "debug": true,
    "admin_user": "azureuser",
    "ip_address": null
  },
  "userPresent": "609-kq3qUTofAazFKoaW.eMaHgRYMN7JFIBW",
  "usercmd": {
    "id": 23,
    "name": "y2-acme",
    "imgname": "ubuntu:22.04",
    "settingsstr": "{\n \"CF_Key\": \"\",\n \"CF_Email\": \"\"\n}",
    "settings": {
      "CF_Key": "",
      "CF_Email": ""
    },
    "debug": false,
    "content": "#!/bin/bash\n# timeout.seconds: 600\n\nif [[ $1 == test ]];then\n echo \"cccccccccccc\"\n echo $CF_Key\n echo $SCRIPT_ENVS_CLEAR\nfi\n\nif [[ $1 == deploy ]];then\ndname=y2.free-ssl.me\npfxpassword='_t3TbGxYgxDm'\nacmeHome=$HOME/.acme.sh\nexport LE_WORKING_DIR=\"$acmeHome\"\nacmeExe=\"${acmeHome}/acme.sh\"\n\nif [[ -e $acmeExe ]]; then\n\techo \"acme.sh already installed.\"\nelse\n wget -O - https://get.acme.sh | sh -s email=jianglibo@gmail.com\nfi\n\n# $acmeExe --set-default-ca --server zerossl\n$acmeExe --set-default-ca --server letsencrypt\n\n#https://github.com/acmesh-official/acme.sh/wiki/dnsapi#how-to-use-dns-api\n\n# $acmeExe --issue --dns dns_azure -d $dname --debug\n$acmeExe --issue --dns dns_cf -d $dname\n$acmeExe --toPkcs -d $dname --password $pfxpassword\n\nscp_wrap -r \"${acmeHome}/${dname}_ecc\" \"$SSH_USER@$SSH_HOST\":~\n\n# backup and copy certs on remote server.\nbackupScript=$(\n\tcat <<'EOF'\ndname=\"y2.free-ssl.me\"\nsource_dir=\"/etc/trojanweb/certs/${dname}\"\nparent_dir=\"$(dirname \"$source_dir\")\"\nsource_name=\"$(basename \"$source_dir\")\"\ntimestamp=$(date +\"%Y-%m-%d-%H%M%S\")\nbackup_name=\"${source_name}_${timestamp}\"\nbackup_dir=\"${parent_dir}/${backup_name}\"\nsudo mkdir -p \"$backup_dir\"\nsudo cp -r \"$source_dir\"/* \"$backup_dir\"\nsudo cp \"$HOME/${dname}_ecc/\"* $source_dir\nEOF\n)\nexport SSH_SCRIPT=\"${backupScript}\"\nssh_script $SSH_USER@$SSH_HOST\n# /etc/trojanweb/certs/y2.free-ssl.me/fullchain.cer\n# /etc/trojanweb/certs/y2.free-ssl.me/y2.free-ssl.me.key\nfi\n# move to the line in the outputs which looks like url and hit Ctrl-enter to follow.\n# \n",
    "files": [],
    "description": "it's template for acme.sh.\n\n./acme.sh --issue --dns dns_cf -d yourdomain.com\n#export CF_Key=\"edfgdfgdfgd\"\n#export CF_Email=\"your@mail.com\"",
    "tags": [],
    "public_cmd": false,
    "updated_at": "2024-05-02T22:50:40.326617Z",
    "code_language": "shell",
    "user_id": 30
  },
  "debug": false,
  "name": "y2-acme",
  "rawArgs": "test",
  "accept": null,
  "payloads": {
    "postmeta": null
  }
}
```
## Special variable names

These variable are available directly.

```bash
{
  "SSH_HOST": "1.2.3.4",
  "SSH_USER": "root",
  "SSH_PRIVATE_KEY_VALUE": "-----BEGIN OPENSSH PRIVATE K"
}
```
