import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  CircularProgress,
} from '@mui/material';

function UserForm({ initialData, onSubmit, loading, errors }) {
  const [formData, setFormData] = useState(
    initialData || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      age: '',
      gender: '',
      status: 'Active',
      address: '',
      profile: '',
    }
  );
  const [previewImage, setPreviewImage] = useState(initialData?.profile || '');

  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        age: initialData.age || '',
        gender: initialData.gender || '',
        status: initialData.status || 'Active',
        address: initialData.address || '',
        profile: initialData.profile || '',
      });
      setPreviewImage(initialData.profile || '');
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.onload = () => {
          const maxSize = 800;
          let { width, height } = image;

          if (width > height && width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          } else if (height >= width && height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const context = canvas.getContext('2d');
          if (!context) {
            return;
          }

          context.drawImage(image, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.75);

          setFormData((prev) => ({
            ...prev,
            profile: compressed,
          }));
          setPreviewImage(compressed);
        };
        image.src = typeof reader.result === 'string' ? reader.result : '';
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={!!errors?.firstName}
            helperText={errors?.firstName}
            placeholder="Enter FirstName"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={!!errors?.lastName}
            helperText={errors?.lastName}
            placeholder="Enter LastName"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors?.email}
            helperText={errors?.email}
            placeholder="Enter Email"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Mobile"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={!!errors?.phone}
            helperText={errors?.phone}
            placeholder="Enter Mobile"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors?.gender}>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
              Gender
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FormControlLabel
                control={<Radio />}
                label="Male"
                value="Male"
                name="gender"
                checked={formData.gender === 'Male'}
                onChange={handleChange}
              />
              <FormControlLabel
                control={<Radio />}
                label="Female"
                value="Female"
                name="gender"
                checked={formData.gender === 'Female'}
                onChange={handleChange}
              />
            </Box>
            {errors?.gender && <FormHelperText>{errors.gender}</FormHelperText>}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Select Your Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              label="Select Your Status"
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box>
            <TextField
              fullWidth
              type="file"
              inputProps={{ accept: 'image/*' }}
              onChange={handleFileChange}
              sx={{
                '& input[type="file"]': {
                  cursor: 'pointer',
                },
              }}
              label="Select Your Profile"
              InputLabelProps={{ shrink: true }}
            />
            {previewImage && (
              <Box
                component="img"
                src={previewImage}
                alt="Profile preview"
                sx={{
                  mt: 1.5,
                  width: 72,
                  height: 72,
                  objectFit: 'cover',
                  borderRadius: '50%',
                  border: '1px solid #e0e0e0',
                }}
              />
            )}
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Enter Your Location"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter Your Location"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            error={!!errors?.age}
            helperText={errors?.age}
            placeholder="Enter Age"
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: '#a84040',
              color: 'white',
              py: 1.4,
              borderRadius: 1.5,
              fontSize: '16px',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#8a3333',
              },
              '&:disabled': {
                backgroundColor: '#cccccc',
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserForm;
