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
        // Building an image on the fly: I need a image base on node that can run npm,
        // docker command (docker in docker) as well as git: see Dokcker-jenkins file.
        // This why we mount /var/run/docker.sock
        // 
        // dockerfile { ... } is equivalent to 
        // "docker build -f Dockerfile-jenkins --build-arg version=1.0.2 ./image-build/
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
    //
    // The GitHub webhook plugin doesn't trigger jobs for a Release event albeit it works
    // fine for a Push event.
    // Gotchas: the GitHub webhook url must end with /
    // As a conquence I decided to use the Generic Webhook plugin which works fine with
    // any GitHub event.
    // Gotchas: the Generic Webhook Trigger plugin url MUST end with ?token=<user defined token>
    // While configuring a simple pipeline is "easy" and can be done wih the Jenkins UI
    // a multibranch pipeline requires the configuration to be done in the Jenkins file.
    // Hence this "triggers section"
    // The variables values are based on what GitHub's post is made of.
    // For these parameters to be set for the job, the build has to run once and therefore
    // one has to run it manually then it can be triggered by the hook (see Settings
    // on the GiHub repo).
    // Once the job run, one can check its job configuration in View Configuration under 
    // the job (in my case branch name).
    //
    // ref: https://wiki.jenkins.io/display/JENKINS/Generic+Webhook+Trigger+Plugin
    //
    triggers {
        GenericTrigger(
        genericVariables: [
        [key: 'ref', value: '$.ref'],
        [key: 'param_repo', value: '$.repository.fullname'],
        [key: 'param_action', value: '$.action'],
        [key: 'param_tag', value: '$.release.tag_name'],
        [key: 'param_branch', value: '$.release.target_commitish']
        ],

        genericHeaderVariables: [
        [key: 'x-github-event', regexpFilter: '']
        ],

        genericRequestVariables: [
        [key: 'token', regexpFilter: '']
        ],
        
        causeString: 'Triggered on $param_action',
        
        token: 'wtf_nhs_ui',
        
        printContributedVariables: true,
        printPostContent: true,
        
        silentResponse: false,
        
        // Optional Filter: 
        // Goal: if $repo == regex the job is triggered
        // BRANCH_NAME I guess is a property defined by Jenkins
        // Obviously in my case BRANCH_NAME should be TAG_NAME
        // regexpFilterText: '$repo',
        // regexpFilterExpression: 'vuejsprojects/' + BRANCH_NAME
        )
    }

    environment {
        CI = 'true'
    }
    stages {
        // The following stage cleans up the workspace. 
        // Not ood for me because it happens after git clone and just deletes all the files!!
        // stage('Clean up') { /*  */
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
                        sh 'git fetch'
                        sh 'git checkout $param_tag'
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
        //         sh 'echo I am $(id)' /* id is the unix user id */
        //         // The docker image is built from the docker file and specifies
        //         // the proper group name and id for jenkins and docker
        //         // One should soecify args -u jenkins instead of id:gid 
        //         // to make it possible to run docker with jenkins user belonging
        //         // to the proper group docker. Otherwise even though the user was
        //         // configured with docker group, docker doesn't show as one of the
        //         // user's group.
        //         sh 'make'
        //     }
        // }
        stage('Zip distribution build') {
            when {
                branch 'br_bootstrap'
            }
            steps {
                sh 'git fetch'
                // building the zipfile name based on the tag we checkout
                // to be absolutely correct we should use the variable
                // $param_tag  instead of "git describe --tag" because somebody
                // may have created a release just in the meantime  
                script {
                    // zip_file = sh(returnStdout: true, script: 'printf "nhs-ui-$(git describe --tag).zip"')
                    zip_file = sh(returnStdout: true, script: 'printf "nhs-ui-$param_tag.zip"')
                }
                // zipping the distribution to archive it in jenkins/jobs/.../builds/<build_num>/archive
                sh "echo Zipping dist: ${zip_file}"

                zip zipFile: "${zip_file}", archive: true, dir: 'dist'
                archiveArtifacts artifacts: "${zip_file}", fingerprint: true
                // Job nhs-ui-to-artifactory is allowed to copy archived atrtifacts from nhs-ui
                // nhs-ui-to-artifactory is automatically triggered after a successful nhs-ui build and
                // will then store the artifact in the artifactory but
                // we can also store in the artifactory direcly from this job as specified below:
                // ref: https://www.jfrog.com/confluence/display/RTF/Declarative+Pipeline+Syntax
                rtUpload (
                    serverId: 'artifactory-oss-6.12.2',
                    spec: """{
                        "files": [
                            {
                            "pattern": "${zip_file}",
                            "target": "Jenkins-Integration/dist/"
                            }
                        ]
                    }"""
                )
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
    // When the build is done, delete the workspace if successfull othewise send an email
    post {
        success {
            deleteDir() /* clean up our workspace */
        }
        // failure {
        //     mail to: 'alert@ptech.com',
        //         subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
        //         body: "Something is wrong with ${env.BUILD_URL}"
        // }
    }
}