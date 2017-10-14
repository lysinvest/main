node('master') {
  def app
  def commit_id

  stage('initialize') {
    checkout scm
    echo 'checkout scm'
    git([url: 'https://github.com/lysinvest/main', branch: 'master'])
    echo 'git code'
   }
}