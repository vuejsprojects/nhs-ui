# Dockerfile for NHS-UI

# Use an official Python runtime as a parent image
FROM python:3.6-slim

# Set the working directory to /app
WORKDIR /app

# Copy the ui build in the container at /app
COPY ./dist /app/nhs-ui


# NHS-UI built distribution
ENV NHS_UI_DIST="nhs-ui"
