import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Box, Button, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { toast } from 'react-toastify';
import UserForm from '../components/UserForm';
import Loader from '../components/Loader';
import { validateForm } from '../utils/validation';
import { userAPI } from '../hooks/useUsers';

function AddEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [fetchingData, setFetchingData] = useState(!!id);

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await userAPI.getById(id);
      setInitialData(response.data.data);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch user');
      navigate('/');
    } finally {
      setFetchingData(false);
    }
  };

  const handleSubmit = async (formData) => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fix the errors');
      return;
    }

    setLoading(true);
    try {
      if (id) {
        await userAPI.update(id, formData);
        toast.success('User updated successfully');
      } else {
        await userAPI.create(formData);
        toast.success('User created successfully');
      }
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Failed to save user');
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData) {
    return <Loader />;
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            backgroundColor: '#1a1a1a',
            color: 'white',
            px: 2.5,
            py: 2,
            borderRadius: 2,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          MERN stack developer practical task
        </Box>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 10px 24px rgba(15, 23, 42, 0.08)',
        }}
      >
        <Box sx={{ mb: 2.5, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            size="small"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/')}
            sx={{ color: '#a84040', textTransform: 'none', fontWeight: 600 }}
          >
            Back
          </Button>
        </Box>

        <Typography variant="h5" sx={{ mb: 1, fontWeight: 700, textAlign: 'center' }}>
          {id ? 'Edit Your Details' : 'Register Your Details'}
        </Typography>

        <Box sx={{ textAlign: 'center', mb: { xs: 2.5, md: 3 } }}>
          <Typography variant="body2" color="text.secondary">
            {id ? 'Update your information' : 'Please fill in all required fields'}
          </Typography>
        </Box>

        <UserForm
          initialData={initialData}
          onSubmit={handleSubmit}
          loading={loading}
          errors={errors}
        />
      </Paper>
    </Container>
  );
}

export default AddEditPage;
