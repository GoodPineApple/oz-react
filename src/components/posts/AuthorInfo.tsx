import { 
  Paper, 
  Typography, 
  Grid, 
  Stack
} from '@mui/material'
import { 
  Email as EmailIcon,
  Phone as PhoneIcon,
  Language as LanguageIcon
} from '@mui/icons-material'

const AuthorInfo = ({ user }) => {
  if (!user) return null

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
      <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        👤 작성자 정보
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              @{user.username}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmailIcon fontSize="small" />
              {user.email}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneIcon fontSize="small" />
              {user.phone}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LanguageIcon fontSize="small" />
              {user.website}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              📍 주소
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.address.street}, {user.address.suite}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.address.city}, {user.address.zipcode}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              🏢 회사
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              {user.company.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.company.catchPhrase}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default AuthorInfo 