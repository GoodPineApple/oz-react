import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import useCommentStore from "../../store/commentStore";

function CommentEditForm({ comment, postId, onClose }) {
  const { updateComment, isMutating } = useCommentStore();
  const [form, setForm] = useState({
    name: comment.name ?? "",
    email: comment.email ?? "",
    body: comment.body ?? "",
  });

  const handleSave = async () => {
    const payload = {
      ...comment,
      postId: Number(postId),
      name: form.name.trim(),
      email: form.email.trim(),
      body: form.body.trim(),
    };
    const updated = await updateComment(comment.id, payload);
    if (updated) onClose();
  };

  return (
    <>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="이름"
            fullWidth
            size="small"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            label="이메일"
            fullWidth
            size="small"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            label="내용"
            fullWidth
            multiline
            minRows={3}
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={isMutating || !form.body.trim()}
        >
          저장
        </Button>
      </DialogActions>
    </>
  );
}

function CommentEditDialog({ open, comment, postId, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>댓글 수정</DialogTitle>
      {comment ? (
        <CommentEditForm
          key={comment.id}
          comment={comment}
          postId={postId}
          onClose={onClose}
        />
      ) : null}
    </Dialog>
  );
}

const PostComments = ({ postId }) => {
  const {
    comments,
    getCommentsByPostId,
    addComment,
    deleteComment,
    resetComments,
    resetError,
    isListLoading,
    isMutating,
    isError,
    error,
  } = useCommentStore();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [newComment, setNewComment] = useState({
    name: "",
    email: "",
    body: "",
  });

  useEffect(() => {
    if (!postId) return undefined;
    resetError();
    getCommentsByPostId(postId);
    return () => {
      resetComments();
    };
  }, [postId, getCommentsByPostId, resetComments, resetError]);

  const handleAdd = async (e) => {
    e.preventDefault();
    resetError();
    const payload = {
      postId: Number(postId),
      name: newComment.name.trim() || "익명",
      email: newComment.email.trim() || "anonymous@example.com",
      body: newComment.body.trim(),
    };
    if (!payload.body) return;
    const created = await addComment(payload);
    if (created) {
      setNewComment({ name: "", email: "", body: "" });
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteComment(deleteTarget.id);
    setDeleteTarget(null);
  };

  if (!postId) return null;

  return (
    <Stack spacing={2}>
      <Typography variant="h6" component="h2">
        댓글
      </Typography>
      {isError && (
        <Alert severity="error" onClose={resetError}>
          {error?.message ?? "댓글 요청에 실패했습니다."}
        </Alert>
      )}
      {isListLoading ? (
        <Stack alignItems="center" sx={{ py: 3 }}>
          <CircularProgress size={32} />
        </Stack>
      ) : comments.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          아직 댓글이 없습니다.
        </Typography>
      ) : (
        <Stack spacing={1.5} divider={<Divider flexItem />}>
          {comments.map((c) => (
            <Paper key={c.id} variant="outlined" sx={{ p: 2 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={1}
              >
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography variant="subtitle2" component="span">
                    {c.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block" }}
                  >
                    {c.email}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, whiteSpace: "pre-wrap" }}
                  >
                    {c.body}
                  </Typography>
                </Box>
                <Stack direction="row">
                  <IconButton
                    size="small"
                    aria-label="댓글 수정"
                    onClick={() => setEditTarget(c)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    aria-label="댓글 삭제"
                    onClick={() => setDeleteTarget(c)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          댓글 작성
        </Typography>
        <Stack
          component="form"
          spacing={2}
          onSubmit={handleAdd}
          sx={{ mt: 1 }}
        >
          <TextField
            label="이름"
            size="small"
            fullWidth
            value={newComment.name}
            onChange={(e) =>
              setNewComment({ ...newComment, name: e.target.value })
            }
            placeholder="비우면 익명"
          />
          <TextField
            label="이메일"
            size="small"
            fullWidth
            type="email"
            value={newComment.email}
            onChange={(e) =>
              setNewComment({ ...newComment, email: e.target.value })
            }
            placeholder="비우면 기본값"
          />
          <TextField
            label="내용"
            size="small"
            fullWidth
            required
            multiline
            minRows={2}
            value={newComment.body}
            onChange={(e) =>
              setNewComment({ ...newComment, body: e.target.value })
            }
          />
          <Button
            type="submit"
            variant="contained"
            disabled={isMutating || !newComment.body.trim()}
          >
            등록
          </Button>
        </Stack>
      </Paper>

      <CommentEditDialog
        open={Boolean(editTarget)}
        comment={editTarget}
        postId={postId}
        onClose={() => setEditTarget(null)}
      />

      <Dialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
      >
        <DialogTitle>댓글 삭제</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            이 댓글을 삭제할까요?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>취소</Button>
          <Button
            color="error"
            onClick={handleConfirmDelete}
            disabled={isMutating}
            autoFocus
          >
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default PostComments;
