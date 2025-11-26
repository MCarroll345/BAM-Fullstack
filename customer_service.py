from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import requests

app = FastAPI(title="Customer Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Customer(BaseModel):
    id: Optional[int] = None
    name: str
    username: str
    password: str
    age: int
    email: str
    phonenm: str
    address: str

customers = []

@app.get("/customers")
def get_customers():
    return customers

@app.post("/customer/createCustomer")
def create_customer(customer: Customer):
    # Check if username already exists
    for existing in customers:
        if existing.username == customer.username:
            raise HTTPException(status_code=400, detail="Username already taken")
    
    customer.id = len(customers) + 1
    customers.append(customer)
    
    # Create bank account
    try:
        requests.post("http://localhost:8081/accounts", json={
            "customer_id": customer.id,
            "balance": 0.0,
            "account_number": f"ACC{customer.id:06d}"
        })
    except:
        pass  # Bank service might not be running
    
    return 1

@app.get("/customer/login/{username}/{password}")
def login_customer(username: str, password: str):
    for customer in customers:
        if customer.username == username and customer.password == password:
            # Get account info
            try:
                account_response = requests.get(f"http://localhost:8081/accounts/{customer.id}")
                account_data = account_response.json() if account_response.status_code == 200 else {}
            except:
                account_data = {"balance": 0.0, "account_number": f"ACC{customer.id:06d}"}
            
            return [customer.dict(), account_data]
    
    raise HTTPException(status_code=401, detail="Invalid credentials")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)