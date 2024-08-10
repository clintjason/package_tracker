import { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, CircularProgress,
  Snackbar, Alert, Box, Grid, Typography, IconButton, Tooltip, Icon
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { searchPackages } from '../../services/api.service';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PackageTable = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  //const navigate = useNavigate();

  useEffect(() => {
    fetchPackages();
  },[search]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleRefresh = () => {
    fetchPackages();
  };

  const handleRowClick = (e, pkg) => {
    e.preventDefault();
    console.log(pkg)
   //onRowClick(pkg);
  };

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) {
        params.append('search', search);
      }
      const response = await searchPackages(params.toString());
      setPackages(response);
      console.log("Packages list: ", response);
      setLoading(false);
      setOpen(true);
    } catch (error) {
      console.error('fetchPackages Error:', error);
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
          <Typography variant="h4" color="primary">List All Packages</Typography>
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
                <TableCell>DeliveryID</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Width</TableCell>
                <TableCell>Height</TableCell>
                <TableCell>Depth</TableCell>
                <TableCell>From Name</TableCell>
                <TableCell>From Address</TableCell>
                <TableCell>From Location</TableCell>
                <TableCell>To Name</TableCell>
                <TableCell>To Address</TableCell>
                <TableCell>To Location</TableCell>
                <TableCell>created at</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {packages?.map((pkg) => (
                <TableRow key={pkg._id} onClick={(e) => handleRowClick(e, pkg)} sx={{ cursor: 'pointer' }}>
                  <TableCell>{pkg._id}</TableCell>
                  <TableCell>{pkg.active_delivery_id}</TableCell>
                  <TableCell>{pkg.description}</TableCell>
                  <TableCell>{pkg.weight}</TableCell>
                  <TableCell>{pkg.width}</TableCell>
                  <TableCell>{pkg.height}</TableCell>
                  <TableCell>{pkg.depth}</TableCell>
                  <TableCell>{pkg.from_name}</TableCell>
                  <TableCell>{pkg.from_address}</TableCell>
                  <TableCell>{JSON.stringify(pkg.from_location)}</TableCell>
                  <TableCell>{pkg.to_name}</TableCell>
                  <TableCell>{pkg.to_address}</TableCell>
                  <TableCell>{JSON.stringify(pkg.to_location)}</TableCell>
                  <TableCell>{new Date(pkg.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Packagefetched successfully!
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

export default PackageTable;