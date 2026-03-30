import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Medications from './pages/Medications';
import VoiceSettings from './pages/VoiceSettings';
import PharmacyComparison from './pages/PharmacyComparison';
import AIMedicationSuggestions from './pages/AIMedicationSuggestions';
import HealthScoreDashboard from './pages/HealthScoreDashboard';
import NearbyHospitals from './pages/NearbyHospitals';
import ProfileSettings from './pages/ProfileSettings';
import AboutHelp from './pages/AboutHelp';
import PharmacyPriceComparison from './pages/PharmacyPriceComparison';
import Prescriptions from './pages/Prescriptions';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4568AD', // Sailing blue
      light: '#B7C3E8', // Lilac blue
      dark: '#081F44', // Night time
    },
    secondary: {
      main: '#8EA2D7', // Solid blue
      light: '#B7C3E8', // Lilac blue
      dark: '#1F3F74', // Dive
    },
    error: {
      main: '#FF6B6B',
      light: '#FF8A8A',
      dark: '#FF4D4D',
    },
    warning: {
      main: '#FFA726',
      light: '#FFB74D',
      dark: '#F57C00',
    },
    success: {
      main: '#4568AD', // Using sailing blue for success
      light: '#8EA2D7',
      dark: '#1F3F74',
    },
    info: {
      main: '#B7C3E8', // Lilac blue
      light: '#D1D9F0',
      dark: '#8EA2D7',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#081F44', // Night time
      secondary: '#4568AD', // Sailing blue
    },
    grey: {
      50: '#F8F9FC',
      100: '#B7C3E8', // Lilac blue
      200: '#8EA2D7', // Solid blue
      300: '#4568AD', // Sailing blue
      400: '#1F3F74', // Dive
      500: '#14366D', // Deep sea
      600: '#081F44', // Night time
      700: '#061833',
      800: '#041228',
      900: '#020B1C',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      color: '#081F44', // Night time
    },
    h2: {
      color: '#081F44',
    },
    h3: {
      color: '#081F44',
    },
    h4: {
      color: '#081F44',
    },
    h5: {
      color: '#081F44',
    },
    h6: {
      color: '#081F44',
    },
    body1: {
      color: '#1F3F74', // Dive
    },
    body2: {
      color: '#4568AD', // Sailing blue
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          boxShadow: '0 2px 4px rgba(31, 63, 116, 0.25)',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(31, 63, 116, 0.35)',
            backgroundColor: '#1F3F74', // Dive
          },
        },
        outlined: {
          borderColor: '#4568AD', // Sailing blue
          '&:hover': {
            borderColor: '#1F3F74', // Dive
            backgroundColor: 'rgba(31, 63, 116, 0.08)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(31, 63, 116, 0.08)',
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(31, 63, 116, 0.05)',
          background: '#FFFFFF',
          border: '1px solid #B7C3E8', // Lilac blue
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: '#FFFFFF',
            '& fieldset': {
              borderColor: '#B7C3E8', // Lilac blue
            },
            '&:hover fieldset': {
              borderColor: '#4568AD', // Sailing blue
            },
            '&.Mui-focused fieldset': {
              borderColor: '#4568AD', // Sailing blue
            },
          },
          '& .MuiInputLabel-root': {
            color: '#4568AD', // Sailing blue
          },
          '& .MuiOutlinedInput-input': {
            color: '#081F44', // Night time
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          backgroundImage: 'linear-gradient(to right, #FFFFFF, #F8F9FC)',
          color: '#081F44', // Night time
          boxShadow: '0 2px 4px rgba(31, 63, 116, 0.05)',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          '&.Mui-checked': {
            color: '#4568AD', // Sailing blue
            '& + .MuiSwitch-track': {
              backgroundColor: '#8EA2D7', // Solid blue
            },
          },
        },
        track: {
          backgroundColor: '#B7C3E8', // Lilac blue
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: '#B7C3E8', // Lilac blue
        },
        barColorPrimary: {
          backgroundColor: '#4568AD', // Sailing blue
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#B7C3E8', // Lilac blue
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/medications" element={<Medications />} />
          <Route path="/voice-settings" element={<VoiceSettings />} />
          <Route path="/pharmacy-comparison" element={<PharmacyComparison />} />
          <Route path="/ai-medication-suggestions" element={<AIMedicationSuggestions />} />
          <Route path="/health-score" element={<HealthScoreDashboard />} />
          <Route path="/nearby-hospitals" element={<NearbyHospitals />} />
          <Route path="/pharmacy-price-comparison" element={<PharmacyPriceComparison />} />
          <Route path="/prescriptions" element={<Prescriptions />} />
          <Route path="/profile-settings" element={<ProfileSettings />} />
          <Route path="/about-help" element={<AboutHelp />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 