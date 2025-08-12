import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router'
import { doc, getDoc, collection, getDocs, query, orderBy } from 'firebase/firestore'
import { firestore } from '../../util/firebase/firebase'
import { createComment } from '../../util/firebase/firestore-utils'
import { 
  Container, 
  Paper, 
  Typography, 
  Button, 
  Box, 
  Grid, 
  Divider,
  Skeleton,
  Alert,
  AlertTitle,
  Stack,
  Chip,
  Avatar,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import { 
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  Comment as CommentIcon,
  AccessTime as AccessTimeIcon,
  Add as AddIcon,
  Edit as EditIcon
} from '@mui/icons-material'

const FirePost = () => {
  const { postId } = useParams()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [commentDialogOpen, setCommentDialogOpen] = useState(false)
  const [newComment, setNewComment] = useState({ name: '', body: '' })
  const [submittingComment, setSubmittingComment] = useState(false)

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true)
        setError(null)

        // 포스트 상세 정보 가져오기
        const postRef = doc(firestore, 'posts', postId)
        const postSnap = await getDoc(postRef)
        
        if (!postSnap.exists()) {
          throw new Error('포스트를 찾을 수 없습니다.')
        }
        
        const postData = postSnap.data()
        setPost({
          id: postSnap.id,
          ...postData,
          createdAt: postData.createdAt?.toDate?.() || new Date(),
          updatedAt: postData.updatedAt?.toDate?.() || new Date()
        })

        // 댓글 가져오기
        const commentsRef = collection(firestore, 'posts', postId, 'comments')
        const commentsQuery = query(commentsRef, orderBy('createdAt', 'asc'))
        const commentsSnap = await getDocs(commentsQuery)
        
        const commentsData = []
        commentsSnap.forEach((doc) => {
          const data = doc.data()
          commentsData.push({
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate?.() || new Date()
          })
        })
        
        setComments(commentsData)
      } catch (err) {
        console.error('Firestore fetch error:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (postId) {
      fetchPostData()
    }
  }, [postId])

  // 댓글 작성 함수
  const handleSubmitComment = async () => {
    if (!newComment.name.trim() || !newComment.body.trim()) {
      return
    }

    try {
      setSubmittingComment(true)
      
      await createComment(postId, {
        name: newComment.name.trim(),
        body: newComment.body.trim()
      })
      
      // 댓글 목록 새로고침
      const commentsRef = collection(firestore, 'posts', postId, 'comments')
      const commentsQuery = query(commentsRef, orderBy('createdAt', 'asc'))
      const commentsSnap = await getDocs(commentsQuery)
      
      const commentsData = []
      commentsSnap.forEach((doc) => {
        const data = doc.data()
        commentsData.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date()
        })
      })
      
      setComments(commentsData)
      
      // 폼 초기화
      setNewComment({ name: '', body: '' })
      setCommentDialogOpen(false)
    } catch (error) {
      console.error('댓글 작성 중 오류:', error)
      setError('댓글 작성 중 오류가 발생했습니다.')
    } finally {
      setSubmittingComment(false)
    }
  }

  const handleCommentDialogClose = () => {
    setCommentDialogOpen(false)
    setNewComment({ name: '', body: '' })
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={4}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Skeleton variant="rectangular" width={96} height={32} />
              <Skeleton variant="rectangular" width={64} height={24} />
            </Box>
            <Stack spacing={2}>
              <Skeleton variant="text" width="75%" height={32} />
              <Skeleton variant="text" width="100%" height={20} />
              <Skeleton variant="text" width="83%" height={20} />
            </Stack>
          </Paper>

          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Skeleton variant="text" width={128} height={24} sx={{ mb: 3 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Stack spacing={1.5}>
                  <Skeleton variant="text" width={96} height={20} />
                  <Skeleton variant="text" width={120} height={20} />
                  <Skeleton variant="text" width={80} height={20} />
                </Stack>
              </Grid>
              <Grid item xs={12} md={8}>
                <Stack spacing={2}>
                  <Skeleton variant="text" width="100%" height={20} />
                  <Skeleton variant="text" width="90%" height={20} />
                  <Skeleton variant="text" width="95%" height={20} />
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Stack>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          <AlertTitle>오류</AlertTitle>
          {error}
        </Alert>
        <Button
          component={Link}
          to="/fireposts"
          variant="outlined"
          startIcon={<ArrowBackIcon />}
        >
          목록으로 돌아가기
        </Button>
      </Container>
    )
  }

  if (!post) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          포스트를 찾을 수 없습니다.
        </Alert>
        <Button
          component={Link}
          to="/fireposts"
          variant="outlined"
          startIcon={<ArrowBackIcon />}
        >
          목록으로 돌아가기
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* 뒤로가기 버튼과 글 작성 버튼 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            component={Link}
            to="/fireposts"
            variant="outlined"
            startIcon={<ArrowBackIcon />}
          >
            목록으로 돌아가기
          </Button>
          
          <Button
            component={Link}
            to="/fireposts/create"
            variant="contained"
            startIcon={<EditIcon />}
          >
            새 포스트 작성
          </Button>
        </Box>

        {/* 포스트 내용 */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              {post.title}
            </Typography>
            <Chip 
              icon={<AccessTimeIcon />}
              label={post.createdAt.toLocaleDateString('ko-KR')}
              variant="outlined"
              size="small"
            />
          </Box>
          
          <Typography variant="body1" sx={{ 
            lineHeight: 1.8, 
            fontSize: '1.1rem',
            color: 'text.secondary',
            mb: 3
          }}>
            {post.body}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* 포스트 메타 정보 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <PersonIcon />
            </Avatar>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                작성자: {post.userId || '익명'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                작성일: {post.createdAt.toLocaleString('ko-KR')}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* 댓글 섹션 */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CommentIcon color="primary" />
              <Typography variant="h6" component="h2">
                댓글 ({comments.length})
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setCommentDialogOpen(true)}
              size="small"
            >
              댓글 작성
            </Button>
          </Box>

          {comments.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              아직 댓글이 없습니다.
            </Typography>
          ) : (
            <Stack spacing={3}>
              {comments.map((comment) => (
                <Box key={comment.id} sx={{ 
                  p: 3, 
                  bgcolor: 'grey.50', 
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'grey.200'
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                        {comment.name?.charAt(0) || 'U'}
                      </Avatar>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                        {comment.name || '익명'}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {comment.createdAt.toLocaleString('ko-KR')}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                    {comment.body}
                  </Typography>
                </Box>
              ))}
            </Stack>
          )}
        </Paper>
      </Stack>

      {/* 댓글 작성 다이얼로그 */}
      <Dialog open={commentDialogOpen} onClose={handleCommentDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>댓글 작성</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="이름"
              value={newComment.name}
              onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="댓글 내용"
              value={newComment.body}
              onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
              fullWidth
              multiline
              rows={4}
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCommentDialogClose} disabled={submittingComment}>
            취소
          </Button>
          <Button 
            onClick={handleSubmitComment} 
            variant="contained"
            disabled={!newComment.name.trim() || !newComment.body.trim() || submittingComment}
          >
            {submittingComment ? '작성 중...' : '댓글 작성'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default FirePost 