import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router'
import useUsersStore from '../../util/stores/usersStore'
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Stack,
  Divider,
  Chip,
  Avatar
} from '@mui/material'
import {
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Language as WebsiteIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Public as PublicIcon
} from '@mui/icons-material'

const User = () => {
  const { userId } = useParams()
  const {
    currentUser,
    userLoading,
    userError,
    fetchUserById,
    clearCurrentUser,
    clearUserError
  } = useUsersStore()

  useEffect(() => {
    if (userId) {
      fetchUserById(userId)
    }
    return () => {
      clearCurrentUser()
    }
  }, [userId, fetchUserById, clearCurrentUser])
  
  if (userLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={60} />
        </Box>
      </Container>
    )
  }

  if (userError) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={3}>
          <Button
            component={Link}
            to="/users"
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            sx={{ alignSelf: 'flex-start' }}
          >
            Back to Users
          </Button>
          <Alert 
            severity="error" 
            onClose={clearUserError}
            action={
              <Button color="inherit" size="small" onClick={() => fetchUserById(userId)}>
                Retry
              </Button>
            }
          >
            {userError}
          </Alert>
        </Stack>
      </Container>
    )
  }

  if (!currentUser) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={3}>
          <Button
            component={Link}
            to="/users"
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            sx={{ alignSelf: 'flex-start' }}
          >
            Back to Users
          </Button>
          <Alert severity="warning">
            User not found
          </Alert>
        </Stack>
      </Container>
    )
  }

  const { name, username, email, phone, website, address, company } = currentUser

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* Header */}
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Button
              component={Link}
              to="/users"
              startIcon={<ArrowBackIcon />}
              variant="outlined"
            >
              Back to Users
            </Button>
            <Chip label={`User ID: ${currentUser.id}`} color="primary" />
          </Stack>

          {/* User Profile */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="center">
            <Avatar
              sx={{ 
                width: 120, 
                height: 120, 
                bgcolor: 'primary.main',
                fontSize: '3rem'
              }}
            >
              {name.charAt(0)}
            </Avatar>
            
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                {name}
              </Typography>
              <Typography variant="h6" color="text.secondary" fontStyle="italic" gutterBottom>
                @{username}
              </Typography>
              <Stack direction="row" spacing={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                <Chip label="Active User" color="success" size="small" />
                <Chip label={company.name} variant="outlined" size="small" />
              </Stack>
            </Box>
          </Stack>
        </Paper>

        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ height: '100%', borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <PersonIcon color="primary" />
                    <Typography variant="h6" fontWeight="bold">
                      Contact Information
                    </Typography>
                  </Box>
                  
                  <Divider />

                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <EmailIcon color="action" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Email
                        </Typography>
                        <Typography variant="body1">
                          {email}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <PhoneIcon color="action" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Phone
                        </Typography>
                        <Typography variant="body1">
                          {phone}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <WebsiteIcon color="action" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Website
                        </Typography>
                        <Typography 
                          variant="body1" 
                          component="a" 
                          href={`http://${website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ 
                            color: 'primary.main',
                            textDecoration: 'none',
                            '&:hover': {
                              textDecoration: 'underline'
                            }
                          }}
                        >
                          {website}
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Address Information */}
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ height: '100%', borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <LocationIcon color="primary" />
                    <Typography variant="h6" fontWeight="bold">
                      Address
                    </Typography>
                  </Box>
                  
                  <Divider />

                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Street Address
                      </Typography>
                      <Typography variant="body1">
                        {address.street}, {address.suite}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        City & Zipcode
                      </Typography>
                      <Typography variant="body1">
                        {address.city}, {address.zipcode}
                      </Typography>
                    </Box>

                    <Box sx={{ 
                      bgcolor: 'grey.50', 
                      p: 2, 
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'grey.200'
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <PublicIcon fontSize="small" color="primary" />
                        <Typography variant="body2" fontWeight="bold">
                          Coordinates
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Lat: {address.geo.lat}, Lng: {address.geo.lng}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Company Information */}
          <Grid item xs={12}>
            <Card elevation={3} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <BusinessIcon color="primary" />
                    <Typography variant="h6" fontWeight="bold">
                      Company Information
                    </Typography>
                  </Box>
                  
                  <Divider />

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Company Name
                        </Typography>
                        <Typography variant="h6" color="primary" fontWeight="bold">
                          {company.name}
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Catch Phrase
                        </Typography>
                        <Typography variant="body1" fontStyle="italic">
                          "{company.catchPhrase}"
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Business
                        </Typography>
                        <Typography variant="body1">
                          {company.bs}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  )
}

export default User 