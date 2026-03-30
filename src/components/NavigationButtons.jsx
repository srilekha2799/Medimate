import { Box, Button, IconButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const NavigationButtons = ({ prevPath, nextPath }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    navigate('/');
  };

  const handlePrevClick = () => {
    if (prevPath) {
      navigate(prevPath);
    }
  };

  const handleNextClick = () => {
    if (nextPath) {
      navigate(nextPath);
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        display: 'flex',
        gap: 1,
        zIndex: 1000,
      }}
    >
      {location.pathname !== '/' && (
        <IconButton
          onClick={handlePrevClick}
          disabled={!prevPath}
          sx={{
            bgcolor: 'background.paper',
            boxShadow: 1,
            '&:hover': { bgcolor: 'background.default' },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      )}
      <Button
        variant="contained"
        onClick={handleHomeClick}
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          fontWeight: 'bold',
          '&:hover': { bgcolor: 'primary.dark' },
        }}
      >
        Medimate
      </Button>
      {location.pathname !== '/' && (
        <IconButton
          onClick={handleNextClick}
          disabled={!nextPath}
          sx={{
            bgcolor: 'background.paper',
            boxShadow: 1,
            '&:hover': { bgcolor: 'background.default' },
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default NavigationButtons; 