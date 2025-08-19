import { Paper, Typography, Box } from '@mui/material'

function Header({ postsCount }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          📋 게시판
        </Typography>
        <Typography variant="body1" color="text.secondary">
          총 <span style={{ fontWeight: 'bold', color: 'primary.main' }}>{postsCount}</span>개의 포스트
        </Typography>
      </Paper>
    </Box>
  )
}

export default Header 