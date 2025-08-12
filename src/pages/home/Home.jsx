import { useContext, useEffect } from 'react';
import { Box, Container, Paper, Typography, Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArticleIcon from '@mui/icons-material/Article';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router';
import { useAuth } from '../auth/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../util/firebase/firebase';
import { useNavigate } from 'react-router';
import LoginIcon from '@mui/icons-material/Login';
import { ThemeContext } from '../../util/ThemeContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

function Home() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // 테마에 따른 배경 그라디언트 설정
  const getBackgroundGradient = () => {
    if (theme === 'light') {
      return 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)';
    } else {
      return 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)';
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
        background: getBackgroundGradient(),
        px: 2,
        transition: 'background 0.3s ease',
      }}
    >
      <Container maxWidth="md">
        {/* 테마 토글 버튼 개선 */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button 
            onClick={toggleTheme}
            variant="contained"
            startIcon={theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              px: 3,
              py: 1,
            }}
          >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </Button>
        </Box>

        <Paper
          elevation={8}
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 3,
            background: theme === 'light' 
              ? 'rgba(255, 255, 255, 0.95)' 
              : 'rgba(30, 30, 30, 0.95)',
            backdropFilter: 'blur(10px)',
            border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
            transition: 'all 0.3s ease',
          }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold', 
              color: theme === 'light' ? 'text.primary' : 'white',
              transition: 'color 0.3s ease',
            }}
          >
            Welcome to My React App
          </Typography>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold', 
              color: 'primary.main', 
              mb: 3,
              transition: 'color 0.3s ease',
            }}
          >
            Hello world! 🚀
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            paragraph 
            sx={{ 
              mb: 4,
              transition: 'color 0.3s ease',
              color: theme === 'light' ? 'text.secondary' : 'white',
            }}
          >
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
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
              }}
            >
              About
            </Button>
            <Button
              component={Link}
              to="/info/todo"
              variant="contained"
              color="success"
              size="large"
              startIcon={<CheckCircleIcon />}
              sx={{ 
                px: 3, 
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
              }}
            >
              Todo
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
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
              }}
            >
              Posts
            </Button>
            <Button
              component={Link}
              to="/albums"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<PhotoLibraryIcon />}
              sx={{ 
                px: 3, 
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
              }}
            >
              Albums
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
                    fontSize: '1.1rem',
                    transition: 'all 0.3s ease',
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
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
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