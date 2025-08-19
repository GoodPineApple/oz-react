import { 
  Paper, 
  Typography, 
  FormControl, 
  Select, 
  MenuItem, 
  Button, 
  Box, 
  Stack,
  Alert
} from '@mui/material'

function UserFilter({ userIdFilter, onFilterChange, totalPosts, filteredCount }) {
  // 사용자 ID 옵션 생성 (1-10)
  const userOptions = Array.from({ length: 10 }, (_, i) => i + 1)

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', sm: 'center' }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium' }}>
            사용자 필터:
          </Typography>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select
              value={userIdFilter}
              onChange={(e) => onFilterChange(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">
                <em>전체 사용자</em>
              </MenuItem>
              {userOptions.map(userId => (
                <MenuItem key={userId} value={userId}>
                  사용자 {userId}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        
        <Button
          variant="outlined"
          onClick={() => onFilterChange('')}
          disabled={!userIdFilter}
          size="medium"
        >
          전체보기
        </Button>
      </Stack>
      
      {userIdFilter && (
        <Box sx={{ mt: 2 }}>
          <Alert severity="info" sx={{ borderRadius: 2 }}>
            <Typography variant="body2">
              사용자 <span style={{ fontWeight: 'bold' }}>{userIdFilter}</span>의 포스트: 
              <span style={{ fontWeight: 'bold', color: 'primary.main' }}> {filteredCount}개</span> 
              (전체 {totalPosts}개 중)
            </Typography>
          </Alert>
        </Box>
      )}
    </Paper>
  )
}

export default UserFilter 