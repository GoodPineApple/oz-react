import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Stack,
  Paper,
  Skeleton
} from '@mui/material'

const AlbumSkeleton = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* Header Skeleton */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Skeleton variant="rectangular" width={120} height={40} />
            <Skeleton variant="rectangular" width={80} height={32} />
          </Box>
          <Stack spacing={2}>
            <Skeleton variant="text" width="60%" height={48} />
            <Skeleton variant="text" width="30%" height={24} />
          </Stack>
        </Paper>

        {/* Photos Grid Skeleton */}
        <Grid container spacing={3}>
          {Array.from({ length: 12 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="60%" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  )
}

export default AlbumSkeleton 