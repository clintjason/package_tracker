import {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import { object as YupObject} from 'yup';
import { Avatar, Typography, FormControl, Button, Grid, Box, Paper, Link, MenuItem, CssBaseline, CircularProgress, Snackbar, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import sideImg from '../../assets/15-dark.png';
import { TextField as FormikTextField, Select as FormikSelect} from 'formik-mui';
import {usernameValidationSchema, passwordValidationSchema, emailValidationSchema, roleValidationSchema, addressValidationSchema, genderValidationSchema, phoneNumberValidationSchema } from '../../utils/ValidationSchemas';
import { signup } from '../../services/api.service';
import { useNavigate } from 'react-router-dom';

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

const SignUpSchema = YupObject().shape({
  email: emailValidationSchema,
  password: passwordValidationSchema,
  firstName: usernameValidationSchema,
  lastName: usernameValidationSchema,
  role: roleValidationSchema,
  phoneNumber: phoneNumberValidationSchema,
  gender: genderValidationSchema,
  address: addressValidationSchema,
});

const initialValues = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  role: '',
  phoneNumber: '',
  gender: '',
  address: '',
};

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await signup(values);
      setOpen(true);
      setLoading(false);
      navigate('/login');
    } catch (error) {
      console.error("Signup Error: ", error);
      setLoading(false); 
      setError(error.message);
    }
  };

  return (
    <>
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
              Sign up
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={SignUpSchema}
              onSubmit={handleSubmit}
            >
            {({ errors, touched }) => (
              <Form noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      component={FormikTextField}
                      name="email"
                      type="email"
                      label="Email Address"
                      fullWidth
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={FormikTextField}
                      name="password"
                      type="password"
                      label="Password"
                      fullWidth
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={FormikTextField}
                      name="firstName"
                      type="text"
                      label="First Name"
                      fullWidth
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={FormikTextField}
                      name="lastName"
                      type="text"
                      label="Last Name"
                      fullWidth
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth error={touched.role && Boolean(errors.role)}>
                      {/* <InputLabel id="role-label">Role</InputLabel> */}
                      <Field
                        component={FormikSelect}
                        name="role"
                        labelId="role-label"
                        label="Role"
                        fullWidth
                      >
                        <MenuItem value={"admin"}>Admin</MenuItem>
                        <MenuItem value={"driver"}>Driver</MenuItem>
                        <MenuItem value={"customer"}>Customer</MenuItem>
                      </Field>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={FormikTextField}
                      name="phoneNumber"
                      type="text"
                      label="Phone Number"
                      fullWidth
                      error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth error={touched.gender && Boolean(errors.gender)}>
                      <Field
                        component={FormikSelect}
                        name="gender"
                        labelId="gender-label"
                        label="Gender"
                        fullWidth
                      >
                        <MenuItem value={"male"}>Male</MenuItem>
                        <MenuItem value={"female"}>Female</MenuItem>
                      </Field>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={FormikTextField}
                      name="address"
                      type="text"
                      label="Address"
                      fullWidth
                      error={touched.address && Boolean(errors.address)}
                      helperText={touched.address && errors.address}
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
                  Sign up
                </Button>
                }
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Sig Up successfull
                  </Alert>
                </Snackbar>
                {error && (
                  <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError('')}>
                    <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
                      {error}
                    </Alert>
                  </Snackbar>
                )}
                <Grid container>
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
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