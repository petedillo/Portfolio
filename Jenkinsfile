pipeline {
    agent any

    environment {
        REGISTRY_URL = credentials('REGISTRY_URL')
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
    }
}
