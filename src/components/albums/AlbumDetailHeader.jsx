import { Link } from 'react-router'
import {
  Typography,
  Box,
  Button,
  Chip,
  Stack,
  Paper,
  Divider
} from '@mui/material'
import {
  ArrowBack as ArrowBackIcon,
  PhotoLibrary as PhotoLibraryIcon,
  Person as PersonIcon,
  Image as ImageIcon
} from '@mui/icons-material'

const AlbumDetailHeader = ({ album, photosCount }) => {
  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button
          component={Link}
          to="/albums"
          variant="outlined"
          startIcon={<ArrowBackIcon />}
        >
          앨범 목록으로
        </Button>
        
        <Chip 
          label={`앨범 ID: ${album.id}`} 
          color="primary" 
          variant="outlined"
        />
      </Box>

      <Stack spacing={3}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <PhotoLibraryIcon sx={{ fontSize: '3rem', color: 'primary.main' }} />
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold">
              {album.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <PersonIcon fontSize="small" color="action" />
              <Typography variant="body1" color="text.secondary">
                User ID: {album.userId}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ImageIcon color="primary" />
          <Typography variant="h6">
            총 {photosCount}장의 사진
          </Typography>
        </Box>
      </Stack>
    </Paper>
  )
}

export default AlbumDetailHeader 