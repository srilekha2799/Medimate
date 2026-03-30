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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import NavigationButtons from '../components/NavigationButtons';

const HealthScore = () => {
  const [healthMetrics, setHealthMetrics] = useState([
    {
      id: 1,
      name: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      date: new Date(),
      trend: 'stable',
    },
    {
      id: 2,
      name: 'Blood Sugar',
      value: '90',
      unit: 'mg/dL',
      date: new Date(),
      trend: 'improving',
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingMetric, setEditingMetric] = useState(null);
  const [newMetric, setNewMetric] = useState({
    name: '',
    value: '',
    unit: '',
    date: new Date(),
    trend: 'stable',
  });

  const handleAddMetric = () => {
    if (editingMetric !== null) {
      setHealthMetrics(healthMetrics.map((metric) =>
        metric.id === editingMetric ? { ...newMetric, id: metric.id } : metric
      ));
    } else {
      setHealthMetrics([...healthMetrics, { ...newMetric, id: Date.now() }]);
    }
    handleCloseDialog();
  };

  const handleDeleteMetric = (id) => {
    setHealthMetrics(healthMetrics.filter((metric) => metric.id !== id));
  };

  const handleEditMetric = (metric) => {
    setEditingMetric(metric.id);
    setNewMetric(metric);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingMetric(null);
    setNewMetric({
      name: '',
      value: '',
      unit: '',
      date: new Date(),
      trend: 'stable',
    });
  };

  const calculateHealthScore = () => {
    // This is a simple example - you can implement a more sophisticated scoring system
    return 85; // Example score
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <NavigationButtons prevPath="/reminders" nextPath="/prescriptions" />
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Health Score
        </Typography>
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h2" component="div" sx={{ mr: 2 }}>
                {calculateHealthScore()}
              </Typography>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" color="text.secondary">
                  Overall Health Score
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={calculateHealthScore()}
                  sx={{ height: 10, borderRadius: 5 }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" color="primary">
          Health Metrics
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Add Metric
        </Button>
      </Box>

      <Grid container spacing={3}>
        {healthMetrics.map((metric) => (
          <Grid item xs={12} sm={6} md={4} key={metric.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {metric.name}
                </Typography>
                <Typography variant="h4" component="div" sx={{ mb: 1 }}>
                  {metric.value} {metric.unit}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Last updated: {metric.date.toLocaleDateString()}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <TrendingUpIcon
                    sx={{
                      color:
                        metric.trend === 'improving'
                          ? 'success.main'
                          : metric.trend === 'stable'
                          ? 'warning.main'
                          : 'error.main',
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      ml: 1,
                      color:
                        metric.trend === 'improving'
                          ? 'success.main'
                          : metric.trend === 'stable'
                          ? 'warning.main'
                          : 'error.main',
                    }}
                  >
                    {metric.trend.charAt(0).toUpperCase() + metric.trend.slice(1)}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleEditMetric(metric)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteMetric(metric.id)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingMetric !== null ? 'Edit Health Metric' : 'Add New Health Metric'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Metric Name"
              fullWidth
              value={newMetric.name}
              onChange={(e) =>
                setNewMetric({ ...newMetric, name: e.target.value })
              }
            />
            <TextField
              label="Value"
              fullWidth
              value={newMetric.value}
              onChange={(e) =>
                setNewMetric({ ...newMetric, value: e.target.value })
              }
            />
            <TextField
              label="Unit"
              fullWidth
              value={newMetric.unit}
              onChange={(e) =>
                setNewMetric({ ...newMetric, unit: e.target.value })
              }
            />
            <FormControl fullWidth>
              <InputLabel>Trend</InputLabel>
              <Select
                value={newMetric.trend}
                label="Trend"
                onChange={(e) =>
                  setNewMetric({ ...newMetric, trend: e.target.value })
                }
              >
                <MenuItem value="improving">Improving</MenuItem>
                <MenuItem value="stable">Stable</MenuItem>
                <MenuItem value="declining">Declining</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleAddMetric}
            variant="contained"
            disabled={!newMetric.name || !newMetric.value}
          >
            {editingMetric !== null ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HealthScore; 