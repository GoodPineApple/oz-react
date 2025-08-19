import { List } from '@mui/material'
import TaskItem from './TaskItem'

function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  return (
    <List sx={{ p: 0, my: 3 }}>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </List>
  )
}

export default TaskList 