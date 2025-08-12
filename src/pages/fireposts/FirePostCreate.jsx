import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { createPost } from '../../util/firebase/firestore-utils'
import { 
  Container, 
  Paper, 
  Typography, 
  Button, 
  Box, 
  TextField,
  Stack,
  Alert,
  AlertTitle,
  Chip
} from '@mui/material'
import { 
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  Clear as ClearIcon
} from '@mui/icons-material'

const FirePostCreate = () => {
  const navigate = useNavigate()
  const [postData, setPostData] = useState({
    title: '',
    body: '',
    userId: 1 // 기본값으로 설정
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleInputChange = (field, value) => {
    setPostData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!postData.title.trim() || !postData.body.trim()) {
      setError('제목과 내용을 모두 입력해주세요.')
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const postId = await createPost(postData)
      
      setSuccess(true)
      
      // 성공 후 잠시 대기 후 상세 페이지로 이동
      setTimeout(() => {
        navigate(`/fireposts/${postId}`)
      }, 1500)
      
    } catch (error) {
      console.error('포스트 생성 중 오류:', error)
      setError('포스트 작성 중 오류가 발생했습니다: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setPostData({
      title: '',
      body: '',
      userId: 1
    })
    setError(null)
  }

  const isFormValid = postData.title.trim() && postData.body.trim()

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* 뒤로가기 버튼 */}
        <Box>
          <Button
            component={Link}
            to="/fireposts"
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 2 }}
          >
            목록으로 돌아가기
          </Button>
        </Box>

        {/* 성공 메시지 */}
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            <AlertTitle>성공!</AlertTitle>
            포스트가 성공적으로 작성되었습니다. 잠시 후 상세 페이지로 이동합니다.
          </Alert>
        )}

        {/* 오류 메시지 */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            <AlertTitle>오류</AlertTitle>
            {error}
          </Alert>
        )}

        {/* 글 작성 폼 */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              새 포스트 작성
            </Typography>
            <Chip 
              label="Firestore"
              color="primary"
              variant="outlined"
              size="small"
            />
          </Box>

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {/* 제목 입력 */}
              <TextField
                label="제목"
                value={postData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                fullWidth
                required
                placeholder="포스트 제목을 입력하세요"
                disabled={loading}
                sx={{
                  '& .MuiInputLabel-root': {
                    fontSize: '1.1rem'
                  },
                  '& .MuiInputBase-input': {
                    fontSize: '1.2rem',
                    fontWeight: 'medium'
                  }
                }}
              />

              {/* 내용 입력 */}
              <TextField
                label="내용"
                value={postData.body}
                onChange={(e) => handleInputChange('body', e.target.value)}
                fullWidth
                multiline
                rows={12}
                required
                placeholder="포스트 내용을 입력하세요"
                disabled={loading}
                sx={{
                  '& .MuiInputLabel-root': {
                    fontSize: '1.1rem'
                  },
                  '& .MuiInputBase-input': {
                    fontSize: '1.1rem',
                    lineHeight: 1.6
                  }
                }}
              />

              {/* 작성자 ID 입력 */}
              <TextField
                label="작성자 ID"
                type="number"
                value={postData.userId}
                onChange={(e) => handleInputChange('userId', parseInt(e.target.value) || 1)}
                fullWidth
                required
                disabled={loading}
                helperText="작성자의 ID를 입력하세요 (기본값: 1)"
                sx={{ maxWidth: 200 }}
              />

              {/* 버튼 그룹 */}
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  type="button"
                  variant="outlined"
                  startIcon={<ClearIcon />}
                  onClick={handleClear}
                  disabled={loading}
                >
                  초기화
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  disabled={!isFormValid || loading}
                  size="large"
                >
                  {loading ? '작성 중...' : '포스트 작성'}
                </Button>
              </Box>
            </Stack>
          </form>
        </Paper>

        {/* 작성 팁 */}
        <Paper elevation={1} sx={{ p: 3, borderRadius: 3, bgcolor: 'info.50' }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'info.main' }}>
            💡 작성 팁
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              • 제목은 명확하고 간결하게 작성해주세요
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • 내용은 자세하고 구체적으로 작성해주세요
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • 작성 후 댓글 기능을 통해 소통할 수 있습니다
            </Typography>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  )
}

export default FirePostCreate 