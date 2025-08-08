import { Link } from 'react-router'
import { 
  Container, 
  Paper, 
  Typography, 
  Button
} from '@mui/material'
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'

const PostDetailError = ({ error }) => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
        <Typography variant="h1" sx={{ mb: 2 }}>😕</Typography>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          오류가 발생했습니다
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {error}
        </Typography>
        <Button
          component={Link}
          to="/posts"
          variant="contained"
          startIcon={<ArrowBackIcon />}
          size="large"
        >
          포스트 목록으로 돌아가기
        </Button>
      </Paper>
    </Container>
  )
}

export default PostDetailError 