# pagehelper-docs
documentation of the pagehelper

## usage

https://jekyllrb.com/docs/

bundle exec jekyll serve --livereload

bundle exec jekyll serve --port 4008 --host 0.0.0.0

## install ruby
apt install -y libyaml-dev libtool libssl-dev libffi-dev zlib1g-dev build-essential

## yarn
corepack enable
asdf reshim nodejs
yarn set version stable

##  customize

bundle info --path just-the-docs


## release

bash release.sh

## cloudflare

be aware of the `baseurl`.


## yarn onchange ../pagehelper/**/*.ts -- bash release.sh

## Dev

```sh
tmuxp load session.yml
```