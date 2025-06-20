@echo off
set IMAGE_NAME=learnsphere-frontend
set DOCKER_USERNAME=pravinsonwane

echo 🧱 Installing & Building Vite app...
npm install
npm run build

echo 🐳 Building Docker image...
docker build -t %DOCKER_USERNAME%/%IMAGE_NAME% .

IF %ERRORLEVEL% NEQ 0 (
    echo ❌ Docker build failed. Exiting...
    exit /b %ERRORLEVEL%
)

echo 🔐 Logging in to Docker Hub...
docker login

echo 🚀 Pushing image to Docker Hub...
docker push %DOCKER_USERNAME%/%IMAGE_NAME%

echo ▶️ Running container on port 3000...
docker run -p 3000:80 %DOCKER_USERNAME%/%IMAGE_NAME%
