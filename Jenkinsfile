pipeline {
    agent any

    environment {
        REGISTRY_URL = 'diolab:5000'
        IMAGE_NAME = "${REGISTRY_URL}/my-portfolio"
        CONTAINER_NAME = 'my-portfolio-app'
        CLIENT_PI_SSH_CREDS = 'clientPi-ssh-key'
        CLIENT_PI_HOST = 'clientPi'
        CONTAINER_PORT_MAP = '80:8080'
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out code..."
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build "${IMAGE_NAME}:${env.BUILD_ID}"
                    docker.tag "${IMAGE_NAME}:${env.BUILD_ID}", "${IMAGE_NAME}:latest"
                    echo "Built Docker image: ${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.push "${IMAGE_NAME}:${env.BUILD_ID}"
                    docker.push "${IMAGE_NAME}:latest"
                    echo "Pushed Docker images to ${REGISTRY_URL}"
                }
            }
        }

        stage('Deploy to ClientPi') {
            steps {
                sshagent(credentials: [CLIENT_PI_SSH_CREDS]) {
                    script {
                        echo "Deploying to ${CLIENT_PI_HOST}..."

                        sh "ssh ${CLIENT_PI_HOST} 'docker stop ${CONTAINER_NAME} || true'"
                        sh "ssh ${CLIENT_PI_HOST} 'docker rm ${CONTAINER_NAME} || true'"
                        echo "Stopped and removed old container ${CONTAINER_NAME}"

                        sh "ssh ${CLIENT_PI_HOST} 'docker pull ${IMAGE_NAME}:latest'"
                        echo "Pulled latest image from ${REGISTRY_URL}"

                        sh "ssh ${CLIENT_PI_HOST} 'docker run -d --name ${CONTAINER_NAME} -p ${CONTAINER_PORT_MAP} ${IMAGE_NAME}:latest'"
                        echo "Started new container ${CONTAINER_NAME}"
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}