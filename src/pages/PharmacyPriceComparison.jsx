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
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Tooltip,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  LocalOffer as LocalOfferIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import NavigationButtons from '../components/NavigationButtons';

const PharmacyPriceComparison = () => {
  const [pharmacies, setPharmacies] = useState([
    {
      id: 1,
      name: 'CVS Pharmacy',
      medication: 'Aspirin',
      alternates: ['Ecosprin', 'Disprin'],
      price: 5.99,
      alternatesPrices: [4.99, 6.99],
      distance: '0.5 miles',
      address: '123 Main St, City, State',
    },
    {
      id: 2,
      name: 'Walgreens',
      medication: 'Aspirin',
      alternates: ['Ecosprin', 'Disprin'],
      price: 4.99,
      alternatesPrices: [5.99, 5.49],
      distance: '1.2 miles',
      address: '456 Oak St, City, State',
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingPharmacy, setEditingPharmacy] = useState(null);
  const [newPharmacy, setNewPharmacy] = useState({
    name: '',
    medication: '',
    alternates: [],
    price: '',
    alternatesPrices: [],
    distance: '',
    address: '',
  });

  const findLowestPrice = (pharmacies, medication) => {
    return Math.min(...pharmacies.map(p => p.price));
  };

  const isLowestPrice = (price, medication) => {
    const lowestPrice = findLowestPrice(pharmacies, medication);
    return price === lowestPrice;
  };

  const handleAddPharmacy = () => {
    if (editingPharmacy !== null) {
      setPharmacies(pharmacies.map((pharmacy) =>
        pharmacy.id === editingPharmacy ? { ...newPharmacy, id: pharmacy.id } : pharmacy
      ));
    } else {
      setPharmacies([...pharmacies, { ...newPharmacy, id: Date.now() }]);
    }
    handleCloseDialog();
  };

  const handleDeletePharmacy = (id) => {
    setPharmacies(pharmacies.filter((pharmacy) => pharmacy.id !== id));
  };

  const handleEditPharmacy = (pharmacy) => {
    setEditingPharmacy(pharmacy.id);
    setNewPharmacy(pharmacy);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingPharmacy(null);
    setNewPharmacy({
      name: '',
      medication: '',
      alternates: [],
      price: '',
      alternatesPrices: [],
      distance: '',
      address: '',
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <NavigationButtons prevPath="/dashboard" nextPath="/nearby-hospitals" />
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Pharmacy Price Comparison
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Compare medication prices and find alternatives across different pharmacies
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Search Medication"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Location"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
              fullWidth
            >
              Add Pharmacy
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        💡 Tip: Look for items marked with a star (⭐) for the most affordable options!
      </Alert>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pharmacy Name</TableCell>
              <TableCell>Medication</TableCell>
              <TableCell>Alternatives</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Distance</TableCell>
              <TableCell>Address</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pharmacies.map((pharmacy) => (
              <TableRow 
                key={pharmacy.id}
                sx={isLowestPrice(pharmacy.price, pharmacy.medication) ? {
                  backgroundColor: 'rgba(76, 175, 80, 0.1)'
                } : {}}
              >
                <TableCell>{pharmacy.name}</TableCell>
                <TableCell>{pharmacy.medication}</TableCell>
                <TableCell>
                  {pharmacy.alternates.map((alt, index) => (
                    <Tooltip 
                      key={alt} 
                      title={`Price: $${pharmacy.alternatesPrices[index]}`}
                      arrow
                    >
                      <Chip
                        label={alt}
                        size="small"
                        icon={<LocalOfferIcon />}
                        sx={{ m: 0.5 }}
                      />
                    </Tooltip>
                  ))}
                </TableCell>
                <TableCell align="right">
                  ${pharmacy.price}
                  {isLowestPrice(pharmacy.price, pharmacy.medication) && (
                    <Tooltip title="Best Price" arrow>
                      <StarIcon sx={{ color: 'warning.main', ml: 1 }} />
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell align="right">{pharmacy.distance}</TableCell>
                <TableCell>{pharmacy.address}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEditPharmacy(pharmacy)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeletePharmacy(pharmacy.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingPharmacy !== null ? 'Edit Pharmacy' : 'Add New Pharmacy'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Pharmacy Name"
              fullWidth
              value={newPharmacy.name}
              onChange={(e) =>
                setNewPharmacy({ ...newPharmacy, name: e.target.value })
              }
            />
            <TextField
              label="Medication"
              fullWidth
              value={newPharmacy.medication}
              onChange={(e) =>
                setNewPharmacy({ ...newPharmacy, medication: e.target.value })
              }
            />
            <TextField
              label="Alternative Medications (comma-separated)"
              fullWidth
              value={newPharmacy.alternates.join(', ')}
              onChange={(e) =>
                setNewPharmacy({ 
                  ...newPharmacy, 
                  alternates: e.target.value.split(',').map(item => item.trim())
                })
              }
              helperText="Enter alternative medications separated by commas"
            />
            <TextField
              label="Price"
              type="number"
              fullWidth
              value={newPharmacy.price}
              onChange={(e) =>
                setNewPharmacy({ ...newPharmacy, price: e.target.value })
              }
            />
            <TextField
              label="Alternative Prices (comma-separated)"
              fullWidth
              value={newPharmacy.alternatesPrices.join(', ')}
              onChange={(e) =>
                setNewPharmacy({ 
                  ...newPharmacy, 
                  alternatesPrices: e.target.value.split(',').map(price => parseFloat(price.trim()))
                })
              }
              helperText="Enter prices for alternative medications separated by commas"
            />
            <TextField
              label="Distance"
              fullWidth
              value={newPharmacy.distance}
              onChange={(e) =>
                setNewPharmacy({ ...newPharmacy, distance: e.target.value })
              }
            />
            <TextField
              label="Address"
              fullWidth
              value={newPharmacy.address}
              onChange={(e) =>
                setNewPharmacy({ ...newPharmacy, address: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleAddPharmacy}
            variant="contained"
            disabled={!newPharmacy.name || !newPharmacy.medication}
          >
            {editingPharmacy !== null ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PharmacyPriceComparison; 