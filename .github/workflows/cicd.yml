
name: CI/CD Pipeline

on:
  push:
    branches: ["main"]
  workflow_dispatch:

jobs:
  build-and-push:
    name: Build & Push Docker Image
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Log in to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: |
            ${{ secrets.DOCKERHUB_USERNAME }}/affirmations-api-flask:latest
            ${{ secrets.DOCKERHUB_USERNAME }}/affirmations-api-flask:${{ github.sha }}

  deploy:
    name: Deploy to DigitalOcean Kubernetes
    needs: build-and-push
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      # Install DOCTL (binary, NOT snap)
      - name: Install doctl
        run: |
          curl -sL https://github.com/digitalocean/doctl/releases/download/v1.108.0/doctl-1.108.0-linux-amd64.tar.gz -o doctl.tar.gz
          tar -xzf doctl.tar.gz
          sudo mv doctl /usr/local/bin/

      - name: Authenticate doctl
        run: doctl auth init -t "${{ secrets.DIGITALOCEAN_ACCESS_TOKEN }}"

      - name: Fetch kubeconfig for DigitalOcean cluster
        run: doctl kubernetes cluster kubeconfig save eli-k8s

      - name: Deploy new image version to Kubernetes
        run: |
          kubectl set image deployment/affirmations-api affirmations-api=${{ secrets.DOCKERHUB_USERNAME }}/affirmations-api-flask:${{ github.sha }}

      - name: Wait for Kubernetes rollout to complete
        run: kubectl rollout status deployment/affirmations-api --timeout=120s
