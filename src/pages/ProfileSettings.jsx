import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Snackbar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Notifications as NotificationsIcon,
  PrivacyTip as PrivacyIcon,
  Save as SaveIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State',
    emergencyContact: 'Jane Doe (+1 (555) 987-6543)',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    voiceNotifications: true,
    emailNotifications: true,
    pushNotifications: true,
    medicationReminders: true,
    appointmentReminders: true,
    healthTips: true,
  });

  const [privacySettings, setPrivacySettings] = useState({
    shareHealthData: false,
    shareLocation: false,
    shareMedicationHistory: false,
    allowAnalytics: true,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (setting) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handlePrivacyChange = (setting) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    setSnackbar({
      open: true,
      message: 'Settings saved successfully!',
      severity: 'success',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box>
      <AppBar position="static" color="transparent" elevation={1} sx={{ mb: 2 }}>
        <Toolbar>
          <Button
            startIcon={<DashboardIcon />}
            variant="contained"
            onClick={() => navigate('/dashboard')}
            sx={{ mr: 2 }}
          >
            Back to Dashboard
          </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Profile & Settings
          </Typography>
          <Button
            startIcon={<SaveIcon />}
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Manage your personal information and preferences
        </Typography>

        <Grid container spacing={3}>
          {/* Personal Information */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PersonIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Personal Information</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Emergency Contact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Notification Settings */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <NotificationsIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Notification Preferences</Typography>
              </Box>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Voice Notifications" />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={notificationSettings.voiceNotifications}
                      onChange={() => handleNotificationChange('voiceNotifications')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Email Notifications" />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={notificationSettings.emailNotifications}
                      onChange={() => handleNotificationChange('emailNotifications')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Push Notifications" />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={notificationSettings.pushNotifications}
                      onChange={() => handleNotificationChange('pushNotifications')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Medication Reminders" />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={notificationSettings.medicationReminders}
                      onChange={() => handleNotificationChange('medicationReminders')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Appointment Reminders" />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={notificationSettings.appointmentReminders}
                      onChange={() => handleNotificationChange('appointmentReminders')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Health Tips" />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={notificationSettings.healthTips}
                      onChange={() => handleNotificationChange('healthTips')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Privacy Settings */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PrivacyIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Privacy & Data Settings</Typography>
              </Box>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Share Health Data"
                    secondary="Allow sharing of health data with healthcare providers"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={privacySettings.shareHealthData}
                      onChange={() => handlePrivacyChange('shareHealthData')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Share Location"
                    secondary="Allow sharing of location for nearby services"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={privacySettings.shareLocation}
                      onChange={() => handlePrivacyChange('shareLocation')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Share Medication History"
                    secondary="Allow sharing of medication history with healthcare providers"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={privacySettings.shareMedicationHistory}
                      onChange={() => handlePrivacyChange('shareMedicationHistory')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Allow Analytics"
                    secondary="Help improve our services by sharing usage data"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={privacySettings.allowAnalytics}
                      onChange={() => handlePrivacyChange('allowAnalytics')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfileSettings; 