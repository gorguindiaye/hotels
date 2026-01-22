import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Breadcrumbs,
  Link,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { hotelsAPI } from '../utils/hotelsAPI';

const HotelsPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'table'

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    country: '',
    email: '',
    phone: '',
    website: '',
    star_rating: 3,
    number_of_rooms: 0,
    price_per_night: 0,
  });

  const userRole = localStorage.getItem('user_role');
  const isAdmin = userRole === 'admin';

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await hotelsAPI.getHotels();
      setHotels(response.data);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement des hôtels');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (hotel = null) => {
    if (hotel) {
      setFormData(hotel);
      setEditingId(hotel.id);
    } else {
      setFormData({
        name: '',
        description: '',
        address: '',
        city: '',
        country: '',
        email: '',
        phone: '',
        website: '',
        star_rating: 3,
        number_of_rooms: 0,
        price_per_night: 0,
      });
      setEditingId(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await hotelsAPI.updateHotel(editingId, formData);
        setSuccess('Hôtel mis à jour avec succès');
      } else {
        await hotelsAPI.createHotel(formData);
        setSuccess('Hôtel créé avec succès');
      }
      handleCloseDialog();
      fetchHotels();
    } catch (err) {
      setError(err.response?.data?.detail || 'Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id) => {
    try {
      await hotelsAPI.deleteHotel(id);
      setSuccess('Hôtel supprimé avec succès');
      setDeleteConfirm(null);
      fetchHotels();
    } catch (err) {
      setError('Erreur lors de la suppression');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'active': 'success',
      'inactive': 'default',
      'maintenance': 'warning',
    };
    return colors[status] || 'default';
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Breadcrumb */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link underline="hover" color="inherit" href="/dashboard">
          Dashboard
        </Link>
        <Typography color="textPrimary">Hôtels</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Gestion des Hôtels ({hotels.length})
        </Typography>
        {isAdmin && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Ajouter un hôtel
          </Button>
        )}
      </Box>

      {/* Messages */}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      {/* View Mode Toggle */}
      <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
        <Button
          variant={viewMode === 'grid' ? 'contained' : 'outlined'}
          onClick={() => setViewMode('grid')}
          size="small"
        >
          Grille
        </Button>
        <Button
          variant={viewMode === 'table' ? 'contained' : 'outlined'}
          onClick={() => setViewMode('table')}
          size="small"
        >
          Tableau
        </Button>
      </Box>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <Grid container spacing={3}>
          {hotels.map((hotel) => (
            <Grid item xs={12} sm={6} md={4} key={hotel.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {hotel.image && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={hotel.image}
                    alt={hotel.name}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {hotel.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    {hotel.city}, {hotel.country}
                  </Typography>
                  <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                      label={`⭐ ${hotel.star_rating}`}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      label={hotel.status === 'active' ? 'Actif' : 'Inactif'}
                      size="small"
                      color={getStatusColor(hotel.status)}
                    />
                  </Box>
                  <Typography variant="body2">
                    <strong>{hotel.price_per_night} XOF</strong>/nuit
                  </Typography>
                </CardContent>

                {isAdmin && (
                  <Box sx={{ p: 2, display: 'flex', gap: 1, justifyContent: 'space-between' }}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleOpenDialog(hotel)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setDeleteConfirm(hotel.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.light' }}>
                <TableCell>Nom</TableCell>
                <TableCell>Ville</TableCell>
                <TableCell align="right">Prix/nuit</TableCell>
                <TableCell>Étoiles</TableCell>
                <TableCell>Statut</TableCell>
                {isAdmin && <TableCell align="center">Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {hotels.map((hotel) => (
                <TableRow key={hotel.id}>
                  <TableCell>{hotel.name}</TableCell>
                  <TableCell>{hotel.city}</TableCell>
                  <TableCell align="right">{hotel.price_per_night} XOF</TableCell>
                  <TableCell>⭐ {hotel.star_rating}</TableCell>
                  <TableCell>
                    <Chip
                      label={hotel.status === 'active' ? 'Actif' : 'Inactif'}
                      size="small"
                      color={getStatusColor(hotel.status)}
                    />
                  </TableCell>
                  {isAdmin && (
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleOpenDialog(hotel)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => setDeleteConfirm(hotel.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Dialog Ajouter/Éditer */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingId ? 'Modifier l\'hôtel' : 'Ajouter un nouvel hôtel'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            label="Nom"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            label="Adresse"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Ville"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Pays"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Téléphone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Prix par nuit"
            name="price_per_night"
            type="number"
            value={formData.price_per_night}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Nombre d'étoiles"
            name="star_rating"
            type="number"
            inputProps={{ min: 1, max: 5 }}
            value={formData.star_rating}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleSave} variant="contained">
            {editingId ? 'Mettre à jour' : 'Créer'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          Êtes-vous sûr de vouloir supprimer cet hôtel ?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>Annuler</Button>
          <Button
            onClick={() => handleDelete(deleteConfirm)}
            color="error"
            variant="contained"
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HotelsPage;
