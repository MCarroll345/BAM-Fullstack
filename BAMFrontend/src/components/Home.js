import React from 'react';
import { Container, Box, Typography, Button, Grid, Card, CardContent, Link } from '@mui/material';

function Home() {
  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          backgroundColor: 'primary.main',
          color: 'white',
          py: 6,
          borderRadius: 6,
          mb: 4,
          marginTop: '10px'
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to BAMBanking
        </Typography>
        <Typography variant="h6" gutterBottom>
          Your trusted partner for secure and reliable banking services.
        </Typography>
        <Button 
          variant="contained" 
          color="success" 
          onClick={() => window.location.href = '/newAccount'}
        >
          Open an Account
        </Button>
      </Box>

      {/* Features Section */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Why Choose Us?
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center' }}>
              <CardContent>
                <Typography variant="h6">Secure Banking</Typography>
                <Typography>
                  Advanced encryption to keep your transactions safe.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center' }}>
              <CardContent>
                <Typography variant="h6">24/7 Customer Support</Typography>
                <Typography>
                  We are here to assist you anytime, anywhere.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center' }}>
              <CardContent>
                <Typography variant="h6">Easy Transfers</Typography>
                <Typography>
                  Instant fund transfers with a single click.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Quick Links */}
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Quick Links
        </Typography>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Link href="/login" variant="body1" underline="hover">
              Login
            </Link>
          </Grid>
          <Grid item>
            <Link href="/newAccount" variant="body1" underline="hover">
              Open Account
            </Link>
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <Box sx={{ mt: 4, py: 2, textAlign: 'center', backgroundColor: '#f5f5f5', borderRadius: 2 }}>
        <Typography variant="body2">© 2024 TrustBank. All rights reserved.</Typography>
      </Box>
    </Container>
  );
}

export default Home;


