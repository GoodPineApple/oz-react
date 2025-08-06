import { Box, Container, Paper, Typography, Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArticleIcon from '@mui/icons-material/Article';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router';
import { useAuth } from '../auth/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../util/firebase';
import { useNavigate } from 'react-router';
import LoginIcon from '@mui/icons-material/Login';

function Home() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
        px: 2
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={8}
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            Welcome to My React App
          </Typography>
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
            Hello world! 🚀
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4 }}>
            This is the home page without any layout. Built with React, Vite & Material UI.
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
            
            <Button
              variant="contained"
              component={Link}
              to="/info/about"
              size="large"
              startIcon={<InfoIcon />}
              sx={{ 
                px: 3, 
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem'
              }}
            >
              About
            </Button>
            <Button
              component={Link}
              to="/info/counter"
              variant="contained"
              color="success"
              size="large"
              startIcon={<CheckCircleIcon />}
              sx={{ 
                px: 3, 
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem'
              }}
            >
              Counter
            </Button>
            <Button
              component={Link}
              to="/posts"
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<ArticleIcon />}
              sx={{ 
                px: 3, 
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem'
              }}
            >
              Posts
            </Button>
            {user ? (
                <Button
                  variant="outlined"
                  color="error"
                  size="large"
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                  sx={{ 
                    px: 3, 
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1.1rem'
                  }}
                >
                  로그아웃
                </Button>
            ) : (
              <Button
                variant="contained"
                component={Link}
                to="/auth/login"
                size="large"
                startIcon={<LoginIcon />}
                sx={{ 
                  px: 3, 
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem'
                }}
              >
                로그인
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default Home;