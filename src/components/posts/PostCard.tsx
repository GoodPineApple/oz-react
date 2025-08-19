import { Link } from 'react-router'
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip 
} from '@mui/material'

function PostCard({ from, post, searchTerm, highlightEnabled }) {
  // 텍스트에서 검색어를 하이라이팅하는 함수
  const highlightText = (text, term) => {
    if (!term || !highlightEnabled) {
      return text
    }

    const regex = new RegExp(`(${term})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => {
      if (part.toLowerCase() === term.toLowerCase()) {
        return `<mark style="background-color: #fef3c7; padding: 0 2px; border-radius: 2px;">${part}</mark>`
      }
      return part
    }).join('')
  }

  return (
    <Link to={`/${from}/${post.id}`} style={{ textDecoration: 'none' }}>
      <Card 
        elevation={2} 
        sx={{ 
          height: '100%',
          transition: 'box-shadow 0.2s',
          '&:hover': {
            boxShadow: 4
          }
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Chip 
              label={`#${post.id}`} 
              size="small" 
              color="primary" 
              variant="outlined"
            />
            <Typography variant="body2" color="text.secondary">
              작성자 {post.userId}
            </Typography>
          </Box>
          
          <Typography 
            variant="h6" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 'semibold',
              lineHeight: 1.4,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}
            dangerouslySetInnerHTML={{ 
              __html: highlightText(post.title, searchTerm) 
            }}
          />
          
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              lineHeight: 1.6,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical'
            }}
            dangerouslySetInnerHTML={{ 
              __html: highlightText(post.body, searchTerm) 
            }}
          />
        </CardContent>
      </Card>
    </Link>
  )
}

export default PostCard 