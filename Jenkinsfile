pipeline {
    agent {
        docker {
            image 'node:13-alpine'
            // args '-u 0:0 -p 3000:3000 -p 5000:5000' 
            args ' -e "HOME=/var/lib/jenkins/workspace" -v /var/lib/jenkins/workspace:/var/lib/jenkins/workspace -p 3000:3000 -p 5000:5000' 
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'echo npm run test:unit'
            }
        }
        stage('Deliver for development') {
            when {
                branch 'br_bootstrap'
            }
            steps {
                sh './jenkins/deliver-for-development.sh'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                sh './jenkins/kill.sh'
            }
        }
        stage('Build docker image') {
            when {
                branch 'br_bootstrap'
            }
            steps {
                sh 'make'
            }
        }
        stage('Deploy for production') {
            when {
                branch 'production'
            }
            steps {
                sh './jenkins/scripts/deploy-for-production.sh'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                sh './jenkins/scripts/kill.sh'
            }
        }
    }
}