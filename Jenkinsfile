def zip_file = 'nhs-ui-version.zip'
def is_release = true

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
        // stage('Clean up') { /* clean up our workspace. PB: just deleted git clone!! */
        //     steps {
        //         step([$class: 'WsCleanup'])
        //     }
        // }
        stage('Build') {
            steps {
                sh 'echo Type of build: $x_github_event'
                sh 'echo Action of build: $param_action'
                sh 'echo if release, release tag is : $param_tag'
                script {
                    if  (x_github_event=="release" && param_tag!=null) {
                        echo "Release - Checking out $param_tag is_release=$is_release"
                        git fetch
                        git checkout $param_tag
                    }
                    else {
                        is_release=false
                        echo "Just a push, checking out latest. is_release=$is_release"
                    }
                }
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
                sh 'git fetch'
                script {
                    zip_file = sh(returnStdout: true, script: 'printf "nhs-ui-$(git describe --tag).zip"')
                }
                sh "echo Zipping dist: ${zip_file}"
                zip zipFile: "${zip_file}", archive: true, dir: 'dist'
                archiveArtifacts artifacts: "${zip_file}", fingerprint: true
                // script {
                //     def uploadSpec = """{
                //         "files": [
                //             {
                //             "pattern": "*${zip_file}*",
                //             "target": "Jenkins-Integration"
                //             }
                //         ]
                //     }"""
                //     server.upload spec: uploadSpec, buildInfo: buildInfo
                // }
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
        success {
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