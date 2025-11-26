import React from 'react'
import classes from './Home.module.css'
import { Container, Box, Typography, Grid, Card, CardContent, Link } from '@mui/material'
import Button from '../generic/Button'

function Home() {
  return (
    <div className={classes.pageContainer}>
    <Container maxWidth="lg" className={classes.content}>
      {/* Hero Section */}
      <Box className={classes.heroSection}>
        <Typography variant="h3" gutterBottom>
          Welcome to BAMBanking
        </Typography>
        <Typography variant="h6" gutterBottom>
          Your trusted partner for secure and reliable banking services.
        </Typography>
        <Button 
          text1="Open an Account"
          onClickHandler={() => window.location.href = '/newAccount'}
        />
      </Box>

      {/* Features Section */}
      <Box className={classes.featuresSection}>
        <Typography variant="h4" align="center" gutterBottom>
          Why Choose Us?
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card className={classes.featureCard}>
              <CardContent>
                <Typography variant="h6">Secure Banking</Typography>
                <Typography>
                  Advanced encryption to keep your transactions safe.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className={classes.featureCard}>
              <CardContent>
                <Typography variant="h6">24/7 Customer Support</Typography>
                <Typography>
                  We are here to assist you anytime, anywhere.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className={classes.featureCard}>
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
      <Box className={classes.quickLinksSection}>
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

    </Container>
    {/* Footer */}
    <Box className={classes.footer}>
      <Typography variant="body2">© 2024 TrustBank. All rights reserved.</Typography>
    </Box>
    </div>
  );
}

export default Home;


