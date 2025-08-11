import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
  increment, 
  decrement, 
  incrementByAmount, 
  reset 
} from '../../store/counterSlice'
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Stack,
  Chip
} from '@mui/material'
import { 
  Add as AddIcon, 
  Remove as RemoveIcon,
  Refresh as RefreshIcon 
} from '@mui/icons-material'

const Counter = () => {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  const [incrementAmount, setIncrementAmount] = useState('2')

  const incrementValue = Number(incrementAmount) || 0

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Counter
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
    </Box>
  )
}

export default Counter 