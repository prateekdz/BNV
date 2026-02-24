import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

function Loader({ message = 'Loading...' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        gap: 2,
      }}
    >
      <CircularProgress />
      <Typography color="textSecondary">{message}</Typography>
    </Box>
  );
}

export default Loader;
