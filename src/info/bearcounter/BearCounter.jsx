import React, { useState, useEffect } from 'react'
import useBearStore from '../../stores/bearStore'
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
  Clear as ClearIcon,
  Pets as BearIcon
} from '@mui/icons-material'

const BearCounter = () => {
  // Zustand store를 사용한 상태 관리
  const { 
    count, 
    currentPost, 
    loading, 
    error, 
    lastFetchedId,
    increment,
    decrement,
    incrementByAmount,
    reset,
    fetchPostById,
    clearPost,
    clearError
  } = useBearStore()

  const [incrementAmount, setIncrementAmount] = useState('2')

  const incrementValue = Number(incrementAmount) || 0

  // counter 값이 변경될 때 자동으로 post 조회
  useEffect(() => {
    if (count > 0 && count !== lastFetchedId) {
      fetchPostById(count)
    }
  }, [count, lastFetchedId, fetchPostById])

  const handleFetchPost = () => {
    if (count > 0) {
      fetchPostById(count)
    }
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          <BearIcon sx={{ fontSize: '2rem', mr: 1, verticalAlign: 'middle' }} />
          Bear Counter & Posts
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
            color="secondary"
          />
        </Box>

        <Stack spacing={3}>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              onClick={increment}
              startIcon={<AddIcon />}
              size="large"
              color="secondary"
            >
              +
            </Button>
            <Button
              variant="contained"
              onClick={decrement}
              startIcon={<RemoveIcon />}
              size="large"
              color="primary"
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
              onClick={() => incrementByAmount(incrementValue)}
              disabled={incrementValue === 0}
              color="secondary"
            >
              Add Amount
            </Button>
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="outlined"
              onClick={reset}
              startIcon={<RefreshIcon />}
              color="error"
            >
              Reset Bears
            </Button>
          </Box>
        </Stack>
      </Paper>

      {/* Post 조회 섹션 */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          🐻 Bear Post Data (ID: {count})
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Button
            variant="contained"
            onClick={handleFetchPost}
            startIcon={<SearchIcon />}
            disabled={count <= 0 || loading}
            color="secondary"
          >
            Fetch Bear Post
          </Button>
          <Button
            variant="outlined"
            onClick={clearPost}
            startIcon={<ClearIcon />}
            disabled={!currentPost && !error}
          >
            Clear
          </Button>
        </Stack>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress color="secondary" />
          </Box>
        )}

        {error && (
          <Alert 
            severity="error" 
            onClose={clearError}
            sx={{ mb: 2 }}
          >
            🐻 Bear Error: {error}
          </Alert>
        )}

        {currentPost && !loading && (
          <Card variant="outlined" sx={{ borderRadius: 2, borderColor: 'secondary.main' }}>
            <CardContent>
              <Typography variant="h6" component="h3" color="secondary" gutterBottom>
                🐻 Bear Post #{currentPost.id}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Bear User ID: {currentPost.userId}
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
            🐻 Bear Counter 값을 1 이상으로 설정하여 Bear Post를 조회해보세요!
          </Alert>
        )}
      </Paper>
    </Box>
  )
}

export default BearCounter 