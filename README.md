# DevOps Capstone Project

## End-to-End CI/CD Pipeline for Node.js Application

## Project Description

This project demonstrates a complete end-to-end DevOps pipeline for a Node.js web application deployed on AWS EC2.

The system automates build, test, Docker image creation, deployment, monitoring, and maintenance using modern DevOps tools including Jenkins, Docker, Prometheus, and Grafana.

---

## Tech Stack

* Git & GitHub
* Jenkins (CI/CD)
* Docker & Docker Hub
* AWS EC2 (Ubuntu 22.04)
* Prometheus & Grafana
* Bash & Cron (Automation)

---

## Setup Instructions (Run Locally)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/pranitha-prani/devops-capstone-app.git
cd devops-capstone-app
```

### 2️⃣ Run Using Node.js

```bash
npm install
node app.js
```

**Application runs at:**
[http://localhost:3000](http://localhost:3000)

---

### 3️⃣ Run Using Docker

```bash
docker build -t devops-capstone-app .
docker run -p 3000:3000 devops-capstone-app
```

**Application runs at:**
[http://localhost:3000](http://localhost:3000)

---

## 🔄 CI/CD Flow (Brief Explanation)

1. Developer pushes code to GitHub
2. GitHub webhook automatically triggers Jenkins
3. Jenkins pipeline:

   * Installs dependencies
   * Runs tests
   * Builds Docker image
   * Pushes image to Docker Hub
   * Deploys container to AWS EC2 via SSH
4. Health check validates deployment
5. Prometheus collects server metrics
6. Grafana visualizes CPU, memory, disk, and uptime
7. Cron jobs automate daily backups and weekly cleanup

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
* Automated backup & cleanup using Cron

---

**Author:** Pranitha
**Project:** DevOps Capstone – March 2026


