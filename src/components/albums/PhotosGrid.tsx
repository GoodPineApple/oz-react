import {
  Grid,
  Box,
  Typography
} from '@mui/material'
import {
  Image as ImageIcon
} from '@mui/icons-material'
import PhotoCard from './PhotoCard'

const PhotosGrid = ({ photos, onPhotoClick }) => {
  if (photos.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <ImageIcon sx={{ fontSize: '4rem', color: 'grey.400', mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          이 앨범에는 사진이 없습니다
        </Typography>
      </Box>
    )
  }

  return (
    <Grid container spacing={3}>
      {photos.map((photo) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={photo.id}>
          <PhotoCard photo={photo} onClick={onPhotoClick} />
        </Grid>
      ))}
    </Grid>
  )
}

export default PhotosGrid 