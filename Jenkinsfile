
node ('master') {
  stage ('checkout') {
      echo 'checkout before'
     git url: 'https://github.com/lysinvest/main'
        sh "docker-compose up -d"
      echo 'checkout after'
  }
  stage ('Unit Tests') {
      echo 'Unit Tests'
  }
  stage ('automated Test') {
    echo 'automated Test'
    parallel (
      Sonar : {
        node('master') {
          echo 'Quality Tests'
        }
      },
      functionnal : {
        node('master') {
          echo 'Functionnal Tests'
        }
      }
    )
  }
}
