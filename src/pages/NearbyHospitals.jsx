import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  LocalHospital as HospitalIcon,
  Phone as PhoneIcon,
  Directions as DirectionsIcon,
  MyLocation as MyLocationIcon,
  EditLocation as EditLocationIcon,
  DirectionsCar,
} from '@mui/icons-material';
import NavigationButtons from '../components/NavigationButtons';

const NearbyHospitals = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    if (location) {
      fetchNearbyHospitals();
    }
  }, [location]);

  const getLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      (error) => {
        setError('Unable to retrieve your location');
        setLoading(false);
      }
    );
  };

  const fetchNearbyHospitals = () => {
    // Simulated hospital data - In a real app, you would fetch this from an API
    const mockHospitals = [
      {
        id: 1,
        name: 'City General Hospital',
        distance: '1.2 km',
        address: '123 Healthcare Ave',
        phone: '(555) 123-4567',
        emergency: true,
      },
      {
        id: 2,
        name: 'Community Medical Center',
        distance: '2.5 km',
        address: '456 Medical Blvd',
        phone: '(555) 234-5678',
        emergency: true,
      },
      {
        id: 3,
        name: 'Family Care Clinic',
        distance: '3.1 km',
        address: '789 Health Street',
        phone: '(555) 345-6789',
        emergency: false,
      },
    ];

    setHospitals(mockHospitals);
  };

  const openDirections = (hospital) => {
    if (location) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        hospital.address
      )}&origin=${location.lat},${location.lng}`;
      window.open(url, '_blank');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <NavigationButtons prevPath="/dashboard" nextPath="/profile-settings" />
      
      <Typography variant="h4" gutterBottom color="primary">
        Nearby Hospitals
      </Typography>

      {!location && (
        <Paper elevation={3} sx={{ p: 3, mb: 4, textAlign: 'center' }}>
          <Typography variant="body1" gutterBottom>
            Allow location access to find hospitals near you
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={getLocation}
            disabled={loading}
            startIcon={<MyLocationIcon />}
          >
            {loading ? 'Getting Location...' : 'Share Location'}
          </Button>
        </Paper>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {hospitals.length > 0 && (
        <List>
          {hospitals.map((hospital) => (
            <Paper
              key={hospital.id}
              elevation={2}
              sx={{ mb: 2, '&:hover': { transform: 'translateY(-2px)', transition: '0.3s' } }}
            >
              <ListItem>
                <ListItemIcon>
                  <HospitalIcon color={hospital.emergency ? 'error' : 'primary'} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="h6" component="div">
                      {hospital.name}
                      {hospital.emergency && (
                        <Typography
                          component="span"
                          sx={{ ml: 2, color: 'error.main', fontSize: '0.8rem' }}
                        >
                          24/7 Emergency
                        </Typography>
                      )}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        <LocationIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'text-bottom' }} />
                        {hospital.address}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <DirectionsCar sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'text-bottom' }} />
                        {hospital.distance} away
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <PhoneIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'text-bottom' }} />
                        {hospital.phone}
                      </Typography>
                    </Box>
                  }
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => openDirections(hospital)}
                  sx={{ ml: 2 }}
                >
                  Get Directions
                </Button>
              </ListItem>
            </Paper>
          ))}
        </List>
      )}
    </Container>
  );
};

export default NearbyHospitals; 