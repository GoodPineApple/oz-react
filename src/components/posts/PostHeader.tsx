import { Link } from 'react-router'
import { 
  Box, 
  Button, 
  Typography
} from '@mui/material'
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'

const PostHeader = ({ postId }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
      <Button
        component={Link}
        to="/posts"
        startIcon={<ArrowBackIcon />}
        sx={{ color: 'primary.main' }}
      >
        포스트 목록
      </Button>
      <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main', bgcolor: 'primary.50', px: 2, py: 0.5, borderRadius: 1 }}>
        Post #{postId}
      </Typography>
    </Box>
  )
}

export default PostHeader 