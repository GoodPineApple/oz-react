import { useState } from 'react'
import { useParams } from 'react-router'
import {
  Container,
  Stack
} from '@mui/material'
import AlbumDetailHeader from '../../components/albums/AlbumDetailHeader'
import PhotosGrid from '../../components/albums/PhotosGrid'
import PhotoDetailDialog from '../../components/albums/PhotoDetailDialog'
import AlbumSkeleton from '../../components/albums/AlbumSkeleton'
import AlbumError from '../../components/albums/AlbumError'
import useAlbum from '../../util/hooks/useAlbum'

const Album = () => {
  const { albumId } = useParams()
  const { album, photos, loading, error } = useAlbum(albumId)
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo)
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
    setSelectedPhoto(null)
  }

  if (loading) {
    return <AlbumSkeleton />
  }

  if (error) {
    return <AlbumError error={error} notFound={error.includes('찾을 수 없습니다')} />
  }

  if (!album) {
    return <AlbumError error="앨범을 찾을 수 없습니다." notFound />
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        <AlbumDetailHeader album={album} photosCount={photos.length} />
        <PhotosGrid photos={photos} onPhotoClick={handlePhotoClick} />
      </Stack>

      <PhotoDetailDialog
        open={dialogOpen}
        photo={selectedPhoto}
        onClose={handleDialogClose}
      />
    </Container>
  )
}

export default Album