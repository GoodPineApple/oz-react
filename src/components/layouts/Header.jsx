import { Link } from 'react-router'
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Typography, 
  Box, 
  Container 
} from '@mui/material'
import { 
  Home as HomeIcon,
  Article as ArticleIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material'

function Header() {
  return (
    <AppBar position="static" color="default" elevation={1} sx={{ bgcolor: 'grey.50' }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ px: { xs: 0 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
            <Button
              component={Link}
              to="/"
              startIcon={<HomeIcon />}
              sx={{ 
                color: 'text.primary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/posts"
              startIcon={<ArticleIcon />}
              sx={{ 
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              Posts
            </Button>
            <Button
              component={Link}
              to="/info/about"
              startIcon={<InfoIcon />}
              sx={{ 
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              About
            </Button>
            <Button
              component={Link}
              to="/info/todo"
              startIcon={<CheckCircleIcon />}
              sx={{ 
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              Todo
            </Button>
            <Button
              component={Link}
              to="/info/location"
              startIcon={<LocationIcon />}
              sx={{ 
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              Location
            </Button>
          </Box>
          <Typography variant="body2" color="text.secondary">
            My React App
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header 