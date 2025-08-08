import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { 
  Container, 
  Paper, 
  Stack
} from '@mui/material'
import PostDetailSkeleton from '../components/posts/PostDetailSkeleton'
import PostDetailError from '../components/posts/PostDetailError'
import PostDetailNotFound from '../components/posts/PostDetailNotFound'
import PostHeader from '../components/posts/PostHeader'
import PostContent from '../components/posts/PostContent'
import AuthorInfo from '../components/posts/AuthorInfo'
import CommentsList from '../components/posts/CommentsList'

const Post = () => {
  const { postId } = useParams()
  const [post, setPost] = useState(null)
  const [user, setUser] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true)
        setError(null)

        // 포스트 상세 정보 가져오기
        const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        if (!postResponse.ok) {
          throw new Error('포스트를 찾을 수 없습니다.')
        }
        const postData = await postResponse.json()
        setPost(postData)

        // 사용자 정보와 댓글을 병렬로 가져오기
        const [userResponse, commentsResponse] = await Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`),
          fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        ])

        if (!userResponse.ok) {
          throw new Error('사용자 정보를 가져올 수 없습니다.')
        }
        if (!commentsResponse.ok) {
          throw new Error('댓글을 가져올 수 없습니다.')
        }

        const userData = await userResponse.json()
        const commentsData = await commentsResponse.json()

        setUser(userData)
        setComments(commentsData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (postId) {
      fetchPostData()
    }
  }, [postId])

  if (loading) {
    return <PostDetailSkeleton />
  }

  if (error) {
    return <PostDetailError error={error} />
  }

  if (!post) {
    return <PostDetailNotFound />
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <PostHeader postId={post.id} />
          <PostContent post={post} />
        </Paper>

        <AuthorInfo user={user} />
        
        <CommentsList comments={comments} />
      </Stack>
    </Container>
  )
}

export default Post