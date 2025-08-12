import { useState } from 'react'
import { useNavigate } from 'react-router'
import { 
  Stack, 
  Button, 
  Container, 
  Paper, 
  Typography, 
  Box,
  Alert,
  Snackbar
} from '@mui/material'
import { Article as ArticleIcon } from '@mui/icons-material'
import TaskInput from '../../../components/todo/TaskInput'
import TaskList from '../../../components/todo/TaskList'
import TaskCounter from '../../../components/todo/TaskCounter'

function Todo() {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [priority, setPriority] = useState('low')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const addTask = () => {
    const taskText = inputValue.trim()
    if (taskText === '') {
      setSnackbarMessage('할일을 입력해주세요')
      setOpenSnackbar(true)
      return
    }

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: taskText,
        completed: false,
        priority: priority
      }
    ])
    setInputValue('')
  }

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ))
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const clearAllTasks = () => {
    if (tasks.length === 0) {
      setSnackbarMessage('삭제할 할 일이 없습니다.')
      setOpenSnackbar(true)
      return
    }
    setTasks([])
  }

  const moveToPosts = () => {
    setSnackbarMessage('게시판으로 이동합니다.')
    setOpenSnackbar(true)
    navigate('/posts')
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4, fontWeight: 'bold', color: 'text.primary' }}>
          ✅ 할 일 목록
        </Typography>
        
        <Stack spacing={2} direction="row" sx={{ mb: 4 }}>
          <Button variant="text" fullWidth>
            Text
          </Button>
          <Button variant="contained" fullWidth>
            Contained
          </Button>
          <Button variant="outlined" fullWidth>
            Outlined
          </Button>
        </Stack>

        <Button
          variant="contained"
          fullWidth
          size="large"
          startIcon={<ArticleIcon />}
          onClick={moveToPosts}
          sx={{ mb: 4, py: 1.5, textTransform: 'none', fontSize: '1.1rem' }}
        >
          📋 게시판으로 이동
        </Button>
        
        <TaskInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          priority={priority}
          setPriority={setPriority}
          onAddTask={addTask}
          onClearAllTasks={clearAllTasks}
        />
        
        <TaskCounter count={tasks.length} />
        
        <TaskList
          tasks={tasks}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
        />
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default Todo
