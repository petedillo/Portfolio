pipeline {
    agent any

    environment {
        REGISTRY_URL = 'diolab:5000'
        IMAGE_NAME = "${REGISTRY_URL}/my-portfolio"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
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
    }

    post {
        always {
            cleanWs()
        }
    }
}