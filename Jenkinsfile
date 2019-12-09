def zip_file = 'nhs-ui-version.zip'

pipeline {

    // to allow freestype job to copy artifacts
    //options {
    //    copyArtifactPermission('nhs-ui-to-artifactory');
    //}

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
            args ' -u jenkins \
            -e "HOME=/var/lib/jenkins/workspace" \
            -v /var/run/docker.sock:/var/run/docker.sock \
            -v /var/lib/jenkins/workspace:/var/lib/jenkins/workspace \
            -p 3000:3000 -p 5000:5000' 
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Clean up') {
            steps {
                step([$class: 'WsCleanup'])
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        // stage('Test') {
        //     steps {
        //         sh 'echo npm run test:unit'
        //     }
        // }
        // stage('Deliver for development') {
        //     when {
        //         branch 'br_bootstrap'
        //     }
        //     steps {
        //         sh './jenkins/deliver-for-development.sh'
        //         input message: 'Finished using the web site? (Click "Proceed" to continue)'
        //         sh './jenkins/kill.sh'
        //     }
        // }
        // stage('Build docker image') {
        //     when {
        //         branch 'br_bootstrap'
        //     }
        //     steps {
        //         sh 'echo I am $(id)'
        //         // The docker image is built from the docker file and specifies
        //         // the proper group name and id for jenkins and docker
        //         // args -u jenkins istead of id:gid makes it possible to run
        //         // docker with jenkins user belonging to group docker
        //         sh 'make'
        //     }
        // }
        stage('Zip distribution build') {
            when {
                branch 'br_bootstrap'
            }
            steps {
                script {
                    zip_file = sh(returnStdout: true, script: 'echo "nhs-ui-$(git describe --tag).zip"')
                }
                sh "echo Zipping dist: ${zip_file}"
                zip zipFile: "${zip_file}", archive: true, dir: 'dist'
                archiveArtifacts artifacts: "${zip_file}", fingerprint: true
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
    post {
        always {
            deleteDir() /* clean up our workspace */
            // archiveArtifacts artifacts: 'dist/**/*.*', onlyIfSuccessful: true
        }
        // failure {
        //     mail to: 'team@example.com',
        //         subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
        //         body: "Something is wrong with ${env.BUILD_URL}"
        // }
    }
}