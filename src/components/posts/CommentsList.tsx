import { 
  Paper, 
  Typography, 
  Box, 
  Stack
} from '@mui/material'

const CommentsList = ({ comments }) => {
  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3}}>
      <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        💬 댓글 ({comments.length}개)
      </Typography>
      {comments.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
          아직 댓글이 없습니다.
        </Typography>
      ) : (
        <Stack spacing={3}>
          {comments.map(comment => (
            <Box key={comment.id} sx={{ pb: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {comment.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ({comment.email})
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                {comment.body}
              </Typography>
            </Box>
          ))}
        </Stack>
      )}
    </Paper>
  )
}

export default CommentsList 