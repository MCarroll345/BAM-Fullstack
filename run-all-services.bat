@echo off
echo Starting all three microservices...

start "Customer Service (Port 8080)" cmd /k "cd /d "CICD-Project" && mvnw spring-boot:run"
start "Bank Service (Port 8081)" cmd /k "cd /d "CICD-Project-Bank" && mvnw spring-boot:run"
start "Receipt Service (Port 8082)" cmd /k "cd /d "CICD-Project-Trnsfr" && mvnw spring-boot:run"

echo All services are starting in separate windows...
echo Customer Service: http://localhost:8080
echo Bank Service: http://localhost:8081
echo Receipt Service: http://localhost:8082
pause