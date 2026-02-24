import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Button,
  Typography,
  Paper,
  Divider,
  Stack,
  Avatar,
  Grid,
  Chip,
} from '@mui/material';
import { ArrowBack, Edit, Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import ConfirmDialog from '../components/ConfirmDialog';
import { userAPI } from '../hooks/useUsers';

function ViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await userAPI.getById(id);
      setUser(response.data.data);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch user');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await userAPI.delete(id);
      toast.success('User deleted successfully');
      setConfirmDialog(false);
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Failed to delete user');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            User not found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            The user record may have been deleted or is unavailable.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
            sx={{
              backgroundColor: '#a84040',
              '&:hover': { backgroundColor: '#8a3333' },
              textTransform: 'none',
            }}
          >
            Back to List
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, md: 5 } }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 4, md: 5 },
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Stack direction="row" spacing={2} alignItems="center" sx={{ minWidth: 0 }}>
            <Avatar
              src={user.profile || ''}
              sx={{
                width: { xs: 64, sm: 72 },
                height: { xs: 64, sm: 72 },
                backgroundColor: '#a84040',
                fontSize: 30,
              }}
            >
              {user.firstName.charAt(0)}
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  lineHeight: 1.2,
                  fontSize: { xs: '1.75rem', sm: '2rem' },
                  wordBreak: 'break-word',
                }}
              >
                {`${user.firstName} ${user.lastName}`}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.75, wordBreak: 'break-word' }}
              >
                {user.email}
              </Typography>
            </Box>
          </Stack>

          <Chip
            label={user.status}
            size="small"
            sx={{
              backgroundColor: user.status === 'Active' ? '#a84040' : '#e0e0e0',
              color: user.status === 'Active' ? 'white' : 'black',
              fontWeight: 600,
              borderRadius: 1.25,
              alignSelf: { xs: 'flex-start', sm: 'flex-start' },
            }}
          />
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={{ xs: 2.5, sm: 3.5 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 0.4 }}>
              Phone
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5, fontWeight: 600 }}>
              {user.phone}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 0.4 }}>
              Age
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5, fontWeight: 600 }}>
              {user.age || 'N/A'}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 0.4 }}>
              Gender
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5, fontWeight: 600 }}>
              {user.gender}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 0.4 }}>
              Address
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5, fontWeight: 600 }}>
              {user.address || 'N/A'}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          justifyContent="space-between"
          spacing={1.25}
        >
          <Button
            size="small"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/')}
            sx={{
              color: '#a84040',
              textTransform: 'none',
              fontWeight: 600,
              width: { xs: '100%', sm: 'auto' },
              transition: 'opacity 0.2s ease',
              '&:hover': { opacity: 0.85 },
            }}
          >
            Back
          </Button>

          <Stack direction="row" spacing={1.25}>
            <Button
              size="small"
              startIcon={<Edit />}
              onClick={() => navigate(`/edit/${id}`)}
              variant="outlined"
              sx={{
                color: '#2196f3',
                borderColor: '#2196f3',
                textTransform: 'none',
                borderRadius: 1.25,
                transition: 'opacity 0.2s ease',
                '&:hover': { opacity: 0.85, borderColor: '#2196f3' },
              }}
            >
              Edit
            </Button>
            <Button
              size="small"
              startIcon={<Delete />}
              onClick={() => setConfirmDialog(true)}
              variant="outlined"
              sx={{
                color: '#f44336',
                borderColor: '#f44336',
                textTransform: 'none',
                borderRadius: 1.25,
                transition: 'opacity 0.2s ease',
                '&:hover': { opacity: 0.85, borderColor: '#f44336' },
              }}
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <ConfirmDialog
        open={confirmDialog}
        title="Confirm Delete"
        message="Are you sure you want to delete this user?"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDialog(false)}
        loading={deleting}
      />
    </Container>
  );
}

export default ViewPage;
