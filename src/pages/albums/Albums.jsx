import { useState } from 'react'
import {
  Container,
  Alert,
  CircularProgress,
  Box
} from '@mui/material'
import AlbumsHeader from '../../components/albums/AlbumsHeader'
import AlbumsGrid from '../../components/albums/AlbumsGrid'
import useAlbums from '../../util/hooks/useAlbums'

const Albums = () => {
  const { albums, loading, error, refetch } = useAlbums()
  const [currentPage, setCurrentPage] = useState(1)
  
  const itemsPerPage = 12

  // 페이징 계산
  const totalPages = Math.ceil(albums.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentAlbums = albums.slice(startIndex, endIndex)

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
  }

  const handleErrorClose = () => {
    // 에러를 닫고 다시 시도할 수 있도록 refetch 호출
    refetch()
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <AlbumsHeader albumsCount={albums.length} />

      {/* Error Display */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }} 
          onClose={handleErrorClose}
          action={
            <button onClick={refetch} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
              다시 시도
            </button>
          }
        >
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={60} />
        </Box>
      )}

      {/* Albums Grid */}
      {!loading && (
        <AlbumsGrid
          albums={currentAlbums}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </Container>
  )
}

export default Albums