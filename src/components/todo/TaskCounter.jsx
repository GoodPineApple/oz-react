import { Typography, Box } from '@mui/material'

function TaskCounter({ count }) {
  return (
    <Box sx={{ my: 3, textAlign: 'center' }}>
      <Typography variant="body2" color="text.secondary">
        현재 할 일: <span style={{ fontWeight: 'bold' }}>{count}</span>개
      </Typography>
    </Box>
  )
}

export default TaskCounter 