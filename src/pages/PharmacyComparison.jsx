import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Tooltip,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocalPharmacy as PharmacyIcon,
  CompareArrows as CompareIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

// Mock data for pharmacies and medicines
const mockPharmacies = [
  { id: 1, name: 'MedPlus Pharmacy', location: 'Downtown', rating: 4.5 },
  { id: 2, name: 'Apollo Pharmacy', location: 'Mall Road', rating: 4.2 },
  { id: 3, name: 'Wellness Pharmacy', location: 'Central Square', rating: 4.0 },
  { id: 4, name: 'HealthCare Plus', location: 'North End', rating: 4.3 },
];

const mockMedicines = [
  {
    id: 1,
    name: 'Paracetamol',
    alternatives: ['Acetaminophen', 'Tylenol'],
    variants: [
      { dosage: '500mg', form: 'Tablet' },
      { dosage: '650mg', form: 'Tablet' },
    ],
    prices: [
      { pharmacyId: 1, price: 10, discount: 5, stock: 50 },
      { pharmacyId: 2, price: 12, discount: 0, stock: 30 },
      { pharmacyId: 3, price: 9, discount: 10, stock: 20 },
      { pharmacyId: 4, price: 11, discount: 0, stock: 40 },
    ],
  },
  {
    id: 2,
    name: 'Ibuprofen',
    alternatives: ['Advil', 'Motrin'],
    variants: [
      { dosage: '200mg', form: 'Tablet' },
      { dosage: '400mg', form: 'Tablet' },
    ],
    prices: [
      { pharmacyId: 1, price: 15, discount: 0, stock: 25 },
      { pharmacyId: 2, price: 14, discount: 5, stock: 35 },
      { pharmacyId: 3, price: 16, discount: 0, stock: 15 },
      { pharmacyId: 4, price: 13, discount: 10, stock: 30 },
    ],
  },
];

const PharmacyComparison = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [selectedDosage, setSelectedDosage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const foundMedicine = mockMedicines.find(
        (med) => med.name.toLowerCase() === searchTerm.toLowerCase()
      );
      setSelectedMedicine(foundMedicine);
      setLoading(false);
    }, 1000);
  };

  const getPharmacyDetails = (pharmacyId) => {
    return mockPharmacies.find((pharmacy) => pharmacy.id === pharmacyId);
  };

  const calculateFinalPrice = (price, discount) => {
    return price - (price * discount) / 100;
  };

  const getBestPrice = () => {
    if (!selectedMedicine) return null;
    return selectedMedicine.prices.reduce((best, current) => {
      const currentPrice = calculateFinalPrice(current.price, current.discount);
      const bestPrice = calculateFinalPrice(best.price, best.discount);
      return currentPrice < bestPrice ? current : best;
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Pharmacy Price Comparison
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Search Medicine"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={handleSearch}
              fullWidth
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {selectedMedicine && !loading && (
        <>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              {selectedMedicine.name}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Select Dosage</InputLabel>
                  <Select
                    value={selectedDosage}
                    onChange={(e) => setSelectedDosage(e.target.value)}
                    label="Select Dosage"
                  >
                    {selectedMedicine.variants.map((variant, index) => (
                      <MenuItem
                        key={index}
                        value={`${variant.dosage} ${variant.form}`}
                      >
                        {variant.dosage} {variant.form}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  onClick={() => setShowAlternatives(!showAlternatives)}
                  startIcon={<CompareIcon />}
                  fullWidth
                >
                  {showAlternatives ? 'Hide Alternatives' : 'Show Alternatives'}
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {showAlternatives && (
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Alternative Medicines
              </Typography>
              <Grid container spacing={2}>
                {selectedMedicine.alternatives.map((alternative, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">{alternative}</Typography>
                        <Typography color="text.secondary">
                          Similar to {selectedMedicine.name}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">View Details</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Pharmacy</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Discount</TableCell>
                  <TableCell align="right">Final Price</TableCell>
                  <TableCell align="right">Stock</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedMedicine.prices.map((price, index) => {
                  const pharmacy = getPharmacyDetails(price.pharmacyId);
                  const finalPrice = calculateFinalPrice(price.price, price.discount);
                  const isBestPrice = getBestPrice() === price;

                  return (
                    <TableRow
                      key={index}
                      sx={{
                        bgcolor: isBestPrice ? 'action.hover' : 'inherit',
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <PharmacyIcon sx={{ mr: 1 }} />
                          {pharmacy.name}
                          <Tooltip title={pharmacy.location}>
                            <IconButton size="small">
                              <InfoIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                      <TableCell align="right">${price.price}</TableCell>
                      <TableCell align="right">
                        {price.discount > 0 ? (
                          <Chip
                            label={`${price.discount}% off`}
                            color="success"
                            size="small"
                          />
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell align="right">${finalPrice}</TableCell>
                      <TableCell align="right">
                        <Chip
                          label={price.stock}
                          color={price.stock > 20 ? 'success' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Button variant="outlined" size="small">
                          Order
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {!selectedMedicine && !loading && searchTerm && (
        <Alert severity="info">
          No medicine found with the name "{searchTerm}". Please try a different
          search term.
        </Alert>
      )}
    </Container>
  );
};

export default PharmacyComparison; 