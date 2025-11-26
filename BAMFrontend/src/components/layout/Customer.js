import React, { useState } from 'react';
import classes from './Customer.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper } from '@mui/material';
import Button from '../generic/Button';

export default function Customer() {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phonenm, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleClick=(e)=>{
    e.preventDefault()
    const customer={name, username, password, age, email, address,phonenm}
    console.log(customer)
    fetch("http://localhost:8080/customer/createCustomer",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(customer)
  }).then(()=>{
    console.log("New Customer Created")
  }) }
  
  return (
    <Box
      component="form"
      className={classes.formContainer}
      noValidate
      autoComplete="off"
    >
      <Container className={classes.container}>
        <Paper elevation={3} className={classes.paper}>
          <h1>Create Account</h1>
          <Box className={classes.fieldsContainer}>
          <TextField
              id="password"
              label="Password"
              type="password"
              variant="standard"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
             <TextField
              id="address"
              label="Address"
              variant="standard"
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
              
          <TextField
              id="name"
              label="Full Name"
              variant="standard"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
         <TextField
              id="phonenm"
              label="Phone Number"
              variant="standard"
              fullWidth
              value={phonenm}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              id="email"
              label="Email"
              variant="standard"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
    
             <TextField
              id="age"
              label="Age"
              variant="standard"
              fullWidth
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
           <TextField
              id="username"
              label="Username"
              variant="standard"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
<Button text1="Submit" onClickHandler={handleClick} />

          </Box>
          <p>
           
          </p>
          <p>
       
          </p>
        </Paper>
      </Container>
    </Box>
  );
}