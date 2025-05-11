pipeline {
    agent any

    environment {
        REGISTRY_URL = 'diolab:5000'
        IMAGE_NAME = "${REGISTRY_URL}/my-portfolio"
        PATH = "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/bin/docker"
        DOCKER_HOST = "unix:///var/run/docker.sock"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Docker') {
            steps {
                sh 'docker --version'
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

        stage('Push to Registry') {
            steps {
                script {
                    sh """
                        docker push ${IMAGE_NAME}:${env.BUILD_ID}
                        docker push ${IMAGE_NAME}:latest
                    """
                }
            }
        }

        stage('Deploy to clientPi') {
            steps {
                sshagent(credentials: ['id-clientPi-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no pi@clientPi '
                            docker pull ${IMAGE_NAME}:${env.BUILD_ID} &&
                            docker stop my-portfolio || true &&
                            docker rm my-portfolio || true &&
                            docker run -d --name my-portfolio -p 80:80 ${IMAGE_NAME}:${env.BUILD_ID}
                        '
                    """
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
