// Jenkinsfile (Declarative Pipeline)

pipeline {
    agent any // Or specify a label if you have multiple agents

    environment {
        // Define variables
        REGISTRY_URL = 'diolab:5000' // Replace with your registry's IP or hostname and port
        IMAGE_NAME = "${REGISTRY_URL}/my-portfolio" // Image name including registry
        CONTAINER_NAME = 'my-portfolio-app' // Name for the running container
        CLIENT_PI_SSH_CREDS = 'clientPi-ssh-key' // ID of the SSH credentials in Jenkins
        CLIENT_PI_HOST = 'clientPi' // Hostname or IP of clientPi
        CONTAINER_PORT_MAP = '80:8080' // Example: map host port 80 to container port 8080
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the configured SCM
                // (This is handled automatically by "Pipeline script from SCM")
                echo "Checking out code..."
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the image using the Dockerfile in the current directory
                    // Tag it for the local registry
                    docker.build "${IMAGE_NAME}:${env.BUILD_ID}" // Tag with build number
                    docker.tag "${IMAGE_NAME}:${env.BUILD_ID}", "${IMAGE_NAME}:latest" // Also tag as latest
                    echo "Built Docker image: ${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Push the tagged images to the local registry
                    // Docker login might be needed here if your registry required auth
                    // (not needed for our insecure setup)
                    docker.push "${IMAGE_NAME}:${env.BUILD_ID}"
                    docker.push "${IMAGE_NAME}:latest"
                    echo "Pushed Docker images to ${REGISTRY_URL}"
                }
            }
        }

        stage('Deploy to ClientPi') {
            agent {
                // Run this stage using the SSH agent
                sshagent([CLIENT_PI_SSH_CREDS]) {
                     // Commands inside this block will use the SSH key added in Jenkins
                     label 'any' // Or specify a label if clientPi is a Jenkins agent
                }
            }
            steps {
                script {
                    // SSH into clientPi and run commands
                    echo "Deploying to ${CLIENT_PI_HOST}..."

                    // Stop and remove the old container
                    // Use || true to prevent failure if container doesn't exist
                    sh "ssh ${CLIENT_PI_HOST} 'docker stop ${CONTAINER_NAME} || true'"
                    sh "ssh ${CLIENT_PI_HOST} 'docker rm ${CONTAINER_NAME} || true'"
                    echo "Stopped and removed old container ${CONTAINER_NAME}"

                    // Pull the latest image from the local registry
                    sh "ssh ${CLIENT_PI_HOST} 'docker pull ${IMAGE_NAME}:latest'"
                    echo "Pulled latest image from ${REGISTRY_URL}"

                    // Run the new container
                    sh "ssh ${CLIENT_PI_HOST} 'docker run -d --name ${CONTAINER_NAME} -p ${CONTAINER_PORT_MAP} ${IMAGE_NAME}:latest'"
                    echo "Started new container ${CONTAINER_NAME}"

                    // Optional: Wait a bit and check container logs for errors
                    // sh "ssh ${CLIENT_PI_HOST} 'sleep 5 && docker logs ${CONTAINER_NAME}'"
                }
            }
        }
    }

    post {
        always {
            // Clean up workspace after build (optional)
            cleanWs()
        }
    }
}