import { Typography, Grid, Paper} from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <>
      <Typography align="center" component="h1" variant="h1" sx={{ mb:6, textTransform: 'uppercase'}}>
        welcome to the admin App Dashboard
      </Typography>
      <Grid container spacing={2} justifyContent='center' >
        <Grid item xs={9} sm={3} md={3}>
        <Link to="/list-packages" style={{ textDecoration: 'none' }}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgb(112,194, 197)',
              '&:hover': {
                backgroundColor: 'rgb(92,174,177)',
              },
            }}
          >
            <Typography align="center" component="p" variant="h6" color='white'>
              List Packages
            </Typography>
          </Paper>
        </Link>
        </Grid>
        <Grid item xs={9} sm={3} md={3}>
        <Link to="/list-deliveries" style={{ textDecoration: 'none' }}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgb(240,157, 63)',
              '&:hover': {
                backgroundColor: 'rgb(220,137,43)',
              },
            }}
          >
            <Typography align="center" component="p" variant="h6" color='white'>
              List Deliveries
            </Typography>
          </Paper>
        </Link>
        </Grid>
        <Grid item xs={9} sm={3} md={3}>
          <Link to="/create-package" style={{ textDecoration: 'none' }}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgb(112,194, 197)',
                '&:hover': {
                  backgroundColor: 'rgb(92,174,177)',
                },
              }}
            >
              <Typography align="center" component="p" variant="h6" color='white'>
                Create Package
              </Typography>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={9} sm={3} md={3}>
          <Link to="/create-delivery" style={{ textDecoration: 'none' }}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgb(240,157, 63)',
                '&:hover': {
                  backgroundColor: 'rgb(220,137,43)',
                },
              }}
            >
              <Typography align="center" component="p" variant="h6" color='white'>
                Create Delivery
              </Typography>
            </Paper>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;