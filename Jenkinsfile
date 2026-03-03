pipeline {
    agent any
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKER_IMAGE = "pranithaprabhakar/devops-capstone-app"
        APP_SERVER_IP = "172.31.33.160"
        SNS_TOPIC_ARN = "arn:aws:sns:ap-southeast-1:292039821538:devops-pipeline-alerts"
        AWS_REGION = "ap-southeast-1"
        APP_PUBLIC_IP = "54.254.183.196"
        JENKINS_PUBLIC_IP = "13.212.192.30"
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
                        ssh -o StrictHostKeyChecking=no ubuntu@${APP_SERVER_IP} 'PREV_TAG=\$(docker inspect capstone-app --format="{{.Config.Image}}" 2>/dev/null | cut -d: -f2 || echo latest) && echo \$PREV_TAG > /home/ubuntu/prev_tag.txt && docker pull ${DOCKER_IMAGE}:latest && docker stop capstone-app || true && docker rm capstone-app || true && docker run -d --name capstone-app --restart always -p 3000:3000 ${DOCKER_IMAGE}:latest'
                    """
                }
            }
        }
        stage('Health Check') {
            steps {
                echo 'Verifying deployment...'
                sh 'sleep 10'
                sshagent(['app-server-ssh']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@${APP_SERVER_IP} 'if curl -f http://localhost:3000/health; then echo "Health check PASSED"; else echo "Health check FAILED - triggering rollback"; PREV_TAG=\$(cat /home/ubuntu/prev_tag.txt || echo latest); bash /home/ubuntu/scripts/rollback.sh \$PREV_TAG; exit 1; fi'
                    """
                }
            }
        }
    }
    post {
        success {
            echo 'Pipeline completed successfully!'
            sh '/usr/local/bin/aws sns publish --topic-arn ' + env.SNS_TOPIC_ARN + ' --message "BUILD SUCCESS: DevOps Capstone Pipeline #' + env.BUILD_NUMBER + ' passed all stages. App URL: http://' + env.APP_PUBLIC_IP + ':3000 Health Check: http://' + env.APP_PUBLIC_IP + ':3000/health Jenkins: http://' + env.JENKINS_PUBLIC_IP + ':8080" --subject "Jenkins Build SUCCESS - Build #' + env.BUILD_NUMBER + '" --region ' + env.AWS_REGION
        }
        failure {
            echo 'Pipeline failed!'
            sh '/usr/local/bin/aws sns publish --topic-arn ' + env.SNS_TOPIC_ARN + ' --message "BUILD FAILED: DevOps Capstone Pipeline #' + env.BUILD_NUMBER + ' failed. Check logs at: http://' + env.JENKINS_PUBLIC_IP + ':8080/job/devops-capstone-pipeline/' + env.BUILD_NUMBER + '/console Auto Rollback triggered on App Server." --subject "Jenkins Build FAILED - Build #' + env.BUILD_NUMBER + '" --region ' + env.AWS_REGION
        }
        always {
            sh 'docker logout || true'
        }
    }
}
