import { Card, CardContent, Skeleton, Box } from '@mui/material'

function SkeletonCard() {
  return (
    <Card elevation={2} sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Skeleton variant="rectangular" width={48} height={24} sx={{ borderRadius: 1 }} />
          <Skeleton variant="text" width={80} height={16} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Skeleton variant="text" width="75%" height={20} />
          <Skeleton variant="text" width="50%" height={20} />
          <Skeleton variant="text" width="100%" height={16} />
          <Skeleton variant="text" width="83%" height={16} />
          <Skeleton variant="text" width="67%" height={16} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default SkeletonCard 