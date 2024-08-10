import { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik';
import { Typography, Button, Grid, Box, List, ListItem, ListItemText, Paper, CssBaseline, CircularProgress, Snackbar, Alert, FormControl, MenuItem, Icon } from '@mui/material';
import { TextField as FormikTextField  } from 'formik-mui';
import * as Yup from 'yup';

import './App.css'
import { getOneDelivery } from './services/api.service';

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

const deliveryValidationSchema = Yup.object().shape({
  delivery_id: Yup.string()
    .required('Delivery ID is required')
})

function App() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [disablePickupBtn, setDisablePickupBtn] = useState(false);
  const [disableTransitBtn, setDisableTransitBtn] = useState(true);
  const [disableDeliveredBtn, setDisableDeliveredBtn] = useState(true);
  const [disableFailedBtn, setDisableFailedBtn] = useState(true);
  const [socket, setSocket] = useState(null);
  const [delivery, setDelivery] = useState(null);
  const [deliveryStatus, setDeliveryStatus] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);

  const initialValues = {
    delivery_id: ''
  }

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      console.log(values);
      const delivery = await getOneDelivery(values.delivery_id);
      console.log("The delivery: ", delivery);
      setDelivery(delivery.data);
      setCurrentLocation(delivery.data.location);
      setOpen(true);
      setLoading(false);
    } catch (error) {
      console.error("createDelivery Error: ", error);
      setLoading(false); 
      setError(error.message);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePickup = () => {
    console.log("In handle pickup");
    //setDisablePickupBtn(true);
    // Trigger the WebSocket event
    socket.send(
      JSON.stringify({
        event: 'status_changed',
        delivery_id: delivery?._id,
        status: 'picked-up',
      })
    );

    setDisablePickupBtn(true);
    setDisableTransitBtn(false);
  }

  const sendLocationUpdate = (location) => {
    console.log('in sendLocationUpdate: ', location);
    socket && socket.send(
      JSON.stringify({
        event: 'location_changed',
        delivery_id: delivery?._id,
        location: location,
      })
    );
  };

  const handleDelivered = async () => {
    console.log('handleDelivered');
    setDisableDeliveredBtn(true);

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          event: 'status_changed',
          delivery_id: delivery?._id,
          status: 'delivered',
        })
      );
    } else {
      console.error('Socket connection is not active. Unable to send events.');
    }
  }

  const handleFailed = async () => {
    console.log('handleFailed');
    setDisableFailedBtn(true);
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          event: 'status_changed',
          delivery_id: delivery?._id,
          status: 'failed',
        })
      );
    } else {
      console.error('Socket connection is not active. Unable to send events.');
    }
  }

  const handleTransit = async () => {
    setDisableTransitBtn(true);
  
    // Check if the socket connection is still active
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          event: 'status_changed',
          delivery_id: delivery?._id,
          status: 'in-transit',
        })
      );
  
      try {
        let coordinates = await fetchLocation();
        console.log('Coordinates: ', coordinates);
        setCurrentLocation(coordinates);
  
        // Check if the socket connection is still active before sending the location update
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(
            JSON.stringify({
              event: 'location_changed',
              delivery_id: delivery?._id,
              location: coordinates,
            })
          );
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      } finally {
        // Enable the button again, regardless of whether the location was fetched successfully or not
        setDisableTransitBtn(false);
      }
    } else {
      console.error('Socket connection is not active. Unable to send events.');
    }
  };

  /* const fetchLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
        console.log('Current position: ', position.coords);
       sendLocationUpdate({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('Error fetching location:', error);
      }
    );
  }; */

  const fetchLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ lat: latitude, lng: longitude });
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  useEffect(() => {
    if(delivery?.status === 'open') {
      setDisablePickupBtn(false);
      setDisableTransitBtn(true);
      setDisableDeliveredBtn(true);
      setDisableFailedBtn(true);
    }
    if(delivery?.status === 'picked-up') {
      setDisablePickupBtn(true);
      setDisableTransitBtn(false);
      setDisableDeliveredBtn(true);
      setDisableFailedBtn(true);
    }
    if(delivery?.status === 'in-transit') {
      setDisablePickupBtn(true);
      setDisableTransitBtn(true);
      setDisableDeliveredBtn(false);
      setDisableFailedBtn(false);
    }
    if(delivery?.status === 'failed') {
      setDisablePickupBtn(false);
      setDisableDeliveredBtn(true);
      setDisableFailedBtn(true);
    }
    if(delivery?.status === 'delivered') {
      setDisableDeliveredBtn(true);
      setDisableFailedBtn(true);
    }
    // Connect to the WebSocket server
    const newSocket = new WebSocket('ws://localhost:5000');
    
    newSocket.onopen = () => {
      console.log('WebSocket connection established');
      setSocket(newSocket);
      
      // Start fetching location every 20 seconds
      let intervalId;
      if(delivery?.status === 'in-transit') {
        intervalId = setInterval(async () => await fetchLocation, 20000);
      }

      return () => {
        // Clean up the WebSocket connection and location fetching on component unmount
        newSocket.close();
        (delivery?.status === 'in-transit') && clearInterval(intervalId);
      };
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received message:', data);

      if (data.event === 'status_changed') {
        console.log('Status changed:', data.status);
        setDeliveryStatus(data.status);
      }
      if (data.event === 'delivery_updated') {
        console.log('delivery_updated:', data.delivery);
        setDelivery(data.delivery);
      }

      if (data.event === 'location_changed') {
        console.log('location_changed:', data.delivery);
        setDelivery(data.delivery);
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
  }, [delivery]);

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
          Web Driver Dashboard
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={deliveryValidationSchema}
          onSubmit={handleSubmit}
        >
        {({ errors, touched }) => (
          <Form noValidate>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <Field
                  component={FormikTextField}
                  name="delivery_id"
                  type="text"
                  label="Enter delivery ID"
                  fullWidth
                  error={touched.delivery_id  && Boolean(errors.delivery_id )}
                  helperText={touched.delivery_id  && errors.delivery_id }
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
              submit
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
      {delivery && 
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
                primary={delivery?.package_id._id}
              />
            </ListItem>
            <ListItem>
              {'Active Delivery Id: '}
              <ListItemText
                primary={delivery?.package_id?.active_delivery_id}
              />
            </ListItem>
            <ListItem>
              {'Description: '}
              <ListItemText
                primary={delivery?.package_id.description}
              />
            </ListItem>
            <ListItem>
              {'Width: '}
              <ListItemText
                primary={delivery?.package_id.width}
              />
            </ListItem>
            <ListItem>
              {'Weight: '}
              <ListItemText
                primary={delivery?.package_id.weight}
              />
            </ListItem>
            <ListItem>
              {'Height: '}
              <ListItemText
                primary={delivery?.package_id.height}
              />
            </ListItem>
            <ListItem>
              {'Depth: '}
              <ListItemText
                primary={delivery?.package_id.depth}
              />
            </ListItem>
            <ListItem>
              {'Sender: '}
              <ListItemText
                primary={delivery?.package_id.from_name}
              />
            </ListItem>
            <ListItem>
              {'Receiver: '}
              <ListItemText
                primary={delivery?.package_id.to_name}
              />
            </ListItem>
            <ListItem>
              {'From Address: '}
              <ListItemText
                primary={delivery?.package_id.from_address}
              />
            </ListItem>
            <ListItem>
              {'To Address: '}
              <ListItemText
                primary={delivery?.package_id.to_address}
              />
            </ListItem>
            <ListItem>
              {'From Location: '}
              <ListItemText
                primary={JSON.stringify(delivery?.package_id.from_location)}
              />
            </ListItem>
            <ListItem>
              {'To Location: '}
              <ListItemText
                primary={JSON.stringify(delivery?.package_id.to_location)}
              />
            </ListItem>
            <ListItem>
              {'Created at: '}
              <ListItemText
                primary={ new Date(delivery?.package_id.createdAt).toLocaleString()}
              />
            </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 2, textAlign: 'left'}} variant="h6" component="h2">
              Delivery Details
            </Typography>
            <List>
              <ListItem>
                {'ID: '}
                <ListItemText
                  primary={delivery?._id}
                />
              </ListItem>
              <ListItem>
                {'Status: '}
                <ListItemText
                  primary={delivery?.status}
                />
              </ListItem>
              <ListItem>
                {'Pickup time: '}
                <ListItemText
                  primary={delivery?.pickup_time && new Date(delivery?.pickup_time).toLocaleTimeString()}
                />
              </ListItem>
              <ListItem>
                {'Start time: '}
                <ListItemText
                  primary={delivery?.start_time && new Date(delivery?.start_time).toLocaleTimeString()}
                />
              </ListItem>
              <ListItem>
                {'End time: '}
                <ListItemText
                  primary={delivery?.end_time && new Date(delivery?.end_time).toLocaleTimeString()}
                />
              </ListItem>
              <ListItem>
                {'Location: '}
                <ListItemText
                  primary={JSON.stringify(delivery?.location)}
                />
              </ListItem>
              <ListItem>
                {'Created at: '}
                <ListItemText
                  primary={ new Date(delivery?.createdAt).toLocaleString()}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid item xs={12} md={12} sx={{ display: 'flex', gap:'15px', justifyContent: 'space-between' }}>
            <Grid item xs={12} md={3}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={handlePickup}
                disabled={disablePickupBtn}
                sx={{ mt: 1, mb: 2, backgroundColor: 'rgb(112,194, 197)',
                  '&:hover': {
                    backgroundColor: 'rgb(92,174,177)',
                  },}}
              >
                Pick up
              </Button>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={handleTransit}
                disabled={disableTransitBtn}
                sx={{
                  mt: 1,
                  mb: 2,
                  backgroundColor: 'rgb(240,157, 63)',
                  '&:hover': {
                    backgroundColor: 'rgb(220,137,43)',
                  },
                }}
              >
                In-Transit
              </Button>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={handleDelivered}
                disabled={disableDeliveredBtn}
                sx={{
                  mt: 1,
                  mb: 2,
                  backgroundColor: 'rgba(0, 100, 0, 0.8)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 100, 0, 0.9)',
                  },
                }}
              >
                Delivered
              </Button>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={handleFailed}
                disabled={disableFailedBtn}
                sx={{
                  mt: 1,
                  mb: 3,
                  backgroundColor: 'rgba(139, 0, 0, 0.8)',
                  '&:hover': {
                    backgroundColor: 'rgba(139, 0, 0, 0.9)',
                  },
                }}
              >
                Failed
              </Button>
            </Grid>
          </Grid>
          <GoogleMap currentLocation={currentLocation} sourceLocation={delivery.package_id.from_location} destinationLocation={delivery.package_id.to_location} />
        </Grid>
      </Grid>
      }
    </>
  )
}

export default App
