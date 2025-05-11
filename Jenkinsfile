pipeline {
    agent any

    environment {
        REGISTRY_URL = credentials('REGISTRY_URL')
        REGISTRY_CREDENTIALS = credentials('REGISTRY_CREDENTIALS')
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
                    withCredentials([usernamePassword(credentialsId: 'REGISTRY_CREDENTIALS', usernameVariable: 'REGISTRY_USER', passwordVariable: 'REGISTRY_PASSWORD')]) {
                        sh """
                            echo \$REGISTRY_PASSWORD | docker login ${REGISTRY_URL} -u \$REGISTRY_USER --password-stdin
                            docker push ${IMAGE_NAME}:${env.BUILD_ID}
                            docker push ${IMAGE_NAME}:latest
                            docker logout ${REGISTRY_URL}
                        """
                    }
                }
            }
        }
    }
}