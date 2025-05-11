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

        stage('Deploy to clientPi') {
            steps {
                withCredentials([
                    string(credentialsId: 'REMOTE_HOST', variable: 'REMOTE_HOST'),
                    string(credentialsId: 'REMOTE_USER', variable: 'REMOTE_USER'),
                    sshUserPrivateKey(credentialsId: 'clientPi-ssh-key', keyFileVariable: 'SSH_KEY')
                ]) {
                    sh """
                        # Use the SSH key explicitly with each command
                        docker save ${IMAGE_NAME}:${env.BUILD_ID} | ssh -i \$SSH_KEY -o StrictHostKeyChecking=no \$REMOTE_USER@\$REMOTE_HOST 'docker load'
                        ssh -i \$SSH_KEY -o StrictHostKeyChecking=no \$REMOTE_USER@\$REMOTE_HOST 'docker stop portfolio-container || true'
                        ssh -i \$SSH_KEY -o StrictHostKeyChecking=no \$REMOTE_USER@\$REMOTE_HOST 'docker rm portfolio-container || true'
                        ssh -i \$SSH_KEY -o StrictHostKeyChecking=no \$REMOTE_USER@\$REMOTE_HOST 'docker run -d --name portfolio-container -p 80:80 ${IMAGE_NAME}:${env.BUILD_ID}'
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