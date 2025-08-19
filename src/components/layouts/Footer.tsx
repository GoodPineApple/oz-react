import { Box, Container, Typography } from '@mui/material'

function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'grey.50', 
        borderTop: '1px solid', 
        borderColor: 'grey.200',
        mt: 'auto'
      }}
    >
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            &copy; 2024 My React App. All rights reserved.
          </Typography>
          <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 0.5 }}>
            Built with React, Vite & Material UI
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer 