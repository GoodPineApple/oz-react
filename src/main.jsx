import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeProvider } from './util/ThemeContext'
import { useContext } from 'react'
import { ThemeContext } from './util/ThemeContext'
import { AuthProvider } from './pages/auth/AuthContext'
import { Provider } from 'react-redux'
import { store } from './util/store'

// 테마 생성 함수
const createAppTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#1976d2' : '#90caf9',
    },
    secondary: {
      main: mode === 'light' ? '#dc004e' : '#f48fb1',
    },
    success: {
      main: mode === 'light' ? '#2e7d32' : '#66bb6a',
    },
    info: {
      main: mode === 'light' ? '#0288d1' : '#29b6f6',
    },
    warning: {
      main: mode === 'light' ? '#ed6c02' : '#ffa726',
    },
    background: {
      default: mode === 'light' ? '#fafafa' : '#121212',
      paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
    },
    text: {
      primary: mode === 'light' ? '#000000' : '#ffffff',
      secondary: mode === 'light' ? '#666666' : '#aaaaaa',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

// Material-UI 테마를 적용하는 래퍼 컴포넌트
// eslint-disable-next-line react-refresh/only-export-components
const ThemedApp = () => {
  const { theme } = useContext(ThemeContext)
  const muiTheme = createAppTheme(theme)

  return (
    <MuiThemeProvider theme={muiTheme}>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <AuthProvider>
        <App />
      </AuthProvider>
    </MuiThemeProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <StyledEngineProvider enableCssLayer>
          <ThemeProvider>
            <ThemedApp />
          </ThemeProvider>
        </StyledEngineProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)