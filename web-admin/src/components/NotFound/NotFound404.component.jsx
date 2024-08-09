import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import imgnotfound from '../../assets/18.png';

const NotFound404 = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container sx={{ textAlign: 'center', mt: 10, 
     }}>
      <img src={imgnotfound} alt="404 Not Found Image" width='50%' />
      <Box>
        <Typography variant="h4" component="div" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" gutterBottom>
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoHome} sx={{ mt: 4 }}>
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound404;