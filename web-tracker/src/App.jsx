import { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik';
import { Typography, Button, Grid, Box, List, ListItem, ListItemText, Paper, CssBaseline, CircularProgress, Snackbar, Alert, FormControl, MenuItem, Icon } from '@mui/material';
import { TextField as FormikTextField  } from 'formik-mui';
import * as Yup from 'yup';

import './App.css'
import { getOnePackage } from './services/api.service.js';

import GoogleMap  from './components/Map/Map.component.jsx';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © PackageTracker. '} <br/>
      {'All rights reserved '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const packageValidationSchema = Yup.object().shape({
  package_id: Yup.string()
    .required('Package ID is required')
})

function App() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [socket, setSocket] = useState(null);
  const [pkg, setPackage] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  const initialValues = {
    package_id: ''
  }

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      console.log(values);
      const pkg = await getOnePackage(values.package_id);
      console.log("The package: ", pkg);
      setPackage(pkg.data);
      pkg.data?.activeDelivery ? setCurrentLocation(pkg.data?.activeDelivery.location) : setCurrentLocation(pkg.data?.package.from_location);
      setOpen(true);
      setLoading(false);
    } catch (error) {
      console.error("Fetch Package Error: ", error);
      setLoading(false); 
      setError(error.message);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Connect to the WebSocket server
    const newSocket = new WebSocket('ws://localhost:5000');
    
    newSocket.onopen = () => {
      console.log('WebSocket connection established');
      setSocket(newSocket);

      return () => {
        // Clean up the WebSocket connection
        newSocket.close();
      };
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received message:', data);

      if (data.event === 'delivery_updated') {
        console.log('delivery_updated:', data.delivery);
        //setPackage(data.delivery);
        setCurrentLocation(data.delivery.location);
      }
    };

    newSocket.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    newSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      // Clean up the WebSocket connection when the component unmounts
      newSocket.close();
    };
  }, [pkg]);

  return (
    <>
      <Box
        sx={{
          my: 8,
          mx: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
          Web Tracker Dashboard
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={packageValidationSchema}
          onSubmit={handleSubmit}
        >
        {({ errors, touched }) => (
          <Form noValidate>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <Field
                  component={FormikTextField}
                  name="package_id"
                  type="text"
                  label="Enter Package ID"
                  fullWidth
                  error={touched.package_id  && Boolean(errors.package_id )}
                  helperText={touched.package_id  && errors.package_id }
                />
              </Grid>
            </Grid>
            {loading ?
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <CircularProgress size={24} />
              </Box>
            : 
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              track
            </Button>
            }
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Delivery loaded successfully
              </Alert>
            </Snackbar>
            {error && (
              <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError('')}>
                <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
                  {error}
                </Alert>
              </Snackbar>
            )}
            <Copyright sx={{ mt: 5 }} />
          </Form>
        )}
        </Formik>
      </Box>
      {pkg && 
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 2, textAlign: 'left'}} variant="h6" component="h2">
              Package Details
            </Typography>
            <List>
            <ListItem>
              {'ID: '}
              <ListItemText
                primary={pkg?.package._id}
              />
            </ListItem>
            <ListItem>
              {'Active Delivery Id: '}
              <ListItemText
                primary={pkg?.package.active_delivery_id}
              />
            </ListItem>
            <ListItem>
              {'Description: '}
              <ListItemText
                primary={pkg?.package.description}
              />
            </ListItem>
            <ListItem>
              {'Width: '}
              <ListItemText
                primary={pkg?.package.width}
              />
            </ListItem>
            <ListItem>
              {'Weight: '}
              <ListItemText
                primary={pkg?.package.weight}
              />
            </ListItem>
            <ListItem>
              {'Height: '}
              <ListItemText
                primary={pkg?.package.height}
              />
            </ListItem>
            <ListItem>
              {'Depth: '}
              <ListItemText
                primary={pkg?.package.depth}
              />
            </ListItem>
            <ListItem>
              {'Sender: '}
              <ListItemText
                primary={pkg?.package.from_name}
              />
            </ListItem>
            <ListItem>
              {'Receiver: '}
              <ListItemText
                primary={pkg?.package.to_name}
              />
            </ListItem>
            <ListItem>
              {'From Address: '}
              <ListItemText
                primary={pkg?.package.from_address}
              />
            </ListItem>
            <ListItem>
              {'To Address: '}
              <ListItemText
                primary={pkg?.package.to_address}
              />
            </ListItem>
            <ListItem>
              {'From Location: '}
              <ListItemText
                primary={JSON.stringify(pkg?.package.from_location)}
              />
            </ListItem>
            <ListItem>
              {'To Location: '}
              <ListItemText
                primary={JSON.stringify(pkg?.package.to_location)}
              />
            </ListItem>
            <ListItem>
              {'Created at: '}
              <ListItemText
                primary={ new Date(pkg?.package.createdAt).toLocaleString()}
              />
            </ListItem>
            </List>
          </Grid>
          {pkg?.activeDelivery &&
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 2, textAlign: 'left'}} variant="h6" component="h2">
              Delivery Details
            </Typography>
            <List>
              <ListItem>
                {'ID: '}
                <ListItemText
                  primary={pkg?.activeDelivery._id}
                />
              </ListItem>
              <ListItem>
                {'Status: '}
                <ListItemText
                  primary={pkg?.activeDelivery.status}
                />
              </ListItem>
              <ListItem>
                {'Pickup time: '}
                <ListItemText
                  primary={pkg?.activeDelivery.pickup_time && new Date(pkg?.activeDelivery.pickup_time).toLocaleTimeString()}
                />
              </ListItem>
              <ListItem>
                {'Start time: '}
                <ListItemText
                  primary={pkg?.activeDelivery.start_time && new Date(pkg?.activeDelivery.start_time).toLocaleTimeString()}
                />
              </ListItem>
              <ListItem>
                {'End time: '}
                <ListItemText
                  primary={pkg?.activeDelivery.end_time && new Date(pkg?.activeDelivery.end_time).toLocaleTimeString()}
                />
              </ListItem>
              <ListItem>
                {'Location: '}
                <ListItemText
                  primary={JSON.stringify(pkg?.activeDelivery.location)}
                />
              </ListItem>
              <ListItem>
                {'Created at: '}
                <ListItemText
                  primary={ new Date(pkg?.activeDelivery.createdAt).toLocaleString()}
                />
              </ListItem>
            </List>
          </Grid>
          }
        </Grid>
        <Grid item xs={12} md={6}>
          <GoogleMap currentLocation={currentLocation} sourceLocation={pkg?.package.from_location} destinationLocation={pkg?.package.to_location} />
        </Grid>
      </Grid>
      }
    </>
  )
}

export default App
