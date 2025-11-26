import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import BAMLogo from '../assets/BAMLogo.png';

import { useNavigate } from 'react-router-dom';

export default function Appbar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* BAM Logo as a Button */}
          <Button 
            onClick={() => navigate('/')} 
            sx={{ p: 0, minWidth: 'auto', mr: 2 }} // Remove default padding and spacing
          >
            <img 
              src={BAMLogo} 
              alt="BAM Logo" 
              style={{ width: '180px', marginBottom: '0px' }} 
            />
          </Button>
          
          {/* Title */}
          <Typography 
            variant="h3" 
            component="div"
            align="center" 
            sx={{ 
              flexGrow: 1, 
              fontSize: '3rem' 
            }}
          >
            BAM Banking
          </Typography>
          
          {/* Login Button */}
          <Button
            color="inherit"
            onClick={() => navigate('/login')}
            sx={{ marginRight: 2 }}
          >
            Login
          </Button>
          
          {/* Create Account Button */}
          <Button
            color="inherit"
            onClick={() => navigate('/newAccount')}
            sx={{ marginLeft: 2 }}
          >
            Create Account
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
