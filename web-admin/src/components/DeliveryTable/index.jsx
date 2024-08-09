import { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, CircularProgress,
  Snackbar, Alert, Box, Grid, Typography, IconButton, Tooltip, Icon
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { searchDeliveries,  } from '../../services/api.service';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const DeliveryTable = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  //const navigate = useNavigate();

  useEffect(() => {
    fetchDeliveries();
  },[search]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleRefresh = () => {
    fetchDeliveries();
  };

  const handleRowClick = (e, pkg) => {
    e.preventDefault();
    console.log(pkg)
   //onRowClick(pkg);
  };

  const fetchDeliveries = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) {
        params.append('search', search);
      }
      const response = await searchDeliveries(params.toString());
      //const response = await getAllDeliveries();
      setDeliveries(response);
      console.log("Deliveries list: ", response.data);
      setLoading(false);
      setOpen(true);
    } catch (error) {
      console.error('fetchDeliveries Error:', error);
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <Box>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', mb: 4 }}>
        <Icon fontSize="small" color="primary" style={{ marginRight: '0.3rem' }}>
          <ArrowBackIcon fontSize="small" />
        </Icon>
        <Typography variant="body1" color="primary">Back to Home</Typography>
      </Link>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Grid item>
          <Typography variant="h4" color="primary">List All Deliveries</Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Search"
            variant="outlined"
            value={search}
            onChange={handleSearchChange}
            size="small"
          />
          <Tooltip title="Refresh">
            <IconButton onClick={handleRefresh} sx={{ ml: 2 }}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Package Desc</TableCell>
                <TableCell>Package Sender</TableCell>
                <TableCell>Package Receiver</TableCell>
                <TableCell>Pickup Time</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>createdAt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deliveries?.map((delivery) => (
                <TableRow key={delivery?._id} onClick={(e) => handleRowClick(e, delivery)} sx={{ cursor: 'pointer' }}>
                  <TableCell>{delivery?._id}</TableCell>
                  <TableCell>{delivery.package_id?.description}</TableCell>
                  <TableCell>{delivery.package_id?.from_name}</TableCell>
                  <TableCell>{delivery.package_id?.to_name}</TableCell>
                  <TableCell>{delivery?.pickup_time ? new Date(delivery?.pickup_time).toLocaleString() : 'N/A'}</TableCell>
                  <TableCell>{delivery?.start_time ? new Date(delivery?.start_time).toLocaleString() : 'N/A' }</TableCell>
                  <TableCell>{delivery?.end_time ? new Date(delivery?.end_time).toLocaleString(): 'N/A'}</TableCell>
                  <TableCell>{JSON.stringify(delivery?.location)}</TableCell>
                  <TableCell>{delivery.status || 'N/A'}</TableCell>
                  <TableCell>{new Date(delivery.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Delivery fetched successfully!
        </Alert>
      </Snackbar>
      {error && (
        <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError('')}>
          <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default DeliveryTable;