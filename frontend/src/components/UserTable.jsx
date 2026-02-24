import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Avatar,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material';
import { MoreVert, Visibility, Edit, Delete } from '@mui/icons-material';

function UserTable({ users, onView, onEdit, onDelete, onStatusChange, loading }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [statusAnchorEl, setStatusAnchorEl] = useState(null);
  const [statusUserId, setStatusUserId] = useState(null);

  const handleMenuOpen = (e, userId) => {
    setAnchorEl(e.currentTarget);
    setSelectedUserId(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUserId(null);
  };

  const handleView = () => {
    onView(selectedUserId);
    handleMenuClose();
  };

  const handleEdit = () => {
    onEdit(selectedUserId);
    handleMenuClose();
  };

  const handleDelete = () => {
    onDelete(selectedUserId);
    handleMenuClose();
  };

  const handleStatusMenuOpen = (e, userId) => {
    setStatusAnchorEl(e.currentTarget);
    setStatusUserId(userId);
  };

  const handleStatusMenuClose = () => {
    setStatusAnchorEl(null);
    setStatusUserId(null);
  };

  const handleStatusSelect = (status) => {
    if (onStatusChange && statusUserId) {
      onStatusChange(statusUserId, status);
    }
    handleStatusMenuClose();
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
        <CircularProgress />
      </Box>
    );
  }

  if (!users || users.length === 0) {
    return (
      <Box
        sx={{
          minHeight: 280,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'white',
          borderRadius: 2,
          border: '1px solid #e0e0e0',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
          No users found
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 'none',
          border: '1px solid #e0e0e0',
          borderRadius: 2,
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1a1a1a' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1.75 }}>ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1.75 }}>FullName</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1.75 }}>Email</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1.75 }}>Gender</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1.75 }}>Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1.75 }}>Profile</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 1.75 }} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white',
                  '&:hover': {
                    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.04)',
                  },
                }}
              >
                <TableCell sx={{ py: 1.5 }}>{index + 1}</TableCell>
                <TableCell sx={{ py: 1.5 }}>{`${user.firstName} ${user.lastName}`}</TableCell>
                <TableCell sx={{ py: 1.5 }}>{user.email}</TableCell>
                <TableCell sx={{ py: 1.5 }}>{user.gender}</TableCell>
                <TableCell>
                  <Chip
                    label={user.status}
                    color={user.status === 'Active' ? 'success' : 'default'}
                    size="small"
                    onClick={(e) => handleStatusMenuOpen(e, user._id)}
                    sx={{
                      backgroundColor: user.status === 'Active' ? '#16a34a' : '#6b7280',
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: 600,
                      borderRadius: 1.25,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Avatar
                    src={user.profile || ''}
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: '#a84040',
                      cursor: 'pointer',
                    }}
                  >
                    {user.firstName.charAt(0)}
                  </Avatar>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, user._id)}
                    sx={{ color: '#666' }}
                  >
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={statusAnchorEl}
        open={Boolean(statusAnchorEl)}
        onClose={handleStatusMenuClose}
      >
        <MenuItem onClick={() => handleStatusSelect('Active')}>Active</MenuItem>
        <MenuItem onClick={() => handleStatusSelect('Inactive')}>Inactive</MenuItem>
      </Menu>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
        }}
      >
        <MenuItem onClick={handleView} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Visibility fontSize="small" sx={{ color: '#4caf50' }} />
          View
        </MenuItem>
        <MenuItem onClick={handleEdit} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Edit fontSize="small" sx={{ color: '#2196f3' }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Delete fontSize="small" sx={{ color: '#f44336' }} />
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserTable;
