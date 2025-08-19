import { Link } from 'react-router'
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  Stack
} from '@mui/material'
import {
  PhotoLibrary as PhotoLibraryIcon,
  Person as PersonIcon
} from '@mui/icons-material'

const AlbumCard = ({ album }) => {
  return (
    <Card 
      elevation={3} 
      sx={{ 
        height: '100%', 
        borderRadius: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6
        }
      }}
    >
      <CardContent sx={{ pb: 1 }}>
        <Stack spacing={2}>
          {/* Album Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <PhotoLibraryIcon sx={{ color: 'primary.main', fontSize: '2rem' }} />
            <Chip 
              label={`ID: ${album.id}`} 
              size="small" 
              color="primary" 
              variant="outlined"
            />
          </Box>

          {/* Album Title */}
          <Typography 
            variant="h6" 
            component="h3" 
            fontWeight="bold"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minHeight: '3rem',
              lineHeight: 1.5
            }}
          >
            {album.title}
          </Typography>

          {/* User Info */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            bgcolor: 'grey.50', 
            p: 1.5, 
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'grey.200'
          }}>
            <PersonIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              User ID: {album.userId}
            </Typography>
          </Box>
        </Stack>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          component={Link}
          to={`/albums/${album.id}`}
          variant="contained"
          fullWidth
          startIcon={<PhotoLibraryIcon />}
        >
          사진 보기
        </Button>
      </CardActions>
    </Card>
  )
}

export default AlbumCard 