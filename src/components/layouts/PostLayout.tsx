import { Outlet } from 'react-router'
import { Box, Container } from '@mui/material'
import Header from './Header'
import Footer from './Footer'
import SideNavigation from './SideNavigation'

function PostLayout() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'grey.50' }}>
      <Header />
      <Box sx={{ flex: 1, display: 'flex' }}>
        <SideNavigation />
        <Box component="main" sx={{ flex: 1, p: { xs: 3, sm: 4 } }}>
          <Container maxWidth="xl">
            <Outlet />
          </Container>
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}

export default PostLayout 