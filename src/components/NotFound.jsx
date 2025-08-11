import { Link } from 'react-router'
import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  Button, 
  Stack,
  Divider
} from '@mui/material'
import { Home as HomeIcon } from '@mui/icons-material'

function NotFound() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'grey.50',
        px: 2
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
          <Typography variant="h1" sx={{ fontSize: '4rem', fontWeight: 'bold', color: 'grey.300', mb: 2 }}>
            404
          </Typography>
          
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'semibold', mb: 2 }}>
            페이지를 찾을 수 없습니다
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.<br />
            URL을 다시 확인해 주세요.
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            <Button
              component={Link}
              to="/"
              variant="contained"
              size="large"
              startIcon={<HomeIcon />}
              sx={{ 
                py: 1.5,
                px: 3,
                textTransform: 'none',
                fontSize: '1.1rem',
                boxShadow: 2,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4
                },
                transition: 'all 0.2s'
              }}
            >
              🏠 홈으로 돌아가기
            </Button>
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            다른 페이지로 이동하시겠습니까?
          </Typography>
          
          <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
            <Button
              component={Link}
              to="/info/about"
              variant="text"
              size="small"
              sx={{ 
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.50'
                }
              }}
            >
              About
            </Button>
            <Button
              component={Link}
              to="/posts"
              variant="text"
              size="small"
              sx={{ 
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.50'
                }
              }}
            >
              Posts
            </Button>
            <Button
              component={Link}
              to="/info/todo"
              variant="text"
              size="small"
              sx={{ 
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.50'
                }
              }}
            >
              Todo
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}

export default NotFound 