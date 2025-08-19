import { 
  Paper, 
  Typography, 
  Pagination as MuiPagination, 
  Box, 
  Stack 
} from '@mui/material'
import { 
  FirstPage as FirstPageIcon, 
  LastPage as LastPageIcon,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon
} from '@mui/icons-material'

function Pagination({ currentPage, totalPages, onPageChange, itemsPerPage, totalItems }) {
  if (totalPages <= 1) return null

  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4, borderRadius: 3 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems="center">
        <Typography variant="body2" color="text.secondary">
          {totalItems}개 중 <span style={{ fontWeight: 'medium', color: 'text.primary' }}>{startItem}-{endItem}</span>번째 표시
        </Typography>
        
        <MuiPagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => onPageChange(page)}
          showFirstButton
          showLastButton
          size="large"
          sx={{
            '& .MuiPaginationItem-root': {
              borderRadius: 1
            }
          }}
        />
      </Stack>
    </Paper>
  )
}

export default Pagination 