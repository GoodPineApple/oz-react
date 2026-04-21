import { useState, useEffect, type ChangeEvent } from "react";
import { useSearchParams, Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import usePostStore from "../../store/postStore";
import type { Post } from "../../model";

const PostList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const userIdParam = searchParams.get("userId");
  const userIdFilter =
    userIdParam != null && userIdParam !== "" ? Number(userIdParam) : null;
  const [deleteTarget, setDeleteTarget] = useState<Post | null>(null);
  const { posts, isLoading, getPosts, deletePost } = usePostStore();

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const handleUserIdFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const raw = e.target.value;
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (raw === "" || Number.isNaN(Number(raw))) {
          next.delete("userId");
        } else {
          next.set("userId", String(Number(raw)));
        }
        return next;
      },
      { replace: true },
    );
  };

  const filteredPosts: Post[] =
    userIdFilter == null || Number.isNaN(userIdFilter)
      ? posts
      : posts.filter((post) => post.userId === userIdFilter);

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    await deletePost(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1">
        게시글 목록
      </Typography>
      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
        <Button variant="contained" component={RouterLink} to="/day26/post-add">
          글쓰기
        </Button>
      </Stack>
      <TextField
        label="User ID로 필터 (비우면 전체)"
        type="number"
        size="small"
        value={userIdFilter ?? ""}
        onChange={handleUserIdFilterChange}
        sx={{ maxWidth: 280 }}
        helperText={
          userIdFilter == null || Number.isNaN(userIdFilter)
            ? "전체 게시글을 표시합니다."
            : `User ID ${userIdFilter} 게시글만 표시합니다.`
        }
      />
      {isLoading ? (
        <Stack sx={{ alignItems: "center", py: 4 }}>
          <CircularProgress />
        </Stack>
      ) : filteredPosts.length > 0 ? (
        <Stack spacing={0}>
          {filteredPosts.map((post) => (
            <PostItem
              key={`post-${post.id}`}
              post={post}
              onDeleteClick={() => setDeleteTarget(post)}
            />
          ))}
        </Stack>
      ) : (
        <Typography color="text.secondary">게시글이 없습니다.</Typography>
      )}

      <Dialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
      >
        <DialogTitle>게시글 삭제</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {deleteTarget ? `「${deleteTarget.title}」 글을 삭제할까요?` : ""}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>취소</Button>
          <Button color="error" onClick={handleConfirmDelete} autoFocus>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

interface PostItemProps {
  post: Post;
  onDeleteClick: () => void;
}

const PostItem = ({ post, onDeleteClick }: PostItemProps) => {
  return (
    <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
      <Stack
        direction="row"
        spacing={1}
        sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
      >
        <Box
          component={RouterLink}
          to={`/day26/post/${post.id}`}
          sx={{
            flex: 1,
            minWidth: 0,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            {post.id}. {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {post.body}
          </Typography>
        </Box>
        <IconButton
          aria-label="삭제"
          color="error"
          size="small"
          onClick={(e) => {
            e.preventDefault();
            onDeleteClick();
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
      <Divider sx={{ my: 1 }} />
      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
        <Typography variant="caption" color="text.secondary">
          User ID: {post.userId}
        </Typography>
        <Button
          size="small"
          component={RouterLink}
          to={`/day26/post/${post.id}/edit`}
        >
          수정
        </Button>
      </Stack>
    </Paper>
  );
};

export default PostList;
