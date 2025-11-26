# BAM Banking Application

## Quick Start

### Option 1: Automated Setup (Windows)
1. Double-click `run_all_fastapi.bat`
2. Open new terminal and run:
   ```
   cd BAMFrontend
   npm install
   npm start
   ```

### Option 2: Manual Setup

#### Backend Services
```bash
# Install Python dependencies
pip install -r requirements.txt

# Start services (3 separate terminals)
python customer_service.py
python bank_service.py
python receipt_service.py
```

#### Frontend
```bash
cd BAMFrontend
npm install
npm start
```

## Access Points
- **Frontend**: http://localhost:3000
- **Customer API**: http://localhost:8080/docs
- **Bank API**: http://localhost:8081/docs  
- **Receipt API**: http://localhost:8082/docs

## Services
- **Port 8080**: Customer Service
- **Port 8081**: Bank Service
- **Port 8082**: Receipt Service
- **Port 3000**: React Frontend