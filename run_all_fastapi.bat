@echo off
echo Installing dependencies...
pip install -r requirements.txt

echo Starting all FastAPI services...
start "Customer Service (Port 8080)" cmd /k "python customer_service.py"
start "Bank Service (Port 8081)" cmd /k "python bank_service.py"
start "Receipt Service (Port 8082)" cmd /k "python receipt_service.py"

echo All services started!
echo Customer Service: http://localhost:8080/docs
echo Bank Service: http://localhost:8081/docs
echo Receipt Service: http://localhost:8082/docs
pause