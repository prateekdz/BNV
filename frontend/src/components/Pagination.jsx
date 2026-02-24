import React from 'react';
import { Box, Pagination } from '@mui/material';

function PaginationComponent({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        mt: 3,
        pt: 1,
      }}
    >
      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => onPageChange(value)}
        color="primary"
        shape="rounded"
      />
    </Box>
  );
}

export default PaginationComponent;
