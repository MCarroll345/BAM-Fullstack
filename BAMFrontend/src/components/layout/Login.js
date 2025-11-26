import React, { useState } from 'react';
import classes from './Login.module.css';
import { Box, Container, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Button from '../generic/Button';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [customerData, setCustomerData] = useState(null);

  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://localhost:8080/customer/login/${username}/${password}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      const data = await response.json();
      console.log('Received customer and account data:', data);

      const customer = data[0];
      const account = data[1];

      const combinedData = { ...customer, ...account };

      setCustomerData(combinedData);
      setErrorMessage('');

      // Store the customer data in localStorage for persistence
      localStorage.setItem('customerData', JSON.stringify(combinedData));

      // Redirect to account page after successful login
      navigate('/account'); 

    } catch (error) {
      setErrorMessage(error.message);
      setCustomerData(null);
    }
  };



  return (
    <Container>
      {!customerData ? (
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h5" component="h2" align="center" gutterBottom>
            Login
          </Typography>
          <Box className={classes.formContainer}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage && (
              <Typography color="error" variant="body2">
                {errorMessage}
              </Typography>
            )}
            <Button
              text1="Login"
              onClickHandler={handleLogin}
            />
          </Box>
        </Paper>
      ) : null}
    </Container>
  );
}