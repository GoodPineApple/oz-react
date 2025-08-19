import { 
  Paper, 
  Typography, 
  TextField, 
  FormControlLabel, 
  Checkbox, 
  Box, 
  Stack,
  Alert,
  IconButton
} from '@mui/material'
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material'

function SearchFilter({ searchTerm, onSearchChange, searchResults, highlightEnabled, onHighlightToggle }) {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
      <Stack spacing={2}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 'medium' }}>
            제목 또는 내용 검색:
          </Typography>
          <TextField
            fullWidth
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="검색어를 입력하세요..."
            size="medium"
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
              endAdornment: searchTerm && (
                <IconButton
                  onClick={() => onSearchChange('')}
                  size="small"
                  sx={{ color: 'text.secondary' }}
                >
                  <ClearIcon />
                </IconButton>
              )
            }}
          />
        </Box>
      </Stack>
      
      {searchTerm && (
        <Stack spacing={2} sx={{ mt: 2 }}>
          <Alert severity="success" sx={{ borderRadius: 2 }}>
            <Typography variant="body2">
              <span style={{ fontWeight: 'bold' }}>"{searchTerm}"</span> 검색 결과: 
              <span style={{ fontWeight: 'bold', color: 'success.main' }}> {searchResults}개</span>
            </Typography>
          </Alert>
          
          <FormControlLabel
            control={
              <Checkbox
                checked={highlightEnabled}
                onChange={(e) => onHighlightToggle(e.target.checked)}
                size="small"
              />
            }
            label={
              <Typography variant="body2" color="text.secondary">
                🔍 검색어 하이라이팅
              </Typography>
            }
          />
        </Stack>
      )}
    </Paper>
  )
}

export default SearchFilter 