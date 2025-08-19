import {
  Typography,
  Box,
  Chip,
  Stack,
  Paper
} from '@mui/material'
import {
  Collections as CollectionsIcon
} from '@mui/icons-material'

const AlbumsHeader = ({ albumsCount }) => {
  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <CollectionsIcon sx={{ fontSize: '2rem', color: 'primary.main' }} />
        <Typography variant="h4" component="h1" fontWeight="bold">
          Photo Albums
        </Typography>
      </Stack>

      {/* Stats */}
      <Box sx={{ mt: 2 }}>
        <Chip 
          label={`총 ${albumsCount}개의 앨범`} 
          color="primary" 
          variant="outlined" 
        />
      </Box>
    </Paper>
  )
}

export default AlbumsHeader 