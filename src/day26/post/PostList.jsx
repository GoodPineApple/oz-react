import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import usePostStore from "../../store/postStore";

const PostList = () => {
  const [searchParams] = useSearchParams();
  const userIdParam = searchParams.get("userId");
  const [userId, setUserId] = useState(userIdParam ? Number(userIdParam) : 0);
  const { posts, isLoading, getPosts } = usePostStore();

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const filteredPosts = posts.filter((post) => post.userId === userId);
  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1">
        Post List
      </Typography>
      <TextField
        label="User ID"
        type="number"
        size="small"
        value={userId}
        onChange={(e) => setUserId(Number(e.target.value))}
        sx={{ maxWidth: 200 }}
      />
      <Typography variant="body2" color="text.secondary">
        User ID: {userId}
      </Typography>
      {isLoading ? (
        <Stack alignItems="center" sx={{ py: 4 }}>
          <CircularProgress />
        </Stack>
      ) : filteredPosts.length > 0 ? (
        <Stack spacing={0}>
          {filteredPosts.map((post) => (
            <PostItem key={`post-${post.id}`} post={post} />
          ))}
        </Stack>
      ) : (
        <Typography color="text.secondary">No posts found</Typography>
      )}
    </Stack>
  );
};

const PostItem = ({ post }) => {
  return (
    <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        {post.id}. {post.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        {post.body}
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Typography variant="caption" color="text.secondary">
        User ID: {post.userId}
      </Typography>
    </Paper>
  );
};

export default PostList;
