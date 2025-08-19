import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
  increment, 
  decrement, 
  incrementByAmount, 
  reset 
} from '../../../util/store/counterSlice'
import {
  fetchPostById,
  clearPost,
  clearError
} from '../../../util/store/postsSlice'
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Stack,
  Chip,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Divider
} from '@mui/material'
import { 
  Add as AddIcon, 
  Remove as RemoveIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  Clear as ClearIcon
} from '@mui/icons-material'

const Counter = () => {
  const count = useSelector((state) => state.counter?.value || 0)
  const postsState = useSelector((state) => state.posts)
  const { currentPost = null, loading = false, error = null, lastFetchedId = null } = postsState || {}
  
  const dispatch = useDispatch()
  const [incrementAmount, setIncrementAmount] = useState('2')

  const incrementValue = Number(incrementAmount) || 0

  // counter 값이 변경될 때 자동으로 post 조회
  useEffect(() => {
    if (count > 0 && count !== lastFetchedId) {
      dispatch(fetchPostById(count))
    }
  }, [count, lastFetchedId, dispatch])

  const handleFetchPost = () => {
    console.log(postsState)
    if (count > 0) {
      dispatch(fetchPostById(count))
    }
  }

  const handleClearPost = () => {
    dispatch(clearPost())
  }

  const handleClearError = () => {
    dispatch(clearError())
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Counter & Posts
        </Typography>
        
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Chip 
            label={count} 
            size="large"
            sx={{ 
              fontSize: '2rem', 
              height: 80, 
              '& .MuiChip-label': { 
                fontSize: '2rem',
                fontWeight: 'bold',
                px: 3
              }
            }}
            color="primary"
          />
        </Box>

        <Stack spacing={3}>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              onClick={() => dispatch(increment())}
              startIcon={<AddIcon />}
              size="large"
            >
              +
            </Button>
            <Button
              variant="contained"
              onClick={() => dispatch(decrement())}
              startIcon={<RemoveIcon />}
              size="large"
              color="secondary"
            >
              -
            </Button>
          </Stack>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
            <TextField
              label="증가할 값"
              value={incrementAmount}
              onChange={(e) => setIncrementAmount(e.target.value)}
              type="number"
              size="small"
              sx={{ width: 120 }}
            />
            <Button
              variant="outlined"
              onClick={() => dispatch(incrementByAmount(incrementValue))}
              disabled={incrementValue === 0}
            >
              Add Amount
            </Button>
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="outlined"
              onClick={() => dispatch(reset())}
              startIcon={<RefreshIcon />}
              color="error"
            >
              Reset
            </Button>
          </Box>
        </Stack>
      </Paper>

      {/* Post 조회 섹션 */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Post Data (ID: {count})
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Button
            variant="contained"
            onClick={handleFetchPost}
            startIcon={<SearchIcon />}
            disabled={count <= 0 || loading}
          >
            Fetch Post
          </Button>
          <Button
            variant="outlined"
            onClick={handleClearPost}
            startIcon={<ClearIcon />}
            disabled={!currentPost && !error}
          >
            Clear
          </Button>
        </Stack>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert 
            severity="error" 
            onClose={handleClearError}
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        )}

        {currentPost && !loading && (
          <Card variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" component="h3" color="primary" gutterBottom>
                Post #{currentPost.id}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                User ID: {currentPost.userId}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                {currentPost.title}
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                {currentPost.body}
              </Typography>
            </CardContent>
          </Card>
        )}

        {count <= 0 && !currentPost && !loading && (
          <Alert severity="info">
            Counter 값을 1 이상으로 설정하여 Post를 조회해보세요.
          </Alert>
        )}
      </Paper>
    </Box>
  )
}

export default Counter 