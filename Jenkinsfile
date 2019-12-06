pipeline {
//    agent {
//        docker {
//            image 'node:13-alpine'
//            args ' -e "HOME=/var/lib/jenkins/workspace" -v /var/lib/jenkins/workspace:/var/lib/jenkins/workspace -p 3000:3000 -p 5000:5000' 
//        }
//    }
    // https://jenkins.io/doc/book/pipeline/syntax/#agent
    agent {
    // Equivalent to "docker build -f Dockerfile-jenkins --build-arg version=1.0.2 ./image-build/
        dockerfile {
            filename 'Dockerfile-jenkins'
            dir 'image-build'
            args ' -e "HOME=/var/lib/jenkins/workspace" -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/jenkins/workspace:/var/lib/jenkins/workspace -p 3000:3000 -p 5000:5000' 
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
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
                sh 'echo I am $(id)'
                // The docker image is built from the docker file and specifies
                // the proper group name and id for jenkins and docker
                // To re-evaluate jenkins group and switch to its secondary group docker
                // we use a hack: newgrp docker
                sh 'newgrp docker'
                sh 'echo now I am $(id)'
                sh 'newgrp docker && make && newgrp jenkins'
                // get back to primary jenkins group
                sh 'newgrp jenkins'
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