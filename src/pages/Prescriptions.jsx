import { useState, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
} from '@mui/material';
import {
  CameraAlt as CameraIcon,
  Upload as UploadIcon,
  Delete as DeleteIcon,
  DocumentScanner as ScanIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import NavigationButtons from '../components/NavigationButtons';

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [scanning, setScanning] = useState(false);
  const fileInputRef = useRef(null);

  const handleScan = () => {
    // In a real app, this would activate the device camera
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      // Simulating a scanned prescription
      const newPrescription = {
        id: Date.now(),
        date: new Date(),
        image: '/path/to/scanned/image.jpg',
        status: 'Scanned',
      };
      setPrescriptions([newPrescription, ...prescriptions]);
    }, 2000);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPrescription = {
          id: Date.now(),
          date: new Date(),
          image: e.target.result,
          status: 'Uploaded',
        };
        setPrescriptions([newPrescription, ...prescriptions]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id) => {
    setPrescriptions(prescriptions.filter(prescription => prescription.id !== id));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <NavigationButtons prevPath="/dashboard" nextPath="/health-score" />
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Prescription Scanner
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Scan or upload your prescriptions for digital storage
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<CameraIcon />}
              onClick={handleScan}
              disabled={scanning}
            >
              {scanning ? 'Scanning...' : 'Scan Prescription'}
            </Button>
            <Button
              variant="outlined"
              startIcon={<UploadIcon />}
              onClick={() => fileInputRef.current.click()}
            >
              Upload Prescription
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              hidden
              accept="image/*"
              onChange={handleFileUpload}
            />
          </Paper>
        </Grid>

        {prescriptions.length === 0 ? (
          <Grid item xs={12}>
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <ScanIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No Prescriptions Yet
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                Start by scanning or uploading a prescription
              </Typography>
            </Paper>
          </Grid>
        ) : (
          prescriptions.map((prescription) => (
            <Grid item xs={12} md={6} key={prescription.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ScanIcon sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      Prescription - {prescription.date.toLocaleDateString()}
                    </Typography>
                  </Box>
                  {prescription.image && (
                    <Box
                      component="img"
                      src={prescription.image}
                      alt="Prescription"
                      sx={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: 300,
                        objectFit: 'contain',
                        borderRadius: 1,
                      }}
                    />
                  )}
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Status: {prescription.status}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => handleDelete(prescription.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton>
                    <SaveIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Prescriptions; 