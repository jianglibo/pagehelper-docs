---
title: Password Generator Online
layout: default
tagline: "Generate password using htpassword, open-ssl one line, for basic authorization or ldap."
nav_order: 5
parent: Lets-script Tools
has_children: false
---

## Generate Password Online

Create password for .htaccess, .htpasswd or ldap etc.

<div x-data="{
  tpl: `
#formats: MD5,SHA-1,SHA-256,SHA-512,bcrypt\n
format: MD5\n
password_length: 12\n
user_count: 1\n
#user_name: u{random8} || u{randomd8}\n
user_name: u{random8}\n
#separator: default :\n
separator:\n
ldapdn: cn=%s,ou=people,dc=example,dc=com\n
`,
  styles: {color: ''}
  }">
<div class="cm-editor-wrap"
 id="user-cm-wrap"
 >
  <input
    type="hidden"
    name="tpl"
    x-model="tpl"
    value=""
    id="htpasswd-config"
    data-lang="text"
    data-max-height="400px"
    data-finalc="https://lets-script.com/devtools/ph-playground-completion"
    data-firewritein
    data-min-height="100px"
    data-acplugins="disabled"
    data-resizable
    data-mode="normal"
  />
</div>
<div style="margin-top:8px;margin-bottom:8px;">
<button
  type="button"
  class="btn btn-sm"
  ph-disable-on-working
  ph-v='
  {"data": {"raw": "raw content", "encoded":"encoded content" }}
  '
  ph-params="config:::#htpasswd-config/value"
  ph-target="[ph-htpasswd-receiver]"
  ph-ajax="https://lets-script.com/devtools/htpasswd">
<span>Do it</span>
</button>
</div>

<div class="cm-editor-wrap"
  id="generated-cm-wrap"
>
  <span>Raw Content:</span>
  <span style="cursor:pointer;" ph-to-clipboard="#htpasswd-raw">(Copy)</span>
  <input
    type="hidden"
    name="generated"
    id="htpasswd-raw"
    ph-htpasswd-receiver
    ph-data-consumer="value"
    ph-cm-writeback
    ph-data-path="data.raw"
    data-finalc="https://lets-script.com/devtools/ph-playground-completion"
    data-lang="text"
    data-max-height="400px"
    data-min-height="100px"
    data-firewritein
    data-resizable
    data-mode="normal"
  />
</div>

<div class="cm-editor-wrap" style="margin-top: 10px;">
  <span>Encoded Content:</span>
  (<span style="cursor:pointer;" ph-to-clipboard="#htpasswd-encoded">Copy</span>)
  <input
    type="hidden"
    name="encoded"
    id="htpasswd-encoded"
    ph-htpasswd-receiver
    ph-data-consumer="value"
    ph-cm-writeback
    ph-data-path="data.encoded"
    data-finalc="https://lets-script.com/devtools/ph-playground-completion"
    data-lang="text"
    data-max-height="400px"
    data-min-height="100px"
    data-firewritein
    data-resizable
    data-mode="normal"
  />
</div>

<div class="cm-editor-wrap" style="margin-top: 10px;">
  <span>LDIF Content:</span>
  <span style="cursor:pointer;" ph-to-clipboard="#htpasswd-ldif">(Copy)</span>
  <input
    type="hidden"
    name="generated"
    id="htpasswd-ldif"
    ph-htpasswd-receiver
    ph-data-consumer="value"
    ph-cm-writeback
    ph-data-path="data.ldif"
    data-finalc="https://lets-script.com/devtools/ph-playground-completion"
    data-lang="text"
    data-max-height="400px"
    data-min-height="100px"
    data-firewritein
    data-resizable
    data-mode="normal"
  />
</div>
</div>

## ldap LDIF file example

Simple:

```yaml
dn: cn=johndoe,ou=people,dc=example,dc=com
#dn: uid=johndoe,ou=people,dc=example,dc=com
objectClass: inetOrgPerson
cn: johndoe
sn: Doe/Unknown
userPassword: {CRYPT}$1$abc$QH8J/F/2DQ6p7R5tym4Iw/
```

Full example:

```yaml
dn: uid=johndoe,ou=people,dc=example,dc=com
objectClass: inetOrgPerson
objectClass: posixAccount
objectClass: shadowAccount
cn: John Doe
sn: Doe
uid: johndoe
uidNumber: 10001
gidNumber: 10001
homeDirectory: /home/johndoe
loginShell: /bin/bash
```

Explain:

In the context of LDAP (Lightweight Directory Access Protocol), cn=admin,dc=example,dc=com is a distinguished name (DN) that represents the entry of an administrator in the LDAP directory tree. Let's break down the components:

cn=admin: This part specifies the common name (cn) attribute of the entry, which in this case is admin. The common name is typically used to represent the human-readable name of an entry, such as a user or administrator.
dc=example,dc=com: This part specifies the base distinguished name (DN) of the LDAP directory tree. It consists of domain components (dc) separated by commas. In this example, example.com is a fictional domain, and dc=example,dc=com represents the root of the LDAP directory tree for the example.com domain.
Putting it all together, cn=admin,dc=example,dc=com represents the administrator entry located within the LDAP directory tree rooted at dc=example,dc=com. This administrator entry typically has privileges to perform administrative tasks such as adding, modifying, and deleting entries in the LDAP directory.

In practice, the administrator entry may have additional attributes and values, such as a password, organizational information, or other administrative metadata, depending on the specific LDAP directory schema and configuration.

```bash
ldapadd -x -D "cn=admin,dc=example,dc=com" -W -f user.ldif
ldapsearch -x -b "dc=example,dc=com" "(uid=johndoe)"
```
