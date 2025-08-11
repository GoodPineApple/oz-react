import { useRef } from 'react'
import { 
  Box, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Button, 
  Stack 
} from '@mui/material'

function TaskInput({ 
  inputValue, 
  setInputValue, 
  priority, 
  setPriority, 
  onAddTask, 
  onClearAllTasks 
}) {
  const lastEventTime = useRef(0)

  const handleKeyPress = (event) => {
    // 짧은 시간 내 중복 이벤트 방지 (디바운싱)
    const currentTime = Date.now()
    if (currentTime - lastEventTime.current < 100) {
      return
    }
    lastEventTime.current = currentTime

    if (event.key === 'Enter') {
      event.preventDefault()
      onAddTask()
    }
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Stack spacing={2}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <FormControl fullWidth>
            <InputLabel>우선순위</InputLabel>
            <Select
              value={priority}
              label="우선순위"
              onChange={(e) => setPriority(e.target.value)}
              size="medium"
            >
              <MenuItem value="low">낮음</MenuItem>
              <MenuItem value="high">높음</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            fullWidth
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="할 일을 입력하세요"
            onKeyUp={handleKeyPress}
            size="medium"
          />
        </Stack>
        
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button
            variant="contained"
            onClick={onAddTask}
            fullWidth
            size="large"
          >
            추가
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={onClearAllTasks}
            fullWidth
            size="large"
          >
            전체 삭제
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

export default TaskInput 