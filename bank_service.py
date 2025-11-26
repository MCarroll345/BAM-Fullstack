from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(title="Bank Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BankAccount(BaseModel):
    id: Optional[int] = None
    customer_id: int
    balance: float = 0.0
    account_number: str

accounts = []

@app.get("/accounts")
def get_accounts():
    return accounts

@app.post("/accounts")
def create_account(account: BankAccount):
    account.id = len(accounts) + 1
    accounts.append(account)
    return {"message": "Account created", "account": account}

@app.get("/accounts/{customer_id}")
def get_account_by_customer(customer_id: int):
    for account in accounts:
        if account.customer_id == customer_id:
            return account
    return {"error": "Account not found"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8081)