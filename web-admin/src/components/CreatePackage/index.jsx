import {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import { Avatar, Typography, Button, Grid, Box, Paper, CssBaseline, CircularProgress, Snackbar, Alert, Icon } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import sideImg from '../../assets/packageimage.png';
import { TextField as FormikTextField } from 'formik-mui';
import { packageValidationSchema } from '../../utils/ValidationSchemas';
import { createPackage } from '../../services/api.service';
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

export default function CreatePackage() {
  const [loading, setLoading] = useState(false);
  //const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const validatePackageSchema = packageValidationSchema;

  const initialValues = {
    description: '',
    weight: '',
    width: '',
    height: '',
    depth: '',
    from_name: '',
    from_address: '',
    from_location: '',
    to_name: '',
    to_address: '',
    to_location: ''
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      console.log(values);
      const [from_loc_lat, from_loc_lng] = values.from_location.split(" ");
      const [to_loc_lat, to_loc_lng] = values.to_location.split(" ");
      const from_location = {
        lat: parseFloat(from_loc_lat),
        lng: parseFloat(from_loc_lng)
      };

      const to_location = {
        lat: parseFloat(to_loc_lat),
        lng: parseFloat(to_loc_lng)
      };
      const payload = {...values, from_location: from_location, to_location: to_location }
      await createPackage(payload);
      setOpen(true);
      setLoading(false);
     // navigate('/view-packages');
    } catch (error) {
      console.error("createPackage Error: ", error);
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
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
              Create Package
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={validatePackageSchema}
              onSubmit={handleSubmit}
            >
            {({ errors, touched }) => (
              <Form noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      component={FormikTextField}
                      name="description"
                      type="text"
                      label="Description"
                      fullWidth
                      error={touched.description && Boolean(errors.description)}
                      helperText={touched.description && errors.description}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={FormikTextField}
                      name="weight"
                      type="number"
                      label="Weight"
                      fullWidth
                      error={touched.weight && Boolean(errors.weight)}
                      helperText={touched.weight && errors.weight}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={FormikTextField}
                      name="width"
                      type="number"
                      label="Width"
                      fullWidth
                      error={touched.width && Boolean(errors.width)}
                      helperText={touched.width && errors.width}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={FormikTextField}
                      name="height"
                      type="number"
                      label="Height"
                      fullWidth
                      error={touched.height && Boolean(errors.height)}
                      helperText={touched.height && errors.height}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={FormikTextField}
                      name="depth"
                      type="number"
                      label="Depth"
                      fullWidth
                      error={touched.depth && Boolean(errors.depth)}
                      helperText={touched.depth && errors.depth}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={FormikTextField}
                      name="from_name"
                      type="text"
                      label="From Name"
                      fullWidth
                      error={touched.from_name && Boolean(errors.from_name)}
                      helperText={touched.from_name && errors.from_name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={FormikTextField}
                      name="from_address"
                      type="text"
                      label="From Address"
                      fullWidth
                      error={touched.from_address && Boolean(errors.from_address)}
                      helperText={touched.from_address && errors.from_address}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={FormikTextField}
                      name="from_location"
                      type="text"
                      label="From Location"
                      fullWidth
                      error={touched.from_location && Boolean(errors.from_location)}
                      helperText={touched.from_location && errors.from_location}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={FormikTextField}
                      name="to_name"
                      type="text"
                      label="To Name"
                      fullWidth
                      error={touched.to_name && Boolean(errors.to_name)}
                      helperText={touched.to_name && errors.to_name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={FormikTextField}
                      name="to_address"
                      type="text"
                      label="To Address"
                      fullWidth
                      error={touched.to_address && Boolean(errors.to_address)}
                      helperText={touched.to_address && errors.to_address}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={FormikTextField}
                      name="to_location"
                      type="text"
                      label="To Location"
                      fullWidth
                      error={touched.to_location && Boolean(errors.to_location)}
                      helperText={touched.to_location && errors.to_location}
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
                  Create Package
                </Button>
                }
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Package creation successfull
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