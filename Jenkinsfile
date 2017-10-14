node('registry') {
  def app
  def commit_id

  stage('Clone repository') {
    checkout scm
    echo 'checkout scm'
/*    git([url: 'https://github.com/lysinvest/main', branch: 'master'])
    echo 'git code'*§
   }

  stage('build') {
    /*sh 'docker-compose up -d'*/
  }

/*  stage('Build image') {
    sh 'sudo docker-compose up -d'
  }  */

  stage('Build image') {
    app = docker.build("momo")
  }

}