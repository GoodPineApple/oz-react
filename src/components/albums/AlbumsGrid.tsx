import {
  Grid,
  Box,
  Typography,
  Pagination
} from '@mui/material'
import {
  Collections as CollectionsIcon
} from '@mui/icons-material'
import AlbumCard from './AlbumCard'

const AlbumsGrid = ({ 
  albums, 
  loading, 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  if (loading) {
    return null // 로딩은 부모 컴포넌트에서 처리
  }

  if (albums.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <CollectionsIcon sx={{ fontSize: '4rem', color: 'grey.400', mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          앨범이 없습니다
        </Typography>
      </Box>
    )
  }

  return (
    <>
      <Grid container spacing={3}>
        {albums.map((album) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={album.id}>
            <AlbumCard album={album} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={onPageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </>
  )
}

export default AlbumsGrid 