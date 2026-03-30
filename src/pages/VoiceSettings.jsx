import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import {
  VolumeUp as VolumeUpIcon,
  Mic as MicIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import NavigationButtons from '../components/NavigationButtons';

const VoiceSettings = () => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [volume, setVolume] = useState(1);
  const [snoozeTime, setSnoozeTime] = useState(10);
  const [isTestPlaying, setIsTestPlaying] = useState(false);
  const [settings, setSettings] = useState({
    voiceGender: 'female',
    reminderFrequency: 'normal',
    enableVoice: true,
    enableNotifications: true,
    voiceEnabled: true,
    voiceVolume: 80,
    voiceSpeed: 1,
    voiceType: 'female',
    reminderVoice: true,
    medicationVoice: true,
  });

  useEffect(() => {
    // Load voices when component mounts
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        // Set default voice based on gender preference
        const defaultVoice = availableVoices.find(
          (voice) => voice.name.toLowerCase().includes(settings.voiceGender)
        ) || availableVoices[0];
        setSelectedVoice(defaultVoice.name);
      }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Load saved settings from localStorage
    const savedSettings = JSON.parse(localStorage.getItem('voiceSettings')) || settings;
    setSettings(savedSettings);
  }, []);

  const handleVoiceChange = (event) => {
    setSelectedVoice(event.target.value);
    const newSettings = { ...settings, selectedVoice: event.target.value };
    setSettings(newSettings);
    localStorage.setItem('voiceSettings', JSON.stringify(newSettings));
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    const newSettings = { ...settings, volume: newValue };
    setSettings(newSettings);
    localStorage.setItem('voiceSettings', JSON.stringify(newSettings));
  };

  const handleSnoozeTimeChange = (event, newValue) => {
    setSnoozeTime(newValue);
    const newSettings = { ...settings, snoozeTime: newValue };
    setSettings(newSettings);
    localStorage.setItem('voiceSettings', JSON.stringify(newSettings));
  };

  const handleSettingChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleGenderChange = (event) => {
    const newSettings = {
      ...settings,
      voiceGender: event.target.value,
    };
    setSettings(newSettings);
    localStorage.setItem('voiceSettings', JSON.stringify(newSettings));
    
    // Update selected voice based on new gender preference
    const preferredVoice = voices.find(
      (voice) => voice.name.toLowerCase().includes(event.target.value)
    );
    if (preferredVoice) {
      setSelectedVoice(preferredVoice.name);
    }
  };

  const testVoice = () => {
    if (window.speechSynthesis && selectedVoice) {
      setIsTestPlaying(true);
      const utterance = new SpeechSynthesisUtterance(
        'This is a test of your voice reminder settings. How does this sound?'
      );
      const voice = voices.find((v) => v.name === selectedVoice);
      if (voice) {
        utterance.voice = voice;
        utterance.volume = volume;
        utterance.onend = () => setIsTestPlaying(false);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <NavigationButtons prevPath="/dashboard" nextPath="/medications" />
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Voice Settings
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Customize your voice notification preferences
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Voice Controls
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Enable Voice Notifications" />
                <ListItemSecondaryAction>
                  <Switch
                    checked={settings.voiceEnabled}
                    onChange={() => handleSettingChange('voiceEnabled')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText primary="Medication Reminders Voice" />
                <ListItemSecondaryAction>
                  <Switch
                    checked={settings.medicationVoice}
                    onChange={() => handleSettingChange('medicationVoice')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText primary="General Reminders Voice" />
                <ListItemSecondaryAction>
                  <Switch
                    checked={settings.reminderVoice}
                    onChange={() => handleSettingChange('reminderVoice')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Voice Customization
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Voice Volume"
                type="number"
                value={settings.voiceVolume}
                onChange={(e) => setSettings({ ...settings, voiceVolume: e.target.value })}
                InputProps={{
                  endAdornment: <VolumeUpIcon />,
                }}
              />
              <TextField
                label="Voice Speed"
                type="number"
                value={settings.voiceSpeed}
                onChange={(e) => setSettings({ ...settings, voiceSpeed: e.target.value })}
                InputProps={{
                  endAdornment: <SettingsIcon />,
                }}
              />
              <Button
                variant="contained"
                startIcon={<MicIcon />}
                onClick={testVoice}
              >
                Test Voice
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {!window.speechSynthesis && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          Your browser does not support speech synthesis. Some features may be limited.
        </Alert>
      )}
    </Container>
  );
};

export default VoiceSettings; 