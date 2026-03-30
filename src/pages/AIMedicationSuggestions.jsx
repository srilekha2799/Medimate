import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Divider,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocalHospital as HospitalIcon,
  Medication as MedicationIcon,
  Psychology as PsychologyIcon,
} from '@mui/icons-material';

// Mock data for medicine suggestions
const mockSuggestions = [
  {
    name: 'Paracetamol',
    alternatives: [
      {
        name: 'Acetaminophen',
        confidence: 0.95,
        reason: 'Same active ingredient, different brand name',
        sideEffects: 'Minimal, similar to original',
        cost: 'Lower',
      },
      {
        name: 'Ibuprofen',
        confidence: 0.75,
        reason: 'Different mechanism but similar pain relief',
        sideEffects: 'May cause stomach irritation',
        cost: 'Similar',
      },
    ],
  },
  {
    name: 'Lisinopril',
    alternatives: [
      {
        name: 'Enalapril',
        confidence: 0.85,
        reason: 'Similar ACE inhibitor with comparable efficacy',
        sideEffects: 'Similar profile',
        cost: 'Lower',
      },
      {
        name: 'Ramipril',
        confidence: 0.80,
        reason: 'Alternative ACE inhibitor with good tolerability',
        sideEffects: 'Similar profile',
        cost: 'Similar',
      },
    ],
  },
];

const AIMedicationSuggestions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAlternative, setSelectedAlternative] = useState(null);

  const handleSearch = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const foundMedicine = mockSuggestions.find(
        (med) => med.name.toLowerCase() === searchTerm.toLowerCase()
      );
      setSuggestions(foundMedicine);
      setLoading(false);
    }, 1000);
  };

  const handleConsultDoctor = (alternative) => {
    setSelectedAlternative(alternative);
    setOpenDialog(true);
  };

  const getConfidenceColor = (score) => {
    if (score >= 0.9) return 'success';
    if (score >= 0.7) return 'warning';
    return 'error';
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        AI Medication Suggestions
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Get AI-powered alternative medication suggestions based on your current prescriptions
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Enter your current medication"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={handleSearch}
              fullWidth
              sx={{ height: '56px' }}
            >
              Search Alternatives
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {suggestions && !loading && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Alternatives for {suggestions.name}
          </Typography>
          <Grid container spacing={3}>
            {suggestions.alternatives.map((alternative, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6">{alternative.name}</Typography>
                      <Chip
                        label={`${(alternative.confidence * 100).toFixed(0)}% Confidence`}
                        color={getConfidenceColor(alternative.confidence)}
                      />
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Reason for Suggestion
                        </Typography>
                        <Typography>{alternative.reason}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Side Effects
                        </Typography>
                        <Typography>{alternative.sideEffects}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Cost Comparison
                        </Typography>
                        <Typography>{alternative.cost}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="outlined"
                      startIcon={<PsychologyIcon />}
                      onClick={() => handleConsultDoctor(alternative)}
                    >
                      Consult Doctor
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {!suggestions && !loading && searchTerm && (
        <Alert severity="info">
          No suggestions found for "{searchTerm}". Please try a different medication name.
        </Alert>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Consult Doctor</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Would you like to consult a doctor about switching to {selectedAlternative?.name}?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Our doctors can provide personalized advice about this alternative medication and help you make an informed decision.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Schedule Consultation
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AIMedicationSuggestions; 