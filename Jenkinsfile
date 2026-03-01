pipeline {
    agent any
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKER_IMAGE = "pranithaprabhakar/devops-capstone-app"
        APP_SERVER_IP = "172.31.33.160"
    }
    stages {
        stage('Checkout') {
            steps {
                echo 'Pulling code from GitHub...'
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh "docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} ."
                sh "docker tag ${DOCKER_IMAGE}:${BUILD_NUMBER} ${DOCKER_IMAGE}:latest"
            }
        }
        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing to Docker Hub...'
                sh 'echo ${DOCKER_HUB_CREDENTIALS_PSW} | docker login -u ${DOCKER_HUB_CREDENTIALS_USR} --password-stdin'
                sh "docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}"
                sh "docker push ${DOCKER_IMAGE}:latest"
            }
        }
        stage('Deploy to App Server') {
            steps {
                echo 'Deploying to App Server...'
                sshagent(['app-server-ssh']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@${APP_SERVER_IP} '
                            docker pull ${DOCKER_IMAGE}:latest &&
                            docker stop capstone-app || true &&
                            docker rm capstone-app || true &&
                            docker run -d --name capstone-app --restart always -p 3000:3000 ${DOCKER_IMAGE}:latest
                        '
                    """
                }
            }
        }
        stage('Health Check') {
            steps {
                echo 'Verifying deployment...'
                sh 'sleep 10'
                sshagent(['app-server-ssh']) {
                    sh "ssh -o StrictHostKeyChecking=no ubuntu@${APP_SERVER_IP} 'curl -f http://localhost:3000/health'"
                }
            }
        }
    }
    post {
        success { echo '✅ Pipeline completed successfully!' }
        failure { echo '❌ Pipeline failed!' }
        always { sh 'docker logout || true' }
    }
}