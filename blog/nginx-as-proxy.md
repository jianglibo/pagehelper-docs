---
title: Nginx as a forward proxy.
layout: default
nav_order: 120
has_children: false
description: Nginx as a forward proxy, support basic authentication.
parent: Blogs for pagehelper
---

## Nginx as a forward proxy.

Nginx is commonly used as a reverse proxy, but it can also function as a forward proxy. There's a project called [ngx_http_proxy_connnect_module](https://github.com/chobits/ngx_http_proxy_connect_module) on GitHub that enables this functionality.

Let's compile Nginx as a forward proxy and use it standalone.

**If you need basic authentication, consider using OpenResty, which is more suitable for this purpose.**.

OpenResty is an enhanced version of Nginx that simplifies basic authentication using Lua scripts.

## Compile the nginx with the connect module

Steps
```bash
#!/bin/bash

openresty=openresty-1.25.3.1.tar.gz
if [[ -z $1 ]];then
apt -q update && apt -q install -y build-essential libpcre3 libpcre3-dev libzip-dev libssl-dev apache2-utils
git clone https://github.com/chobits/ngx_http_proxy_connect_module.git
cd ngx_http_proxy_connect_module
wget https://openresty.org/download/$openresty
tar -xzf $openresty
cd openresty-1.25.3.1
./configure --prefix=/opt/openresty --add-module=../ --with-http_ssl_module
patch -d build/nginx-1.25.3/ -p 1 < ../patch/proxy_connect_rewrite_102101.patch
#make CFLAGS="-Wno-deprecated-declarations" && make install
make && make install
fi

htpasswd -Bbc .htpasswd username 'password'

cp -f .htpasswd /opt/openresty/nginx/conf/
chmod 600 /opt/openresty/nginx/conf/.htpasswd
cp -f nginx.conf /opt/openresty/nginx/conf/
cp -f nginx-proxy.service /opt/openresty/nginx/

scp_wrap -r "/opt/openresty" "$SSH_USER@$SSH_HOST":/opt/

# {{eval shell copy, Ctrl-enter to 🏃}}
```

Go to [lets-script](https://lets-script.com) and search `ngx-connect-openresty` to build online.


## copy the nginx.server

Copy the nginx.service from /lib/systemd/system/nginx.service to /etc/systemd/system/nginx-proxy.service.

```sh
# Stop dance for nginx
# =======================
#
# ExecStop sends SIGSTOP (graceful stop) to the nginx process.
# If, after 5s (--retry QUIT/5) nginx is still running, systemd takes control
# and sends SIGTERM (fast shutdown) to the main process.
# After another 5s (TimeoutStopSec=5), and if nginx is alive, systemd sends
# SIGKILL to all the remaining processes in the process group (KillMode=mixed).
#
# nginx signals reference doc:
# http://nginx.org/en/docs/control.html
#
[Unit]
Description=A high performance web server and a reverse proxy server
Documentation=man:nginx(8)
After=network.target nss-lookup.target

[Service]
Type=forking
PIDFile=/run/nginx-proxy.pid
ExecStartPre=/opt/openresty/nginx/sbin/nginx -t -q -g 'daemon on; master_process on;'
ExecStart=/opt/openresty/nginx/sbin/nginx -g 'daemon on; master_process on;'
ExecReload=/opt/openresty/nginx/sbin/nginx -g 'daemon on; master_process on;' -s reload
ExecStop=-/sbin/start-stop-daemon --quiet --stop --retry QUIT/5 --pidfile /run/nginx-proxy.pid
TimeoutStopSec=5
KillMode=mixed

[Install]
WantedBy=multi-user.target
```

## Edit nginx.conf

Edit the nginx.conf under the /opt/openresty/nginx/conf/nginx.conf

```conf
user www-data;
#worker_processes auto;
pid /run/nginx-proxy.pid;
#user  nobody;
worker_processes 1;
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;
#pid        logs/nginx.pid;

events {
    worker_connections 1024;
}


http {
    include mime.types;
    default_type application/octet-stream;

    # Define a map to check for the presence of the Proxy-Authorization header
    # Log messages from the Perl code
    #    error_log /var/log/nginx/error.log debug;
    #error_log $auth_header debug;
    #    perl_require h/usr/local/nginx/conf/hello.pm;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';
    #access_log  logs/access.log  main;
    sendfile on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout 65;

    #gzip  on;
    server {
        listen 8443 ssl; ssl_certificate_key /etc/trojanweb/certs/gate.lets-script.com/gate.lets-script.com.key;
        ssl_certificate /etc/trojanweb/certs/gate.lets-script.com/fullchain.cer;
        ssl_session_cache shared:SSL:1m;
        # dns resolver used by forward proxying
        resolver 8.8.8.8;
        # Check if authentication is required based on the presence of the Proxy-Authorization header
        # forward proxy for CONNECT requests
        proxy_connect;
        proxy_connect_allow 443 563;
        proxy_connect_connect_timeout 10s;
        proxy_connect_data_timeout 10s;

        rewrite_by_lua_block {
            if not ngx.var.http_proxy_authorization then
            ngx.header["Proxy-Authenticate"] = "Basic realm=\"Access to internal site\""
            ngx.exit(407)
            end
            ngx.req.set_header("Authorization", ngx.var.http_proxy_authorization)
        }
        auth_basic "server auth";
        auth_basic_user_file /opt/openresty/nginx/conf/.htpasswd;
        # defined by yourself for non-CONNECT requests
        # Example: reverse proxy for non-CONNECT requests
        location / {
            # Check if the Proxy-Authorization header is present
            proxy_pass http://$host;
            proxy_set_header Host $host;
            # If backend wont check Auth header, we should not pass the user/password.
            proxy_hide_header Authorization;
            proxy_hide_header Proxy-Authorization;
        }
    }
}
```
## Use the proxy

```bash
export https_proxy=https://username:password@gate.lets-script.com:8443
# or
export https_proxy=http://username:password@gate.lets-script.com:8080
```

{: .warning }

> IF you find WGET don't work with https proxy, using http proxy instead. BECAUSE WGET invoke the CONNECT request with http.

If you want let CURL to use https, but let WGET use http, edit the `~/.wgetrc` file. or use 

```conf
https_proxy=http://gate.lets-script.com:8080
use_proxy=on
proxy-user=username
proxy-password=password
```
