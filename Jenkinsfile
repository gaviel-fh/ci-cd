pipeline {
  agent any
  // agent {label 'Linux'}
  tools {nodejs "NodeJs"}

  stages {
    stage("Deploy on production Server") {
      steps {
        script {
          dockerComposeUp = 'docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build --no-deps node-app'
          pathToProject = '/root/app/jenkinsTest'
        }

        sshagent(credentials: ['ssh_key_server1']) {
          sh "ssh -o StrictHostKeyChecking=no root@134.122.76.203 'cd ${pathToProject}; git pull; ${dockerComposeUp}'"
        }
      }
    }
  }
}