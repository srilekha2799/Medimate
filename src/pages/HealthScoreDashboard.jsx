import { useState } from 'react';
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
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  LocalHospital as HospitalIcon,
  AccessTime as TimeIcon,
  TrendingUp as TrendingIcon,
  Lightbulb as TipsIcon,
  Download as DownloadIcon,
  WaterDrop as WaterIcon,
  Bedtime as SleepIcon,
  FitnessCenter as ExerciseIcon,
} from '@mui/icons-material';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import NavigationButtons from '../components/NavigationButtons';

// Mock data for demonstration
const mockData = {
  adherenceScore: 85,
  weeklyReport: {
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    adherence: [90, 85, 100, 80, 95, 70, 100],
  },
  monthlyReport: {
    weeks: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    adherence: [85, 90, 80, 95],
  },
  healthTips: [
    {
      icon: <WaterIcon />,
      text: 'Drink at least 8 glasses of water daily',
      priority: 'high',
    },
    {
      icon: <SleepIcon />,
      text: 'Get 7-8 hours of sleep each night',
      priority: 'medium',
    },
    {
      icon: <ExerciseIcon />,
      text: 'Take a 30-minute walk daily',
      priority: 'low',
    },
  ],
};

const HealthScoreDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const exportToPDF = () => {
    setLoading(true);
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('Health Score Report', 20, 20);
    
    // Add adherence score
    doc.setFontSize(16);
    doc.text(`Adherence Score: ${mockData.adherenceScore}%`, 20, 40);
    
    // Add weekly report table
    doc.autoTable({
      startY: 50,
      head: [['Day', 'Adherence (%)']],
      body: mockData.weeklyReport.days.map((day, index) => [
        day,
        mockData.weeklyReport.adherence[index],
      ]),
    });
    
    // Add health tips
    doc.text('Health Tips:', 20, doc.autoTable.previous.finalY + 20);
    mockData.healthTips.forEach((tip, index) => {
      doc.text(`- ${tip.text}`, 20, doc.autoTable.previous.finalY + 30 + (index * 10));
    });
    
    doc.save('health_score_report.pdf');
    setLoading(false);
  };

  const getAdherenceColor = (score) => {
    if (score >= 90) return 'success.main';
    if (score >= 70) return 'warning.main';
    return 'error.main';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <NavigationButtons prevPath="/dashboard" nextPath="/prescriptions" />
      
      <Typography variant="h4" gutterBottom>
        Health Score Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Track your medication adherence and get personalized health insights
      </Typography>

      <Grid container spacing={3}>
        {/* Adherence Score Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <HospitalIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Adherence Score</Typography>
              </Box>
              <Typography
                variant="h2"
                sx={{ color: getAdherenceColor(mockData.adherenceScore) }}
              >
                {mockData.adherenceScore}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Based on your medication history
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Reports Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={selectedTab} onChange={handleTabChange}>
                <Tab label="Weekly Report" />
                <Tab label="Monthly Report" />
              </Tabs>
            </Box>
            <Box sx={{ p: 2 }}>
              {selectedTab === 0 ? (
                <List>
                  {mockData.weeklyReport.days.map((day, index) => (
                    <ListItem key={day}>
                      <ListItemIcon>
                        <TimeIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={day}
                        secondary={`${mockData.weeklyReport.adherence[index]}% adherence`}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <List>
                  {mockData.monthlyReport.weeks.map((week, index) => (
                    <ListItem key={week}>
                      <ListItemIcon>
                        <TrendingIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={week}
                        secondary={`${mockData.monthlyReport.adherence[index]}% adherence`}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Health Tips Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TipsIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Health Tips</Typography>
              </Box>
              <List>
                {mockData.healthTips.map((tip, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>{tip.icon}</ListItemIcon>
                    <ListItemText primary={tip.text} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Export Button */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Tooltip title="Export Report as PDF">
          <IconButton
            onClick={exportToPDF}
            disabled={loading}
            color="primary"
            size="large"
          >
            {loading ? <CircularProgress size={24} /> : <DownloadIcon />}
          </IconButton>
        </Tooltip>
      </Box>
    </Container>
  );
};

export default HealthScoreDashboard; 