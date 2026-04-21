import { useEffect, useState, type FormEvent } from "react";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import usePostStore from "../../store/postStore";
import type { Post } from "../../model";

interface PostEditFormProps {
  id: string;
  post: Post;
}

interface PostFormState {
  userId: number;
  title: string;
  body: string;
}

function PostEditForm({ id, post }: PostEditFormProps) {
  const navigate = useNavigate();
  const { updatePost, isLoading } = usePostStore();
  const [form, setForm] = useState<PostFormState>({
    userId: post.userId,
    title: post.title ?? "",
    body: post.body ?? "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload: Post = {
      ...post,
      userId: Number(form.userId) || post.userId,
      title: form.title.trim(),
      body: form.body.trim(),
    };
    await updatePost(id, payload);
    if (!usePostStore.getState().isError) {
      navigate(`/day26/post/${id}`);
    }
  };

  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          작성자 User ID
        </Typography>
        <TextField
          label="User ID"
          type="number"
          fullWidth
          size="small"
          slotProps={{ htmlInput: { min: 1 } }}
          value={form.userId}
          onChange={(e) =>
            setForm({ ...form, userId: Number(e.target.value) })
          }
        />
      </Box>
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          제목
        </Typography>
        <TextField
          label="제목"
          fullWidth
          required
          size="small"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </Box>
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          본문
        </Typography>
        <TextField
          label="본문"
          fullWidth
          required
          multiline
          minRows={4}
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
        />
      </Box>
      <Button type="submit" variant="contained" disabled={isLoading}>
        저장
      </Button>
    </Stack>
  );
}

const PostEdit = () => {
  const { id } = useParams<{ id: string }>();
  const {
    post,
    getPost,
    resetPost,
    resetError,
    isLoading,
    isError,
    error,
  } = usePostStore();

  useEffect(() => {
    resetError();
    resetPost();
    if (id) {
      getPost(id);
    }
  }, [id, getPost, resetPost, resetError]);

  const numericId = id ? Number(id) : NaN;
  const loaded = Boolean(id) && post.id === numericId;
  const loadFailed = Boolean(id) && !isLoading && post.id !== numericId;

  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1">
        게시글 수정
      </Typography>
      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
        <Button variant="outlined" component={RouterLink} to="/day26/post">
          목록
        </Button>
        {id && (
          <Button
            variant="outlined"
            component={RouterLink}
            to={`/day26/post/${id}`}
          >
            상세
          </Button>
        )}
      </Stack>
      {isError && (
        <Alert severity="error" onClose={resetError}>
          {error?.message ?? "요청에 실패했습니다."}
        </Alert>
      )}
      <Paper variant="outlined" sx={{ p: 2 }}>
        {!id ? (
          <Typography color="text.secondary">
            수정할 게시글 id가 없습니다.
          </Typography>
        ) : loadFailed ? (
          <Typography color="text.secondary">
            게시글을 찾을 수 없습니다.
          </Typography>
        ) : !loaded ? (
          <Typography color="text.secondary">불러오는 중…</Typography>
        ) : (
          <PostEditForm key={id} id={id} post={post} />
        )}
      </Paper>
    </Stack>
  );
};

export default PostEdit;
