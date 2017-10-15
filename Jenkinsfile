
node ('master') {
  echo 'hello 1150'

  checkout([$class: 'GitSCM', 
  branches: [[name: '*/master']], 
  doGenerateSubmoduleConfigurations: false, 
  extensions: [], 
  submoduleCfg: [], 
  userRemoteConfigs: [[credentialsId: 'github', url: 'git@github.com:lysinvest/main.git']]])

}

