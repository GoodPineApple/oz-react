import { Alert, AlertTitle, Box } from '@mui/material'

function ErrorMessage({ message }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Alert severity="error" sx={{ borderRadius: 2 }}>
        <AlertTitle>오류가 발생했습니다</AlertTitle>
        {message}
      </Alert>
    </Box>
  )
}

export default ErrorMessage 