import React, { useState, useEffect } from 'react';
import { Container, Paper, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const [customerData, setCustomerData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transferIban, setTransferIban] = useState('');
  const [updateField, setUpdateField] = useState('');
  const [newFieldValue, setNewFieldValue] = useState('');
  const [receipts, setReceipts] = useState([]); // State for storing receipts

  const navigate = useNavigate();

  useEffect(() => {
    const storedCustomerData = localStorage.getItem('customerData');
    if (storedCustomerData) {
      setCustomerData(JSON.parse(storedCustomerData));
    } else {
      setErrorMessage('No customer data found.');
    }
  }, []);

  const handleFieldUpdate = async (field) => {
    if (!customerData) {
      setErrorMessage('Customer data is not loaded.');
      return;
    }

    if (!newFieldValue) {
      setErrorMessage('Please provide a new value for the field.');
      return;
    }

    const endpoints = {
      address: `http://localhost:8080/customer/updateAddress/${customerData.id}/${newFieldValue}`,
      email: `http://localhost:8080/customer/updateEmail/${customerData.id}/${newFieldValue}`,
      phone: `http://localhost:8080/customer/updatePhonenm/${customerData.id}/${newFieldValue}`,
    };

    try {
      const response = await fetch(endpoints[field], { method: 'PUT' });

      if (!response.ok) {
        throw new Error('Update failed.');
      }

      const updatedData = {
        ...customerData,
        [field === 'phone' ? 'phonenm' : field]: newFieldValue,
      };

      setCustomerData(updatedData);
      localStorage.setItem('customerData', JSON.stringify(updatedData));
      setUpdateField('');
      setNewFieldValue('');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleGetReceipts = async () => {
    if (!customerData) {
      setErrorMessage('Customer data is not loaded.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8082/receipt/getRec/${customerData.iban}`);
      if (!response.ok) {
        throw new Error('Failed to fetch receipts');
      }

      const data = await response.json();
      setReceipts(data.slice(0, 5)); // Display only the last 5 receipts
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleTransaction = async (transactionType) => {
    if (!customerData) {
      setErrorMessage('Customer data is not loaded.');
      return;
    }

    if (transactionAmount <= 0) {
      setErrorMessage(`${transactionType} amount must be greater than zero`);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/customer/withDep/${customerData.iban}/${transactionType}/${transactionAmount}`,
        { method: 'PUT' }
      );

      if (!response.ok) {
        throw new Error(`Failed to ${transactionType} funds`);
      }

      const updatedBalance = transactionType === 'deposit'
        ? customerData.balance + transactionAmount
        : customerData.balance - transactionAmount;

      const updatedData = { ...customerData, balance: updatedBalance };
      setCustomerData(updatedData);
      localStorage.setItem('customerData', JSON.stringify(updatedData));
      setTransactionAmount(0);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleTransfer = async () => {
    if (!customerData) {
      setErrorMessage('Customer data is not loaded.');
      return;
    }

    if (transactionAmount <= 0) {
      setErrorMessage('Transfer amount must be greater than zero');
      return;
    }

    if (transactionAmount > customerData.balance) {
      setErrorMessage('Insufficient balance for transfer');
      return;
    }

    if (!transferIban) {
      setErrorMessage('Please provide a valid IBAN');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/customer/transfer/${customerData.iban}/${transferIban}/${transactionAmount}`,
        { method: 'PUT' }
      );

      if (!response.ok) {
        throw new Error('Transfer failed');
      }

      const updatedBalance = customerData.balance - transactionAmount;
      const updatedData = { ...customerData, balance: updatedBalance };
      setCustomerData(updatedData);
      localStorage.setItem('customerData', JSON.stringify(updatedData));
      setTransactionAmount(0);
      setTransferIban('');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  const handleDeleteAccount = async () => {
    if (!customerData) {
      setErrorMessage('Customer data is not loaded.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/customer/deleteAcc/${customerData.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Account deletion failed.');
      }

      // Clear customer data and navigate to login
      localStorage.removeItem('customerData');
      setCustomerData(null);
      setErrorMessage('');
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };


  const handleLogout = () => {
    localStorage.removeItem('customerData');
    setCustomerData(null);
    navigate('/login');
  };

  const paperStyle = {
    padding: '30px',
    width: 400,
    margin: '50px auto',
  };

  if (!customerData) {
    return (
      <Container>
        <Typography variant="h6" gutterBottom>
          Loading Customer Data...
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <Typography variant="h6" gutterBottom>
         <strong> Customer Details</strong>
        </Typography>
        <Typography variant="body1">
          <strong>Name:</strong> {customerData.name}
        </Typography>
        <Typography variant="body1">
          <strong>Username:</strong> {customerData.username}
        </Typography>
        <Typography variant="body1">
          <strong>Age:</strong> {customerData.age}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {customerData.email}
        </Typography>
        <Typography variant="body1">
          <strong>Phone Number:</strong> {customerData.phonenm}
        </Typography>
        <Typography variant="body1">
          <strong>Address:</strong> {customerData.address}
        </Typography>

        {/* Update Field Buttons */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: '20px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setUpdateField('address')}
          >
            Update Address
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setUpdateField('email')}
          >
            Update Email
          </Button>
          <Button sx={{ marginBottom: '20px' }}
            variant="contained"
            color="primary"
            onClick={() => setUpdateField('phone')}
          >
            Update Phone Number
          </Button>
        </Box>

        {/* Input for Updating Field */}
        {updateField && (
          <>
            <TextField
              label={`New ${updateField.charAt(0).toUpperCase() + updateField.slice(1)}`}
              fullWidth
              value={newFieldValue}
              onChange={(e) => setNewFieldValue(e.target.value)}
              margin="normal"
            />
            <Button
              variant="contained"
              color="success"
              onClick={() => handleFieldUpdate(updateField)}
              fullWidth
              style={{ marginTop: '10px', marginBottom: '40px' }}
            >
              Confirm Update
            </Button>
          </>
        )}

        <Typography variant="h6" gutterBottom>
         <strong>Account Details</strong>
        </Typography>
        <Typography variant="body1">
          <strong>Balance:</strong> ${customerData.balance}
        </Typography>
        <Typography variant="body1">
          <strong>IBAN:</strong> {customerData.iban}
        </Typography>

        {/* Transaction Input */}
        <TextField
          label="Amount"
          type="number"
          fullWidth
          value={transactionAmount}
          onChange={(e) => setTransactionAmount(Number(e.target.value))}
          margin="normal"
        />
        <TextField
          label="Recipient IBAN"
          fullWidth
          value={transferIban}
          onChange={(e) => setTransferIban(e.target.value)}
          margin="normal"
        />
        <Box sx={{ display: 'flex', gap: 2, marginTop: '10px' }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleTransaction('deposit')}
            fullWidth
          >
            Deposit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleTransaction('withdraw')}
            fullWidth
          >
            Withdraw
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleTransfer}
            fullWidth
          >
            Transfer
          </Button>
        </Box>

        {/* Get Receipts Button */}
        <Button
  variant="contained"
  onClick={handleGetReceipts}
  fullWidth
  style={{ backgroundColor: '#616161', color: 'white', marginTop: '20px' }}
>
  Get Receipts
</Button>
      

{/* Display Receipts */}
{receipts.length > 0 && (
  <Box style={{ marginTop: '20px' }}>
    <Typography variant="h6" gutterBottom>
      Recent Receipts
    </Typography>
    {receipts.map((receipt, index) => (
      <Box 
        key={index} 
        style={{
          backgroundColor: '#f9f9f9', 
          borderRadius: '8px', 
          padding: '10px', 
          marginBottom: '10px'
        }}
      >
        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
          Receipt #{index + 1}
        </Typography>
        <Typography variant="body2">
          <strong>Account IBAN 1:</strong> {receipt.accountIBAN1}
        </Typography>
        <Typography variant="body2">
          <strong>Account IBAN 2:</strong> {receipt.accountIBAN2}
        </Typography>
        <Typography variant="body2">
          <strong>Balance Change:</strong> {receipt.balChange > 0 ? `+${receipt.balChange}` : receipt.balChange}
        </Typography>
        <Typography variant="body2">
          <strong>Receipt ID:</strong> {receipt.id}
        </Typography>
      </Box>
    ))}
  </Box>
)}{/* Delete Account Button */}
<Button
  variant="contained"
  color="error"
  onClick={handleDeleteAccount}
  fullWidth
  style={{ marginTop: '20px' }}
>
  Delete Account
</Button>

        {/* Log Out Button */}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          fullWidth
          style={{ marginTop: '20px' }}
        >
          Log Out
        </Button>

        {/* Error Message Display */}
        {errorMessage && (
          <Typography color="error" variant="body2" style={{ marginTop: '10px' }}>
            {errorMessage}
          </Typography>
        )}
      </Paper>
    </Container>
  );
}
