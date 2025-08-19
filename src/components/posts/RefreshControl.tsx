import { useState, useEffect } from 'react'
import { 
  Paper, 
  Typography, 
  Button, 
  FormControlLabel, 
  Checkbox, 
  Box, 
  Stack,
  CircularProgress
} from '@mui/material'
import { Refresh as RefreshIcon } from '@mui/icons-material'

function RefreshControl({ onRefresh, loading, lastUpdated }) {
  const [autoRefresh, setAutoRefresh] = useState(false)
  const [countdown, setCountdown] = useState(30)

  useEffect(() => {
    let interval = null
    
    if (autoRefresh && !loading) {
      interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            onRefresh()
            return 30 // 30초로 리셋
          }
          return prev - 1
        })
      }, 1000)
    } else {
      setCountdown(30)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoRefresh, loading, onRefresh])

  const handleManualRefresh = () => {
    onRefresh()
    setCountdown(30) // 수동 새로고침 시 카운트다운 리셋
  }

  const formatTime = (seconds) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`
  }

  const formatLastUpdated = (timestamp) => {
    const now = new Date()
    const updated = new Date(timestamp)
    const diffSeconds = Math.floor((now - updated) / 1000)
    
    if (diffSeconds < 60) return `${diffSeconds}초 전`
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}분 전`
    return updated.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    })
  }

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          마지막 업데이트: 
          <span style={{ fontWeight: 'medium', color: 'text.primary' }}>
            {lastUpdated ? formatLastUpdated(lastUpdated) : '처음 로드'}
          </span>
        </Typography>
        
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', sm: 'center' }}>
          <Button
            variant="contained"
            onClick={handleManualRefresh}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} /> : <RefreshIcon />}
            size="medium"
          >
            {loading ? '새로고침 중...' : '새로고침'}
          </Button>

          <FormControlLabel
            control={
              <Checkbox
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                disabled={loading}
                size="small"
              />
            }
            label={
              <Typography variant="body2" color="text.secondary">
                자동 새로고침 (30초)
                {autoRefresh && !loading && (
                  <span style={{ color: 'primary.main', fontWeight: 'medium' }}>
                    {' '}- {formatTime(countdown)}
                  </span>
                )}
              </Typography>
            }
          />
        </Stack>
      </Stack>
    </Paper>
  )
}

export default RefreshControl 