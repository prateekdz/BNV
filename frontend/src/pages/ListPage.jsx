import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  Stack,
  InputAdornment,
} from '@mui/material';
import { Add, FileDownload, Search } from '@mui/icons-material';
import { toast } from 'react-toastify';
import UserTable from '../components/UserTable';
import PaginationComponent from '../components/Pagination';
import ConfirmDialog from '../components/ConfirmDialog';
import Loader from '../components/Loader';
import { userAPI } from '../hooks/useUsers';

function ListPage() {
  const redButtonSx = {
    backgroundColor: '#a84040',
    color: '#fff',
    px: 2.25,
    py: 1.1,
    borderRadius: 2,
    fontWeight: 700,
    textTransform: 'none',
    boxShadow: '0 10px 20px rgba(168, 64, 64, 0.25)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#8a3333',
      transform: 'translateY(-1px)',
      boxShadow: '0 12px 24px rgba(138, 51, 51, 0.28)',
    },
  };

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, id: null });
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await userAPI.getAll(page, 10);
      setUsers(response.data.data);
      setTotalPages(response.data.pagination.pages);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchUsers();
      return;
    }

    setLoading(true);
    try {
      const response = await userAPI.search(searchQuery);
      setUsers(response.data.data);
      setTotalPages(response.data.pagination.pages);
    } catch (error) {
      toast.error(error.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const response = await userAPI.export();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users.csv');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      toast.success('Exported successfully');
    } catch (error) {
      toast.error(error.message || 'Export failed');
    }
  };

  const handleDeleteClick = (id) => {
    setConfirmDialog({ open: true, id });
  };

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    try {
      await userAPI.delete(confirmDialog.id);
      toast.success('User deleted successfully');
      setConfirmDialog({ open: false, id: null });
      fetchUsers();
    } catch (error) {
      toast.error(error.message || 'Failed to delete user');
    } finally {
      setDeleting(false);
    }
  };

  const handleView = (id) => {
    navigate(`/view/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleStatusChange = async (id, status) => {
    try {
      await userAPI.update(id, { status });
      toast.success('Status updated successfully');
      fetchUsers();
    } catch (error) {
      toast.error(error.message || 'Failed to update status');
    }
  };

  if (loading && users.length === 0) {
    return <Loader />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      <Paper
        elevation={0}
        sx={{
          mb: 3,
          p: { xs: 2.25, md: 3 },
          borderRadius: 3,
          color: '#fff',
          background: 'linear-gradient(120deg, #161616 0%, #252525 100%)',
        }}
      >
        <Typography variant="overline" sx={{ letterSpacing: 1.1, opacity: 0.8 }}>
          Dashboard
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1.2, mb: 0.5 }}>
          MERN Stack Developer Practical Task
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.85 }}>
          Manage users, search records, and export data.
        </Typography>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          mb: 2,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 14px 34px rgba(15, 23, 42, 0.06)',
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          sx={{ mb: 3, alignItems: { xs: 'stretch', md: 'center' } }}
        >
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: 'flex',
              gap: 1.25,
              flex: 1,
              width: '100%',
              alignItems: 'center',
            }}
          >
            <TextField
              placeholder="Search by first name, last name, or email"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ flex: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ ...redButtonSx, minWidth: 48, px: 2 }}
            >
              Search
            </Button>
          </Box>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.25}
            sx={{ width: { xs: '100%', md: 'auto' } }}
          >
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate('/add')}
              sx={{ ...redButtonSx, width: { xs: '100%', sm: 'auto' } }}
            >
              Add User
            </Button>

            <Button
              variant="contained"
              startIcon={<FileDownload />}
              onClick={handleExport}
              sx={{ ...redButtonSx, width: { xs: '100%', sm: 'auto' } }}
            >
              Export CSV
            </Button>
          </Stack>
        </Stack>

        <UserTable
          users={users}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          onStatusChange={handleStatusChange}
          loading={loading}
        />

        <PaginationComponent
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </Paper>

      <ConfirmDialog
        open={confirmDialog.open}
        title="Confirm Delete"
        message="Are you sure you want to delete this user?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmDialog({ open: false, id: null })}
        loading={deleting}
      />
    </Container>
  );
}

export default ListPage;
