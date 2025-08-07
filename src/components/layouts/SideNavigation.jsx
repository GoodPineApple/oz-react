import { Link } from 'react-router'
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText,
  Divider,
  Alert
} from '@mui/material'
import { 
  Article as ArticleIcon,
  Description as DescriptionIcon,
  LocalFireDepartment as FireIcon
} from '@mui/icons-material'

function SideNavigation() {
  const popularPosts = [1, 2, 3, 4, 5, 10, 15, 20, 25, 50]
  
  return (
    <Paper 
      elevation={1} 
      sx={{ 
        width: 256, 
        borderRight: '1px solid', 
        borderColor: 'grey.200',
        borderRadius: 0
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 'semibold', 
            mb: 3, 
            pb: 1.5, 
            borderBottom: '2px solid', 
            borderColor: 'primary.main' 
          }}
        >
          📋 Posts Menu
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <Button
            component={Link}
            to="/posts"
            variant="contained"
            fullWidth
            startIcon={<ArticleIcon />}
            sx={{ mb: 2, py: 1.5 }}
          >
            📋 All Posts
          </Button>
          
          <Button
            component={Link}
            to="/fireposts"
            variant="outlined"
            fullWidth
            startIcon={<FireIcon />}
            sx={{ mb: 3, py: 1.5 }}
          >
            🔥 Fire Posts
          </Button>
          
          <Typography 
            variant="caption" 
            sx={{ 
              fontWeight: 'semibold', 
              textTransform: 'uppercase', 
              letterSpacing: 1,
              color: 'text.secondary',
              display: 'block',
              mb: 2
            }}
          >
            Popular Posts
          </Typography>
          
          <List dense>
            {popularPosts.map(postId => (
              <ListItem key={postId} disablePadding>
                <ListItemButton
                  component={Link}
                  to={`/posts/${postId}`}
                  sx={{ 
                    borderRadius: 1,
                    '&:hover': {
                      bgcolor: 'primary.50'
                    }
                  }}
                >
                  <DescriptionIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                  <ListItemText 
                    primary={`Post #${postId}`}
                    primaryTypographyProps={{ 
                      variant: 'body2',
                      color: 'primary.main'
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        
        <Alert severity="info" sx={{ borderRadius: 2 }}>
          <Typography variant="caption">
            💡 Tip: Click on any post to see details, author info, and comments!
          </Typography>
        </Alert>
      </Box>
    </Paper>
  )
}

export default SideNavigation 