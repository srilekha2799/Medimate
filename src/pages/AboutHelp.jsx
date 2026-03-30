import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Link,
  Button,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Info as InfoIcon,
  Help as HelpIcon,
  ContactSupport as ContactIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Chat as ChatIcon,
  Description as GuideIcon,
} from '@mui/icons-material';

const AboutHelp = () => {
  const faqs = [
    {
      question: 'What is Medimate?',
      answer: 'Medimate is a comprehensive healthcare tool designed to help users manage their medications, track health metrics, and access healthcare resources. Our platform combines medication management with AI-powered suggestions and health monitoring features.',
    },
    {
      question: 'How do I add my medications?',
      answer: 'You can add medications through the Medications page. Click the "Add Medication" button and fill in the required information, including medication name, dosage, frequency, and any special instructions.',
    },
    {
      question: 'How does the AI medication suggestion work?',
      answer: 'Our AI analyzes your current medications and suggests alternatives based on effectiveness, side effects, and cost. The suggestions include confidence scores and detailed comparisons to help you make informed decisions.',
    },
    {
      question: 'Is my health data secure?',
      answer: 'Yes, we take data security seriously. All health information is encrypted and stored securely. You can control your data sharing preferences in the Privacy Settings section.',
    },
    {
      question: 'How do I export my health reports?',
      answer: 'You can export your health reports as PDFs from the Health Score Dashboard. Click the download icon in the top right corner to generate and save your report.',
    },
  ];

  const features = [
    {
      title: 'Medication Management',
      description: 'Track and manage your medications with reminders and dosage tracking.',
    },
    {
      title: 'AI-Powered Suggestions',
      description: 'Get personalized medication alternatives and health recommendations.',
    },
    {
      title: 'Health Score Dashboard',
      description: 'Monitor your medication adherence and overall health metrics.',
    },
    {
      title: 'Nearby Healthcare',
      description: 'Find hospitals and pharmacies near your location.',
    },
    {
      title: 'Voice Integration',
      description: 'Use voice commands for hands-free medication management.',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        About Medimate
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Your comprehensive healthcare companion
      </Typography>

      <Grid container spacing={3}>
        {/* About Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <InfoIcon sx={{ mr: 1 }} />
              <Typography variant="h6">About Our Tool</Typography>
            </Box>
            <Typography paragraph>
              Medimate is designed to revolutionize how you manage your healthcare. Our platform combines
              advanced technology with user-friendly features to help you stay on top of your medications
              and health goals.
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper sx={{ p: 2, height: '100%' }}>
                    <Typography variant="subtitle1" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Usage Guides */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <GuideIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Usage Guides</Typography>
            </Box>
            <List>
              <ListItem>
                <ListItemIcon>
                  <GuideIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Getting Started Guide"
                  secondary="Learn how to set up your account and start using Medimate"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <GuideIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Medication Management Guide"
                  secondary="Step-by-step instructions for managing your medications"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <GuideIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Health Tracking Guide"
                  secondary="How to use our health monitoring features"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* FAQs */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <HelpIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Frequently Asked Questions</Typography>
            </Box>
            {faqs.map((faq, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        </Grid>

        {/* Support Contact */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ContactIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Contact Support</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<EmailIcon />}
                  href="mailto:support@medimate.com"
                >
                  Email Support
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<PhoneIcon />}
                  href="tel:+15551234567"
                >
                  Call Support
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<ChatIcon />}
                  onClick={() => window.open('https://medimate.com/chat', '_blank')}
                >
                  Live Chat
                </Button>
              </Grid>
            </Grid>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Our support team is available 24/7 to assist you with any questions or concerns.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutHelp; 