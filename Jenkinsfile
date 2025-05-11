pipeline {
    agent any

    environment {
        REGISTRY_URL = credentials('REGISTRY_URL')
        IMAGE_NAME = "${REGISTRY_URL}/my-portfolio"
        PATH = "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/bin/docker"
        DOCKER_HOST = "unix:///var/run/docker.sock"
        REMOTE_HOST = credentials('REMOTE_HOST')
        REMOTE_USER = credentials('REMOTE_USER')
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

        stage('Deploy to clientPi') {
            steps {
                sshagent(credentials: ['clientPi-ssh-key']) {
                    sh """
                        docker save ${IMAGE_NAME}:${env.BUILD_ID} | ssh ${REMOTE_USER}@${REMOTE_HOST} 'docker load'
                        ssh ${REMOTE_USER}@${REMOTE_HOST} 'docker stop portfolio-container || true'
                        ssh ${REMOTE_USER}@${REMOTE_HOST} 'docker rm portfolio-container || true'
                        ssh ${REMOTE_USER}@${REMOTE_HOST} 'docker run -d --name portfolio-container -p 80:80 ${IMAGE_NAME}:${env.BUILD_ID}'
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