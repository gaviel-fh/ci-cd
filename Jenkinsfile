pipeline {
  agent any
  // agent {label 'Linux'}
  tools {nodejs "NodeJs"}
  environment {
    DOCKERHUB_CREDENTIALS = credentials('josefkaiser-dockerhub')
  }

  stages {
    stage("Build images and push") {
      steps {
        sh 'cd ./frontend && docker build -t josefkaiser/ci-cd_frontend --file .\Dockerfile.prod .'
        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stadin'
        sh 'docker push josefkaiser/ci-cd_frontend'
      }
    }

    stage("Deploy on production Server") {
      steps {
        script {
          dockerComposeUp = 'docker compose -f docker-compose.prod.yml up -d --build'
          pathToProject = '/root/app/jenkinsTest'
        }

        sshagent(credentials: ['ssh_key_server1']) {
          sh "ssh -o StrictHostKeyChecking=no root@134.122.76.203 'cd ${pathToProject}; git pull; ${dockerComposeUp}'"
        }
      }
    }
  }
}