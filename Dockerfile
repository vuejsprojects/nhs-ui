# Dockerfile for NHS-UI

# Use an official Python runtime as a parent image
FROM python:3.6-slim

# labeling this build with the version of the web app passed as argument in the docker build command
#  docker build -t nhs-ui --build-arg GIT_VERSION=$(git describe) .
#
# See Makfile
#
ARG GIT_VERSION=unspecified
LABEL git_version=$GIT_VERSION

# Set the working directory to /app
WORKDIR /app

# Copy the ui build in the container at /app
COPY ./dist /app/nhs-ui


# NHS-UI built distribution
ENV NHS_UI_DIST="nhs-ui"
