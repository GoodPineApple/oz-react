import { Link } from 'react-router'
import {
  Container,
  Button,
  Alert
} from '@mui/material'
import {
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material'

const AlbumError = ({ error, notFound = false }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Alert severity={notFound ? "warning" : "error"} sx={{ mb: 3 }}>
        {error}
      </Alert>
      <Button
        component={Link}
        to="/albums"
        variant="outlined"
        startIcon={<ArrowBackIcon />}
      >
        앨범 목록으로 돌아가기
      </Button>
    </Container>
  )
}

export default AlbumError 