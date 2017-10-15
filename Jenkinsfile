
node ('master') {

  env.BN = VersionNumber([
        versionNumberString : '${BUILD_MONTH}.${BUILDS_TODAY}.${BUILD_NUMBER}', 
        projectStartDate : '2017-02-09', 
        versionPrefix : 'v1.'
    ])

  stage ('provision') {

    echo 'Checkout source code from github ' + env.BN

    checkout([$class: 'GitSCM', 
    branches: [[name: '*/master']], 
    doGenerateSubmoduleConfigurations: false, 
    extensions: [], 
    submoduleCfg: [], 
    userRemoteConfigs: [[credentialsId: 'github', url: 'git@github.com:lysinvest/main.git']]])

/*    echo 'Stash the project source code ...'
    stash includes: '**', name: 'SOURCE_CODE'*/

    sh 'cat /etc/hostname'
    sh 'docker --version'
    sh 'docker-compose --version'


    sh "mkdir -p output"
    writeFile file: "output/somefile", text: "Hey look, some text."
    stash name: "first-stash", includes: "output/*"  

/*    sh 'cd ~/'
    sh 'ls -a'
    sh 'docker-compose --version'*/

  }

}

node ('registry') {

  stage ('production') {

//    unstash  includes: '**', name: 'SOURCE_CODE'

    sh 'cat /etc/hostname'
    sh 'docker --version'
    sh 'docker-compose --version'

  }*/

}