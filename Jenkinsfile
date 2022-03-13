pipeline {
    environment {
        registry = 'dboullon/simple-nodejs-user-management-with-mongodb'
        registryCredential = 'dockerhub-personal-account'
        dockerImage = ''
    }
    agent any
    stages {
        stage('Cloning our Git') {
            steps {
                git 'https://github.com/DrCoffee84/simple-nodejs-user-management-with-mongodb.git'
            }
        }
        stage('Building our image') {
            steps {
                script {
                    dockerImage = docker.build registry + ":$BUILD_NUMBER"
                }
            }
        }
        stage('Deploy our image') {
            steps {
                script {
                    docker.withRegistry('registry.hub.docker.com' , registryCredential) {
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Cleaning up') {
            steps {
                sh "docker rmi $registry:$BUILD_NUMBER"
            }
        }
    }
}
