node ('master') {
  stage ('checkout') {
      echo 'checkout'
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
