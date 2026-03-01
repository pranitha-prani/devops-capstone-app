**DevOps Capstone Project**

### End-to-End CI/CD Pipeline for Node.js Application

## Overview

This project demonstrates a complete DevOps pipeline for a Node.js web application deployed on AWS.

The pipeline automates build, test, Docker image creation, deployment to EC2, monitoring, and maintenance using modern DevOps tools.

---

## Tech Stack

* Git & GitHub
* Jenkins (CI/CD)
* Docker & Docker Hub
* AWS EC2 (Ubuntu)
* Prometheus & Grafana
* Bash & Cron (Automation)

---

## 🔄 CI/CD Workflow

1. Developer pushes code to GitHub
2. GitHub webhook triggers Jenkins
3. Jenkins:

   * Installs dependencies
   * Runs tests
   * Builds Docker image
   * Pushes to Docker Hub
   * Deploys to AWS EC2 via SSH
4. Prometheus monitors the server
5. Grafana visualizes metrics

---

## Live URLs

**Application:**
[http://54.179.78.242:3000](http://54.179.78.242:3000)

**Health Check:**
[http://54.179.78.242:3000/health](http://54.179.78.242:3000/health)

**GitHub Repository:**
[https://github.com/pranitha-prani/devops-capstone-app](https://github.com/pranitha-prani/devops-capstone-app)

**Docker Hub Image:**
[https://hub.docker.com/r/pranithaprabhakar/devops-capstone-app](https://hub.docker.com/r/pranithaprabhakar/devops-capstone-app)

---

## 🎯 Key Features

* Fully automated CI/CD pipeline
* Dockerized deployment
* Separate Jenkins & App EC2 servers
* Health check validation
* Monitoring with Prometheus & Grafana
* Automated backups using Cron

---

**Author:** Pranitha
**Project:** DevOps Capstone – March 2026

