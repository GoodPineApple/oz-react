import { Typography } from '@mui/material'

const PostContent = ({ post }) => {
  return (
    <article>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        {post.title}
      </Typography>
      <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
        {post.body}
      </Typography>
    </article>
  )
}

export default PostContent 