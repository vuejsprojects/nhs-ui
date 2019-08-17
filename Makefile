# 
# This Makfile build the nhs-server-app image, tags it and pushes to local docker repos
#
NAME   := pjmd-ubuntu:5001/nhs-ui
TAG    := $$(git describe)
IMG    := ${NAME}:${TAG}
LATEST := ${NAME}:latest
 
build:
	@docker build -t ${IMG} --build-arg GIT_VERSION=$(git describe) .
	@docker tag ${IMG} ${LATEST}
 
push:
	@docker push pjmd-ubuntu:5001/${NAME}
 
# login:
#   @docker log -u ${DOCKER_USER} -p ${DOCKER_PASS}