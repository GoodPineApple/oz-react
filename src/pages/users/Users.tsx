import React, { useEffect } from 'react'
import { Link } from 'react-router'
import useUsersStore from '../../util/stores/usersStore'
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Alert,
  CircularProgress,
  Chip,
  Stack,
  Paper,
  Pagination,
  InputAdornment
} from '@mui/material'
import {
  Person as PersonIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  Language as WebsiteIcon
} from '@mui/icons-material'

const Users = () => {
  const {
    users,
    loading,
    error,
    lastUpdated,
    searchTerm,
    currentPage,
    fetchUsers,
    setSearchTerm,
    setCurrentPage,
    clearError,
    getPaginatedUsers
  } = useUsersStore()

  const { users: paginatedUsers, totalPages, totalUsers } = getPaginatedUsers()

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers()
    }
  }, [users.length, fetchUsers])

  const handleRefresh = () => {
    fetchUsers()
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <PersonIcon sx={{ fontSize: '2rem', color: 'primary.main' }} />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Users Directory
          </Typography>
        </Stack>

        {/* Controls */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
          <TextField
            fullWidth
            placeholder="Search users by name, username, email, or company..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: { md: 400 } }}
          />
          
          <Button
            variant="outlined"
            onClick={handleRefresh}
            disabled={loading}
            startIcon={<RefreshIcon />}
          >
            Refresh
          </Button>

          {lastUpdated && (
            <Typography variant="body2" color="text.secondary">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </Typography>
          )}
        </Stack>

        {/* Stats */}
        <Box sx={{ mt: 2 }}>
          <Chip 
            label={`${totalUsers} users found`} 
            color="primary" 
            variant="outlined" 
          />
        </Box>
      </Paper>

      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={clearError}>
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={60} />
        </Box>
      )}

      {/* Users Grid */}
      {!loading && paginatedUsers.length > 0 && (
        <>
          <Grid container spacing={3}>
            {paginatedUsers.map((user) => (
              <Grid item xs={12} md={6} lg={4} key={user.id}>
                <Card 
                  elevation={3} 
                  sx={{ 
                    height: '100%', 
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <CardContent sx={{ pb: 1 }}>
                    <Stack spacing={2}>
                      {/* User Header */}
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="h6" component="h3" fontWeight="bold">
                          {user.name}
                        </Typography>
                        <Chip 
                          label={`ID: ${user.id}`} 
                          size="small" 
                          color="primary" 
                          variant="outlined"
                        />
                      </Box>

                      {/* Username */}
                      <Typography variant="body2" color="text.secondary" fontStyle="italic">
                        @{user.username}
                      </Typography>

                      {/* Contact Info */}
                      <Stack spacing={1}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <EmailIcon fontSize="small" color="action" />
                          <Typography variant="body2" noWrap>
                            {user.email}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PhoneIcon fontSize="small" color="action" />
                          <Typography variant="body2">
                            {user.phone}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <WebsiteIcon fontSize="small" color="action" />
                          <Typography variant="body2" noWrap>
                            {user.website}
                          </Typography>
                        </Box>
                      </Stack>

                      {/* Company */}
                      <Box sx={{ 
                        bgcolor: 'grey.50', 
                        p: 2, 
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'grey.200'
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <BusinessIcon fontSize="small" color="primary" />
                          <Typography variant="body2" fontWeight="bold">
                            {user.company.name}
                          </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {user.company.catchPhrase}
                        </Typography>
                      </Box>

                      {/* Address */}
                      <Typography variant="body2" color="text.secondary">
                        📍 {user.address.city}, {user.address.zipcode}
                      </Typography>
                    </Stack>
                  </CardContent>

                  <CardActions sx={{ px: 2, pb: 2 }}>
                    <Button
                      component={Link}
                      to={`/users/${user.id}`}
                      variant="outlined"
                      fullWidth
                      startIcon={<PersonIcon />}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      )}

      {/* No Results */}
      {!loading && paginatedUsers.length === 0 && searchTerm && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <PersonIcon sx={{ fontSize: '4rem', color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No users found matching "{searchTerm}"
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search criteria
          </Typography>
        </Box>
      )}

      {/* Empty State */}
      {!loading && users.length === 0 && !searchTerm && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <PersonIcon sx={{ fontSize: '4rem', color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No users available
          </Typography>
          <Button
            variant="contained"
            onClick={handleRefresh}
            startIcon={<RefreshIcon />}
            sx={{ mt: 2 }}
          >
            Load Users
          </Button>
        </Box>
      )}
    </Container>
  )
}

export default Users 