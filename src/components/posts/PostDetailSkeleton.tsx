import { 
  Container, 
  Paper, 
  Box, 
  Grid, 
  Skeleton,
  Stack
} from '@mui/material'

const PostDetailSkeleton = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Skeleton variant="rectangular" width={96} height={32} />
            <Skeleton variant="rectangular" width={64} height={24} />
          </Box>
          <Stack spacing={2}>
            <Skeleton variant="text" width="75%" height={32} />
            <Skeleton variant="text" width="100%" height={20} />
            <Skeleton variant="text" width="83%" height={20} />
          </Stack>
        </Paper>

        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Skeleton variant="text" width={128} height={24} sx={{ mb: 3 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Stack spacing={1.5}>
                <Skeleton variant="text" width={96} height={20} />
                <Skeleton variant="text" width={128} height={16} />
                <Skeleton variant="text" width={160} height={16} />
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack spacing={1.5}>
                <Skeleton variant="text" width={64} height={20} />
                <Skeleton variant="text" width={192} height={16} />
                <Skeleton variant="text" width={144} height={16} />
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack spacing={1.5}>
                <Skeleton variant="text" width={80} height={20} />
                <Skeleton variant="text" width={128} height={16} />
                <Skeleton variant="text" width={160} height={16} />
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Skeleton variant="text" width={96} height={24} sx={{ mb: 3 }} />
          <Stack spacing={2}>
            {[1, 2, 3, 4, 5].map(index => (
              <Box key={index} sx={{ pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <Skeleton variant="text" width={96} height={16} />
                  <Skeleton variant="text" width={128} height={16} />
                </Box>
                <Skeleton variant="text" width="100%" height={16} />
              </Box>
            ))}
          </Stack>
        </Paper>
      </Stack>
    </Container>
  )
}

export default PostDetailSkeleton 