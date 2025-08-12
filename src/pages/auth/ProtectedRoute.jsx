import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from './AuthContext';
import { Box, CircularProgress, Typography } from '@mui/material';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)'
        }}
      >
        <CircularProgress size={60} sx={{ mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          로딩 중...
        </Typography>
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}

export default ProtectedRoute; 