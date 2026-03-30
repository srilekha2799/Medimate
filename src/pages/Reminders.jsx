import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondary,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Alert,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import NavigationButtons from '../components/NavigationButtons';

const Reminders = () => {
  const [reminders, setReminders] = useState([
    {
      id: 1,
      medicationId: 1,
      time: new Date(),
      frequency: 'Daily',
      isActive: true,
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  const [newReminder, setNewReminder] = useState({
    medicationId: '',
    time: new Date(),
    frequency: 'Daily',
  });

  useEffect(() => {
    // Request notification permission when component mounts
    if ('Notification' in window) {
      Notification.requestPermission();
    }

    // Load saved reminders from localStorage
    const savedReminders = JSON.parse(localStorage.getItem('medicationReminders') || '[]');
    setReminders(savedReminders);

    // Set up notification checking interval
    const interval = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Save reminders to localStorage whenever they change
    localStorage.setItem('medicationReminders', JSON.stringify(reminders));
  }, [reminders]);

  const checkReminders = () => {
    const now = new Date();
    reminders.forEach(reminder => {
      if (reminder.enabled) {
        const reminderTime = new Date(reminder.time);
        if (
          reminderTime.getHours() === now.getHours() &&
          reminderTime.getMinutes() === now.getMinutes()
        ) {
          sendNotification(reminder);
        }
      }
    });
  };

  const sendNotification = (reminder) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Medication Reminder', {
        body: `Time to take ${reminder.medication} - ${reminder.dosage}`,
        icon: '/medicine-icon.png', // Add an appropriate icon
      });
    }
  };

  const handleAddReminder = () => {
    if (editingReminder !== null) {
      setReminders(reminders.map((rem) =>
        rem.id === editingReminder ? { ...newReminder, id: rem.id } : rem
      ));
    } else {
      setReminders([...reminders, { ...newReminder, id: Date.now() }]);
    }
    handleCloseDialog();
  };

  const handleDeleteReminder = (id) => {
    setReminders(reminders.filter((rem) => rem.id !== id));
  };

  const handleEditReminder = (reminder) => {
    setEditingReminder(reminder.id);
    setNewReminder(reminder);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingReminder(null);
    setNewReminder({
      medicationId: '',
      time: new Date(),
      frequency: 'Daily',
    });
  };

  const handleToggleReminder = (index) => {
    const updatedReminders = reminders.map((reminder, i) =>
      i === index ? { ...reminder, enabled: !reminder.enabled } : reminder
    );
    setReminders(updatedReminders);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <NavigationButtons prevPath="/medications" nextPath="/health-score" />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" color="primary">
          Medication Reminders
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Add Reminder
        </Button>
      </Box>

      {reminders.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <NotificationsIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No Reminders Set
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Click the "Add Reminder" button to set up medication reminders
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {reminders.map((reminder) => (
            <Grid item xs={12} sm={6} md={4} key={reminder.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Reminder
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Time: {reminder.time.toLocaleTimeString()}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Frequency: {reminder.frequency}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => handleEditReminder(reminder)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteReminder(reminder.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton>
                    <NotificationsIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingReminder !== null ? 'Edit Reminder' : 'Add New Reminder'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Medication</InputLabel>
              <Select
                value={newReminder.medicationId}
                label="Medication"
                onChange={(e) =>
                  setNewReminder({ ...newReminder, medicationId: e.target.value })
                }
              >
                <MenuItem value={1}>Aspirin</MenuItem>
                {/* Add more medications as needed */}
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Time"
                value={newReminder.time}
                onChange={(newTime) =>
                  setNewReminder({ ...newReminder, time: newTime })
                }
              />
            </LocalizationProvider>
            <FormControl fullWidth>
              <InputLabel>Frequency</InputLabel>
              <Select
                value={newReminder.frequency}
                label="Frequency"
                onChange={(e) =>
                  setNewReminder({ ...newReminder, frequency: e.target.value })
                }
              >
                <MenuItem value="Daily">Daily</MenuItem>
                <MenuItem value="Weekly">Weekly</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleAddReminder}
            variant="contained"
            disabled={!newReminder.medicationId}
          >
            {editingReminder !== null ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {!('Notification' in window) && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          Your browser doesn't support notifications. Some features may not work.
        </Alert>
      )}
    </Container>
  );
};

export default Reminders; 