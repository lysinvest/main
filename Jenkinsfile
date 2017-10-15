
node ('master') {
  
  echo 'Checkout source code from github'

  checkout([$class: 'GitSCM', 
  branches: [[name: '*/master']], 
  doGenerateSubmoduleConfigurations: false, 
  extensions: [], 
  submoduleCfg: [], 
  userRemoteConfigs: [[credentialsId: 'github', url: 'git@github.com:lysinvest/main.git']]])

}

