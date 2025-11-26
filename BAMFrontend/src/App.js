import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Appbar from './components/Appbar';
import Login from './components/Login';
import Customer from './components/Customer';
import Account from './components/Account';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Appbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/newAccount" element={<Customer />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;

