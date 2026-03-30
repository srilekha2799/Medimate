import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Card,
  CardContent,
  CardActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Alarm as AlarmIcon,
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';
import NavigationButtons from '../components/NavigationButtons';

const Medications = () => {
  const navigate = useNavigate();
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: 'Aspirin',
      dosage: '100mg',
      frequency: 'Once daily',
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      notes: 'Take with food',
      type: 'Tablet',
      remainingQuantity: 30,
    },
    // Add more mock data as needed
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingMed, setEditingMed] = useState(null);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    startDate: new Date(),
    endDate: new Date(),
    notes: '',
    type: '',
    remainingQuantity: 0,
  });

  const handleAddMedication = () => {
    if (editingMed !== null) {
      // Update existing medication
      setMedications(medications.map((med) =>
        med.id === editingMed ? { ...newMedication, id: med.id } : med
      ));
    } else {
      // Add new medication
      setMedications([...medications, { ...newMedication, id: Date.now() }]);
    }
    handleCloseDialog();
  };

  const handleDeleteMedication = (id) => {
    setMedications(medications.filter((med) => med.id !== id));
  };

  const handleEditMedication = (medication) => {
    setEditingMed(medication.id);
    setNewMedication(medication);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingMed(null);
    setNewMedication({
      name: '',
      dosage: '',
      frequency: '',
      startDate: new Date(),
      endDate: new Date(),
      notes: '',
      type: '',
      remainingQuantity: 0,
    });
  };

  const handleSetReminder = (medicationId) => {
    navigate('/reminders', { state: { medicationId } });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <NavigationButtons prevPath="/dashboard" nextPath="/reminders" />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" color="primary">
          Medication Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Add Medication
        </Button>
      </Box>

      {medications.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No medications added yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Click the "Add Medication" button to start tracking your medications
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {medications.map((medication) => (
            <Grid item xs={12} sm={6} md={4} key={medication.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {medication.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {medication.dosage} - {medication.type}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Frequency: {medication.frequency}
                  </Typography>
                  <Typography variant="body2">
                    Remaining: {medication.remainingQuantity} units
                  </Typography>
                  {medication.notes && (
                    <Alert severity="info" sx={{ mt: 2 }}>
                      {medication.notes}
                    </Alert>
                  )}
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => handleEditMedication(medication)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteMedication(medication.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleSetReminder(medication.id)}>
                    <AlarmIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingMed !== null ? 'Edit Medication' : 'Add New Medication'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Medication Name"
              fullWidth
              value={newMedication.name}
              onChange={(e) =>
                setNewMedication({ ...newMedication, name: e.target.value })
              }
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Dosage"
                  fullWidth
                  value={newMedication.dosage}
                  onChange={(e) =>
                    setNewMedication({ ...newMedication, dosage: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={newMedication.type}
                    label="Type"
                    onChange={(e) =>
                      setNewMedication({ ...newMedication, type: e.target.value })
                    }
                  >
                    <MenuItem value="Tablet">Tablet</MenuItem>
                    <MenuItem value="Capsule">Capsule</MenuItem>
                    <MenuItem value="Liquid">Liquid</MenuItem>
                    <MenuItem value="Injection">Injection</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <TextField
              label="Frequency"
              fullWidth
              value={newMedication.frequency}
              onChange={(e) =>
                setNewMedication({ ...newMedication, frequency: e.target.value })
              }
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <DatePicker
                    label="Start Date"
                    value={newMedication.startDate}
                    onChange={(newDate) =>
                      setNewMedication({ ...newMedication, startDate: newDate })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <DatePicker
                    label="End Date"
                    value={newMedication.endDate}
                    onChange={(newDate) =>
                      setNewMedication({ ...newMedication, endDate: newDate })
                    }
                  />
                </Grid>
              </Grid>
            </LocalizationProvider>
            <TextField
              label="Remaining Quantity"
              type="number"
              fullWidth
              value={newMedication.remainingQuantity}
              onChange={(e) =>
                setNewMedication({
                  ...newMedication,
                  remainingQuantity: parseInt(e.target.value, 10),
                })
              }
            />
            <TextField
              label="Notes"
              fullWidth
              multiline
              rows={3}
              value={newMedication.notes}
              onChange={(e) =>
                setNewMedication({ ...newMedication, notes: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleAddMedication}
            variant="contained"
            disabled={!newMedication.name || !newMedication.dosage}
          >
            {editingMed !== null ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Medications; 