import { Link } from 'react-router'
import { 
  Container, 
  Paper, 
  Typography, 
  Button
} from '@mui/material'
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'

const PostDetailNotFound = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
        <Typography variant="h1" sx={{ mb: 2 }}>🔍</Typography>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          포스트를 찾을 수 없습니다
        </Typography>
        <Button
          component={Link}
          to="/posts"
          variant="contained"
          startIcon={<ArrowBackIcon />}
          size="large"
          sx={{ mt: 2 }}
        >
          포스트 목록으로 돌아가기
        </Button>
      </Paper>
    </Container>
  )
}

export default PostDetailNotFound 