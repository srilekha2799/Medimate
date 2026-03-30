import { Box, Container, Typography, Button, Grid, Paper, AppBar, Toolbar } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NavigationButtons from '../components/NavigationButtons';

const MotionBox = motion(Box);

const features = [
  {
    icon: <NotificationsActiveIcon sx={{ fontSize: 40 }} />,
    title: 'Voice Reminders',
    description: 'Never miss a dose with our smart voice reminder system',
    path: '/reminders'
  },
  {
    icon: <LocalPharmacyIcon sx={{ fontSize: 40 }} />,
    title: 'Medication Management',
    description: 'Track and manage your medications effectively',
    path: '/medications'
  },
  {
    icon: <AssessmentIcon sx={{ fontSize: 40 }} />,
    title: 'Health Report',
    description: 'Track and analyze your health metrics with detailed reports',
    path: '/health-score'
  },
  {
    icon: <DocumentScannerIcon sx={{ fontSize: 40 }} />,
    title: 'Prescription Scanner',
    description: 'Digitize your prescriptions with our advanced scanning technology',
    path: '/prescriptions'
  },
  {
    icon: <LocalHospitalIcon sx={{ fontSize: 40 }} />,
    title: 'Hospital Finder',
    description: 'Locate the nearest hospitals and healthcare facilities',
    path: '/nearby-hospitals'
  }
];

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/dashboard');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="fixed" color="transparent" elevation={0}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="contained"
            startIcon={<DashboardIcon />}
            onClick={handleNavigation}
            sx={{
              mr: 2,
              bgcolor: 'white',
              color: '#2196F3',
              '&:hover': { bgcolor: '#f5f5f5' },
              boxShadow: 2
            }}
          >
            Go to Dashboard
          </Button>
        </Toolbar>
      </AppBar>
      
      <NavigationButtons nextPath="/dashboard" />
      
      {/* Hero Section */}
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #B7C3E8 0%, #8EA2D7 20%, #4568AD 40%, #1F3F74 60%, #14366D 80%, #081F44 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(183, 195, 232, 0.1) 0%, rgba(8, 31, 68, 0) 100%)',
            zIndex: 1,
          },
        }}
      >
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          sx={{ position: 'relative', zIndex: 2 }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              color: 'white',
              textShadow: '0 2px 4px rgba(8, 31, 68, 0.2)',
              fontWeight: 'bold',
            }}
          >
            Welcome to Medimate
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4,
              color: 'rgba(255,255,255,0.9)',
              textShadow: '0 1px 2px rgba(8, 31, 68, 0.15)',
            }}
          >
            Your Personal Healthcare Companion
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleNavigation}
              startIcon={<DashboardIcon />}
              sx={{ 
                bgcolor: 'white', 
                color: '#4568AD',
                '&:hover': { 
                  bgcolor: 'rgba(255,255,255,0.9)',
                  transform: 'translateY(-2px)',
                  color: '#1F3F74',
                },
                transition: 'all 0.2s ease-in-out',
                boxShadow: '0 4px 12px rgba(8, 31, 68, 0.2)',
              }}
            >
              Go to Dashboard
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={handleNavigation}
              sx={{ 
                borderColor: 'white', 
                color: 'white',
                borderWidth: 2,
                '&:hover': { 
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-2px)',
                  borderWidth: 2,
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              Login
            </Button>
          </Box>
        </MotionBox>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Key Features
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      transition: 'transform 0.3s ease-in-out',
                      bgcolor: 'rgba(0, 0, 0, 0.02)'
                    },
                  }}
                  onClick={() => navigate(feature.path)}
                >
                  <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => navigate(feature.path)}
                  >
                    Learn More
                  </Button>
                </Paper>
              </MotionBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 