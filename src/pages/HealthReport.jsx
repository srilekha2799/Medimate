import { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  TextField,
  Grid,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  FavoriteOutlined,
  LocalHospital,
  Restaurant,
  DirectionsRun,
  Opacity,
} from '@mui/icons-material';

const HealthReport = () => {
  const [healthData, setHealthData] = useState({
    bloodPressure: '',
    heartRate: '',
    weight: '',
    height: '',
    medications: '',
    symptoms: '',
  });

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setHealthData({
      ...healthData,
      [e.target.name]: e.target.value,
    });
  };

  const generateReport = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const bmi = calculateBMI(healthData.weight, healthData.height);
      const bmiCategory = getBMICategory(bmi);
      
      setReport({
        bmi: bmi.toFixed(1),
        bmiCategory,
        recommendations: generateRecommendations(bmi, healthData),
        healthScore: calculateHealthScore(healthData),
      });
      setLoading(false);
    }, 1000);
  };

  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Healthy';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  const calculateHealthScore = (data) => {
    // Simple health score calculation (example)
    return Math.min(100, Math.max(0, 85 - (data.symptoms ? data.symptoms.length : 0) * 5));
  };

  const generateRecommendations = (bmi, data) => {
    const recommendations = [];
    
    if (bmi < 18.5) {
      recommendations.push('Consider increasing your caloric intake with healthy foods');
    } else if (bmi > 25) {
      recommendations.push('Try to incorporate more physical activity into your daily routine');
    }

    if (data.symptoms) {
      recommendations.push('Discuss your symptoms with your healthcare provider');
    }

    recommendations.push('Stay hydrated and maintain a balanced diet');
    recommendations.push('Get 7-9 hours of sleep each night');
    
    return recommendations;
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Health Report Generator
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Blood Pressure (e.g., 120/80)"
              name="bloodPressure"
              value={healthData.bloodPressure}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Heart Rate (bpm)"
              name="heartRate"
              type="number"
              value={healthData.heartRate}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Weight (kg)"
              name="weight"
              type="number"
              value={healthData.weight}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Height (cm)"
              name="height"
              type="number"
              value={healthData.height}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Current Medications"
              name="medications"
              multiline
              rows={2}
              value={healthData.medications}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Any Symptoms?"
              name="symptoms"
              multiline
              rows={2}
              value={healthData.symptoms}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={generateReport}
            disabled={loading}
          >
            Generate Health Report
          </Button>
        </Box>
      </Paper>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {report && !loading && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom color="primary">
            Your Health Summary
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Health Score: {report.healthScore}%
            </Typography>
            <CircularProgress
              variant="determinate"
              value={report.healthScore}
              size={80}
              thickness={4}
              sx={{ mb: 2 }}
            />
          </Box>

          <List>
            <ListItem>
              <ListItemIcon>
                <FavoriteOutlined color="error" />
              </ListItemIcon>
              <ListItemText 
                primary="BMI Status"
                secondary={`${report.bmi} - ${report.bmiCategory}`}
              />
            </ListItem>
            
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Recommendations:
            </Typography>
            {report.recommendations.map((rec, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  {index % 2 === 0 ? <LocalHospital color="primary" /> : <DirectionsRun color="success" />}
                </ListItemIcon>
                <ListItemText primary={rec} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  );
};

export default HealthReport; 