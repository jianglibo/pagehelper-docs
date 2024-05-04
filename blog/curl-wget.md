---
title: Wget don't support https CONNECT request
layout: default
nav_order: 130
has_children: false
description: Curl will initiate https CONNECT request, but Wget not.
parent: Blogs for pagehelper
---

## Wget failed to use https proxy.

I set up an HTTPS proxy using Nginx (Openresty). [nginx-as-proxy](/nginx-as-proxy/). It works when using CURL, but fails with Wget.

After some investigation, I discovered that Wget does not use HTTPS to invoke the CONNECT request, but the server side requires an HTTPS connection. Therefore, the request is rejected at the very beginning, and I cannot find the log item I wrote in Lua.

The output of the Wget command is as follows:

```bash
jianglibo@DESKTOP-6Q74HLS:~$ wget --secure-protocol=auto --debug https://www.sohu.com/a/776131141_100182377
DEBUG output created by Wget 1.20.3 on linux-gnu.

Reading HSTS entries from /home/jianglibo/.wget-hsts
URI encoding = ‘UTF-8’
URI encoding = ‘UTF-8’
Converted file name '776131141_100182377' (UTF-8) -> '776131141_100182377' (UTF-8)
--2024-05-04 19:12:22--  https://www.sohu.com/a/776131141_100182377
Resolving gate.lets-script.com (gate.lets-script.com)... 172.234.87.24
Caching gate.lets-script.com => 172.234.87.24
Connecting to gate.lets-script.com (gate.lets-script.com)|172.234.87.24|:8443... connected.
Created socket 3.
Releasing 0x00005594e07f6510 (new refcount 1).

---request begin---
CONNECT www.sohu.com:443 HTTP/1.1
User-Agent: Wget/1.20.3 (linux-gnu)
Proxy-Authorization: Basic AAAAAAAAAAAAAAAAAA
Host: www.sohu.com:443

---request end---
proxy responded with: [HTTP/1.1 400 Bad Request
Server: openresty/1.25.3.1
Date: Sat, 04 May 2024 11:12:31 GMT
Content-Type: text/html
Content-Length: 261
Connection: close
]
Proxy tunneling failed: Bad RequestUnable to establish SSL connection.
```

the CURL:

```bash
jianglibo@DESKTOP-6Q74HLS:~$ curl -v -I https://www.sohu.com/a/776131141_100182377
* Uses proxy env variable https_proxy == 'https://username:password@gate.lets-script.com:8443'
*   Trying 172.234.87.24:8443...
* TCP_NODELAY set
* Connected to gate.lets-script.com (172.234.87.24) port 8443 (#0)
* ALPN, offering http/1.1
* successfully set certificate verify locations:
*   CAfile: /etc/ssl/certs/ca-certificates.crt
```

## Using WireShark to inspect the packages.

When using CURL, all communication occurs under HTTPS, so the Proxy-Authorization header cannot be seen.

When using Wget, the CONNECT request uses plain HTTP protocol, which is rejected by the proxy server
