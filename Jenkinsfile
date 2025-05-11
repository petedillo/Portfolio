pipeline {
    agent any

    environment {
        REGISTRY_URL = 'diolab:5000'
        IMAGE_NAME = "${REGISTRY_URL}/my-portfolio"
        CONTAINER_NAME = 'my-portfolio-app'
        CLIENT_PI_SSH_CREDS = 'clientPi-ssh-key'
        CLIENT_PI_HOST = 'clientPi'
        CONTAINER_PORT_MAP = '80:8080'
        PATH = "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/var/lib/docker/bin"
        DOCKER_REGISTRY_CREDS = credentials('docker-registry-credentials')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'test', url: 'https://github.com/petedillo/Portfolio.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh """
                        docker build -t ${IMAGE_NAME}:${env.BUILD_ID} .
                        docker tag ${IMAGE_NAME}:${env.BUILD_ID} ${IMAGE_NAME}:latest
                    """
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    sh """
                        echo ${DOCKER_REGISTRY_CREDS_PSW} | docker login ${REGISTRY_URL} -u ${DOCKER_REGISTRY_CREDS_USR} --password-stdin
                        docker push ${IMAGE_NAME}:${env.BUILD_ID}
                        docker push ${IMAGE_NAME}:latest
                        docker logout ${REGISTRY_URL}
                    """
                }
            }
        }

        stage('Deploy to ClientPi') {
            steps {
                sshagent(credentials: [CLIENT_PI_SSH_CREDS]) {
                    script {
                        sh """
                            ssh -o StrictHostKeyChecking=no ${CLIENT_PI_HOST} 'docker stop ${CONTAINER_NAME} || true'
                            ssh ${CLIENT_PI_HOST} 'docker rm ${CONTAINER_NAME} || true'
                            ssh ${CLIENT_PI_HOST} 'docker pull ${IMAGE_NAME}:latest'
                            ssh ${CLIENT_PI_HOST} 'docker run -d --name ${CONTAINER_NAME} -p ${CONTAINER_PORT_MAP} ${IMAGE_NAME}:latest'
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            sh 'docker logout ${REGISTRY_URL} || true'
            cleanWs()
        }
        failure {
            sh 'docker system prune -f || true'
        }
    }
}