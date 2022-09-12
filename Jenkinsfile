// pipeline {
//   agent any
//   // agent {label 'Linux'}
//   tools {nodejs "NodeJs"}
//   environment {
//     DOCKERHUB_CREDENTIALS = credentials('josefkaiser-dockerhub')
//   }

//   stages {
//     stage("Testing") {
//       steps {
//         sh 'cd backend; npm install; npm test; cd ..'
//       }
//     }

//     stage("Build images and push") {
//       steps {
//         sh 'cd ./frontend && docker build -t josefkaiser/ci-cd_frontend --file ./Dockerfile.prod .'
//         sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
//         sh 'docker push josefkaiser/ci-cd_frontend:latest'
//       }
//     }

//     stage("Deploy on production Server") {
//       steps {
//         script {
//           removeExistingDockerData = 'docker kill $(docker ps -q); docker system prune -a -f'
//           dockerComposeUp = 'docker compose -f docker-compose.prod.yml up -d --build'
//           pathToProject = '/root/app/ci-cd'
//         }

//         sshagent(credentials: ['ssh_key_server1']) {
//           sh "ssh -o StrictHostKeyChecking=no root@134.122.76.203 '${removeExistingDockerData}; cd ${pathToProject}; git pull; ${dockerComposeUp}'; cd .."
//         }
//       }
//     }
//   }

//   post {
//     always {
//       sh 'docker logout'
//     }
//   }
// }


pipeline {
  stages {
    stage("Testing") {
      steps {
        echo testing
      }
    }

    stage("Build images and push") {
      steps {
        echo build images
        echo push images
      }
    }

    stage("Deploy on production Server") {
      steps {
        echo Deploy application to production server
      }
    }
  }

  post {
    always {
      echo cleanup
    }
  }
}