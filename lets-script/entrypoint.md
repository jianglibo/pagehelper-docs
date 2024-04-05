---
title: Entrypoint
layout: default
nav_order: 9
has_children: false
parent: Lets-script
---

## Entrypoint.sh

Entrypoint.sh will call your cmd, pass in arguments and environvariables and utility functions.

## An entrypoint.sh

```bash
#!/bin/bash
# version 2024-03-10T03:11:52.042Z
function write_ssh_file() {
        local SSH_PRIVATE_KEY_VALUE="${1-$SSH_PRIVATE_KEY_VALUE}"
        local SSH_KEY_FILE=$(uuidgen)
        #(echo "$SSH_PRIVATE_KEY_VALUE" | base64 -d) >$SSH_KEY_FILE
        echo "$SSH_PRIVATE_KEY_VALUE" >$SSH_KEY_FILE
        chmod 600 $SSH_KEY_FILE
        echo $SSH_KEY_FILE
}


# wrap scp command, expect a SSH_PRIVATE_KEY_VALUE
function scp_wrap() {
        local SSH_KEY_FILE=$(write_ssh_file)
   scp -o StrictHostKeyChecking=no -i $SSH_KEY_FILE "$@"
}

function ssh_wrap() {
        local SSH_KEY_FILE=$(write_ssh_file)
   ssh -o StrictHostKeyChecking=no -i $SSH_KEY_FILE "$@"
}

export -f ssh_wrap

function ssh_script() {
        local SSH_KEY_FILE=$(write_ssh_file)
        ssh -o StrictHostKeyChecking=no -i $SSH_KEY_FILE "$@" bash <<EOF
$SSH_SCRIPT
EOF
        rm -f $SSH_KEY_FILE
}


function upload() {
        local SRC_FILE="$1"
    local X_API_KEY=${2:-$X_API_KEY}
        local USERCMD_ID=${3:-$USERCMD_ID}
    uploadUrl=${LISTEN_SCHEMA}://"$LXD_HOST_IP":${LISTEN_PORT}/localupload
    echo "upload url: $uploadUrl"
    echo $(curl -k -H "x-api-key:${X_API_KEY}" -H "usercmd-id: ${USERCMD_ID}" -F file=@${SRC_FILE} $uploadUrl)
}


function download() {
        local saveto="$1"
        local idx="${2:-1}"
        local cmdid=${USERCMD_ID}
        if [[ -z $cmdid ]]; then
                echo "Error: USERCMD_ID is not set."
                return
        fi
        if [[ -z $X_API_KEY ]]; then
                echo "Error: X_API_KEY is not set."
                return
        fi
        if [[ -z $saveto ]]; then
                echo "Error: no file to save to."
                return
        fi

        local url0="${LISTEN_SCHEMA}://$LXD_HOST_IP:$LISTEN_PORT/remote-assets/cmd-asset?cmdid=$cmdid&idx=$idx"
        echo "ask for url0: $url0 $X_API_KEY"
        local url=$(curl -k -X GET $url0 -H "x-api-key: $X_API_KEY")
        echo "got download url: $url"
        # download from the url, follow the redirections
        # if url not starts with http, print out error message and exit.
        # if url starts with http, then download the file to the $saveto
        if [[ ! $url =~ ^http ]]; then
                echo "Error: $url"
        else
                curl -L -o $saveto $url
        fi
install_asdf_tools() {
  if [[ ! -f  ~/.asdf/asdf.sh ]]; then
    git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.14.0
  fi
  . ~/.asdf/asdf.sh
  if [[ -f .tool-versions ]]; then
        while IFS=' ' read -r tool_name tool_version; do
            # Check if the line is empty or starts with a comment character
            if [[ -n $tool_name && ! $tool_name =~ ^# ]]; then
                echo "Installing $tool_name version $tool_version"
                asdf plugin add "$tool_name"
                asdf install "$tool_name" "$tool_version"
            fi
        done < .tool-versions
    else
        echo ".tools-version file not found."
    fi
}

export -f write_ssh_file
export -f scp_wrap
export -f ssh_script
export -f upload
export -f download
export -f install_asdf_tools

bash ./_usercmd.sh $RAW_ARGS
```