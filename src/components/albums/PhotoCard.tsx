import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent
} from '@mui/material'
import {
  ZoomIn as ZoomInIcon
} from '@mui/icons-material'

const PhotoCard = ({ photo, onClick }) => {
  return (
    <Card 
      elevation={3} 
      sx={{ 
        height: '100%',
        borderRadius: 3,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6
        }
      }}
      onClick={() => onClick(photo)}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={photo.thumbnailUrl}
          alt={photo.title}
          sx={{ 
            transition: 'all 0.3s ease',
            '&:hover': {
              filter: 'brightness(1.1)'
            }
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '50%',
            p: 0.5,
            opacity: 0,
            transition: 'opacity 0.3s ease',
            '.MuiCard-root:hover &': {
              opacity: 1
            }
          }}
        >
          <ZoomInIcon sx={{ color: 'white', fontSize: '1.2rem' }} />
        </Box>
      </Box>
      
      <CardContent sx={{ p: 2 }}>
        <Typography 
          variant="body2" 
          fontWeight="medium"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minHeight: '2.5rem',
            lineHeight: 1.2
          }}
        >
          {photo.title}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Photo #{photo.id}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default PhotoCard 