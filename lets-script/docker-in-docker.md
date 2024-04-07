---
title: Docker in Docker
layout: default
nav_order: 21 
has_children: false
parent: Lets-script
---

## Run docker in docker

First choose an outer docker image like `ubuntu:22.04`, then install docker daemon on it.

Bellow is a `dependencies.sh` for my command's files:

```bash
if ! command -v jq >/dev/null 2>&1; then
  apt install -y jq
fi

if ! command -v docker >/dev/null 2>&1; then
  apt-get update
  apt-get -y install  ca-certificates  curl  gnupg lsb-release
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
  apt-get update
  apt-get install -y docker-ce docker-ce-cli containerd.io
fi
```

## In Outer Docker Container, Using the docker daemon

In the outer docker just using the docker as it was.


 {: .important }
 > Using `dockerd &` to keep the docker daemon running at the execution time of the command.


bellow is a demo:

{% raw %}
```bash
# lets-script.cmdvars.deletecontainer: false
# lets-script.cmdvars.stopcontainer: false

set -e
uname -a

bash ./dependencies.sh
repo=springsecurity-explained

github_pat=$(echo $SCRIPT_ENVS_CLEAR | jq -r '.usercmd.settings.github_pat')
JAR_NAME={{JAR_NAME}}

command -v dockerd
docker --version
if from_github;then
  if ! github_contains '*!docker-deploy!*';then
    	echo "message didn't contains !docker-deploy!"
    	exit 0
  fi
fi

sleep 3
dockerd &

if [[ -d $repo ]]; then
  echo "$repo already exist, trying to git pull."
  cd $repo
  git reset --hard HEAD
  git pull
else
  git clone "https://{{github_pat}}@github.com/jianglibo/${repo}.git"
  cd $repo
fi
install_asdf_tools
./gradlew --no-daemon bootJar
jar_file=./build/libs/{{JAR_NAME}}
imagename=letsscripthub
cp "../${imagename}-dockerfile" ./build/libs/Dockerfile

if [[ -f demoserverbg.jar ]];then
  rm -f demoserverbg.jar
fi

curl -JLO 'https://lets-script.com/download/deployjar?cat=deployjar&file=demoserverbg.jar' 

mv demoserverbg.jar ./build/libs/

docker build -t $imagename -t "jianglibo/$imagename" ./build/libs

echo {{dockerhubpat}} > my_password.txt
cat my_password.txt | docker login --username jianglibo --password-stdin
docker push jianglibo/$imagename

# {{eval shell , Ctrl-enter to 🏃}}
 ```
{% endraw %}