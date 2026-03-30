import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  LocalPharmacy as LocalPharmacyIcon,
  Notifications as NotificationsIcon,
  Assessment as AssessmentIcon,
  DocumentScanner as DocumentScannerIcon,
  LocalHospital as LocalHospitalIcon,
  RecordVoiceOver as RecordVoiceOverIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import NavigationButtons from '../components/NavigationButtons';

const Dashboard = () => {
  const navigate = useNavigate();
  const [recentActivities, setRecentActivities] = useState([]);

  const handleProfileClick = () => {
    navigate('/profile-settings');
  };

  const quickActions = [
    {
      icon: <LocalPharmacyIcon />,
      title: 'Medications',
      path: '/medications',
    },
    {
      icon: <NotificationsIcon />,
      title: recentActivities.length === 0 ? 'No Reminders' : 'Reminders',
      path: '/reminders',
      disabled: recentActivities.length === 0,
      sx: recentActivities.length === 0 ? { color: 'text.secondary' } : {}
    },
    {
      icon: <RecordVoiceOverIcon />,
      title: 'Voice Settings',
      path: '/voice-settings',
    },
    {
      icon: <AssessmentIcon />,
      title: 'Health Score',
      path: '/health-score',
    },
    {
      icon: <DocumentScannerIcon />,
      title: 'Scan Prescription',
      path: '/prescriptions',
    },
    {
      icon: <LocalHospitalIcon />,
      title: 'Nearby Hospitals',
      path: '/nearby-hospitals',
    },
    {
      icon: <LocalPharmacyIcon />,
      title: 'Pharmacy Prices',
      path: '/pharmacy-price-comparison',
    },
  ];

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 2 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            onClick={handleProfileClick}
            sx={{ mr: 2 }}
          >
            <AccountCircleIcon sx={{ fontSize: 32 }} />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <NavigationButtons prevPath="/" nextPath="/medications" />
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" color="primary" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Welcome back! Here's your health overview.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Quick Actions */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Grid container spacing={2}>
                  {quickActions.map((action) => (
                    <Grid item xs={12} sm={6} md={4} lg={2.4} key={action.title}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={action.icon}
                        onClick={() => navigate(action.path)}
                        disabled={action.disabled}
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          py: 2,
                          ...(action.sx || {})
                        }}
                      >
                        {action.title}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Activities */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Activities
                </Typography>
                {recentActivities.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 3 }}>
                    <NotificationsIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                    <Typography variant="body1" color="text.secondary">
                      No recent activities
                    </Typography>
                  </Box>
                ) : (
                  <List>
                    {recentActivities.map((activity) => (
                      <Box key={activity.id}>
                        <ListItem>
                          <ListItemIcon>
                            {activity.type === 'medication' ? (
                              <LocalPharmacyIcon />
                            ) : (
                              <NotificationsIcon />
                            )}
                          </ListItemIcon>
                          <ListItemText
                            primary={activity.action}
                            secondary={activity.time.toLocaleString()}
                          />
                        </ListItem>
                        <Divider />
                      </Box>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Health Overview */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Health Overview
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<AssessmentIcon />}
                    onClick={() => navigate('/health-score')}
                  >
                    View Health Score
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<LocalPharmacyIcon />}
                    onClick={() => navigate('/medications')}
                  >
                    Manage Medications
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<NotificationsIcon />}
                    onClick={() => navigate('/reminders')}
                  >
                    Set Reminders
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard; 