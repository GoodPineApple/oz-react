import { 
  ListItem, 
  ListItemText, 
  IconButton, 
  Chip,
  Box 
} from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'

function TaskItem({ task, onToggleTask, onDeleteTask }) {
  return (
    <ListItem
      sx={{
        mb: 1,
        bgcolor: 'grey.50',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'grey.200',
        '&:hover': {
          boxShadow: 2,
          transition: 'box-shadow 0.2s'
        }
      }}
    >
      <ListItemText
        primary={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <span
              onClick={() => onToggleTask(task.id)}
              style={{
                cursor: 'pointer',
                flex: 1,
                textDecoration: task.completed ? 'line-through' : 'none',
                fontWeight: task.priority === 'high' ? 'bold' : 'normal',
                color: task.priority === 'high' ? 'error.main' : (task.completed ? 'text.secondary' : 'text.primary')
              }}
            >
              {task.text}
            </span>
            {task.priority === 'high' && (
              <Chip 
                label="높음" 
                size="small" 
                color="error" 
                variant="outlined"
              />
            )}
          </Box>
        }
        sx={{ 
          '& .MuiListItemText-primary': {
            fontSize: '0.875rem'
          }
        }}
      />
      <IconButton
        onClick={() => onDeleteTask(task.id)}
        color="error"
        size="small"
        sx={{ ml: 1 }}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}

export default TaskItem 