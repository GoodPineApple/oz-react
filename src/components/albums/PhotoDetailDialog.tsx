import {
  Typography,
  Box,
  Button,
  Chip,
  Stack,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip
} from '@mui/material'
import {
  Close as CloseIcon,
  Download as DownloadIcon
} from '@mui/icons-material'

const PhotoDetailDialog = ({ 
  open, 
  photo, 
  onClose 
}) => {
  if (!photo) return null

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 3,
          overflow: 'hidden'
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <img
          src={photo.url}
          alt={photo.title}
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '70vh',
            objectFit: 'contain',
            backgroundColor: '#f5f5f5'
          }}
        />
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.8)'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      
      <DialogContent sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h6" fontWeight="bold">
            {photo.title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Chip label={`Photo #${photo.id}`} size="small" />
            <Chip label={`Album #${photo.albumId}`} size="small" variant="outlined" />
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Tooltip title="원본 이미지 보기">
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => window.open(photo.url, '_blank')}
          >
            원본 보기
          </Button>
        </Tooltip>
        <Button onClick={onClose} variant="contained">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PhotoDetailDialog 