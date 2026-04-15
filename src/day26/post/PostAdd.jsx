import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import usePostStore from "../../store/postStore";

const PostAdd = () => {
  const navigate = useNavigate();
  const { addPost, isLoading, isError, error, resetError } = usePostStore();
  const [form, setForm] = useState({
    userId: 1,
    title: "",
    body: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetError();
    const payload = {
      userId: Number(form.userId) || 1,
      title: form.title.trim(),
      body: form.body.trim(),
    };
    const created = await addPost(payload);
    if (created?.id) {
      navigate(`/day26/post/${created.id}`);
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1">
        게시글 작성
      </Typography>
      <Button variant="outlined" component={RouterLink} to="/day26/post" sx={{ alignSelf: "flex-start" }}>
        목록으로
      </Button>
      {isError && (
        <Alert severity="error" onClose={resetError}>
          {error?.message ?? "요청에 실패했습니다."}
        </Alert>
      )}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack
          spacing={2}
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              작성자 User ID
            </Typography>
            <TextField
              label="User ID"
              type="number"
              fullWidth
              size="small"
              inputProps={{ min: 1 }}
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
            등록
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default PostAdd;
