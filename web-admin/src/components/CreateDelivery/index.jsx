import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { Avatar, Typography, Button, Grid, Box, Paper, CssBaseline, CircularProgress, Snackbar, Alert, FormControl, MenuItem, Icon } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import sideImg from '../../assets/deliveryimg.png';
import { Select as FormikSelect } from 'formik-mui';
import { packageIdValidationSchema } from '../../utils/ValidationSchemas';
import { createDelivery, getOnePackage } from '../../services/api.service';
//import { useNavigate } from 'react-router-dom';
import { getAllPackages } from '../../services/api.service';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

export default function CreateDelivery() {
  const [loading, setLoading] = useState(false);
  //const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openD, setOpenD] = useState(false);
  const [error, setError] = useState('');
  const [packages, setPackages] = useState([]);

  const validateDeliverySchema = packageIdValidationSchema;

  const initialValues = {
    package_id: ''
  }
  /* const initialValues = {
    pickup_time: '',
    start_time: '',
    end_time: '',
    package_id: ''
  } */

  useEffect(() => {
    fetchPackages()
  },[]);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await getAllPackages();
      setPackages(response.data);
      setLoading(false);
      setOpen(true);
    } catch (error) {
      console.error('fetchPackages Error:', error);
      setLoading(false);
      setError(error.message);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      console.log(values);
      const pkg = await getOnePackage(values.package_id);
      console.log("The package: ", pkg);
      const payload = {...values, location: pkg.data.to_location}
      console.log("Payload: ", payload);
      await createDelivery(payload);
      setOpenD(true);
      setLoading(false);
      //navigate('/view-packages');
    } catch (error) {
      console.error("createDelivery Error: ", error);
      setLoading(false); 
      setError(error.message);
    }
  };

  return (
    <>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', mb: 4 }}>
        <Icon fontSize="small" color="primary" style={{ marginRight: '0.3rem' }}>
          <ArrowBackIcon fontSize="small" />
        </Icon>
        <Typography variant="body1" color="primary">Back to Home</Typography>
      </Link>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              `url(${sideImg})`,
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'left',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
              Create Delivery
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={validateDeliverySchema}
              onSubmit={handleSubmit}
            >
            {({ errors, touched }) => (
              <Form noValidate>
                <Grid container spacing={2}>
                 {/*  <Grid item xs={12}>
                    <Field
                      component={FormikTextField}
                      name="pickup_time"
                      type="time"
                      label="Pickup Time"
                      fullWidth
                      error={touched.pickup_time && Boolean(errors.pickup_time)}
                      helperText={touched.pickup_time && errors.pickup_time}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={FormikTextField}
                      name="start_time"
                      type="time"
                      label="Start Time"
                      fullWidth
                      error={touched.start_time && Boolean(errors.start_time)}
                      helperText={touched.start_time && errors.start_time}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={FormikTextField}
                      name="end_time "
                      type="time"
                      label="End Time"
                      fullWidth
                      error={touched.end_time  && Boolean(errors.end_time )}
                      helperText={touched.end_time  && errors.end_time }
                    />
                  </Grid> */}
                  <Grid item xs={12}>
                    <FormControl fullWidth error={touched.status && Boolean(errors.status)}>
                      <Field
                        component={FormikSelect}
                        name="package_id"
                        labelId="package_id-label"
                        label="Select Package"
                        fullWidth
                      >
                        {packages?.map((pkg) => {
                          return (
                            <MenuItem key={pkg._id} value={pkg._id}>{pkg.description + ' from ' + pkg.from_name} </MenuItem>
                          )
                        })}
                      </Field>
                    </FormControl>
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
                  Create Delivery
                </Button>
                }
                <Snackbar open={openD} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Delivery creation successfull
                  </Alert>
                </Snackbar>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Packages loaded successfully
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
        </Grid>
      </Grid>
    </>
  );
}