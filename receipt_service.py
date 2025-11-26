from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(title="Receipt Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Receipt(BaseModel):
    id: Optional[int] = None
    customer_id: int
    amount: float
    transaction_type: str
    timestamp: str

receipts = []

@app.get("/receipts")
def get_receipts():
    return receipts

@app.post("/receipts")
def create_receipt(receipt: Receipt):
    receipt.id = len(receipts) + 1
    receipts.append(receipt)
    return {"message": "Receipt created", "receipt": receipt}

@app.get("/receipts/{customer_id}")
def get_receipts_by_customer(customer_id: int):
    customer_receipts = [r for r in receipts if r.customer_id == customer_id]
    return customer_receipts

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8082)