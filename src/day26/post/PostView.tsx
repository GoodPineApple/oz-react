import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  Link as RouterLink,
} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Alert from "@mui/material/Alert";
import Skeleton from "@mui/material/Skeleton";
import usePostStore from "../../store/postStore";
import PostComments from "./PostComments";

const PostView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    post,
    getPost,
    deletePost,
    resetPost,
    resetError,
    isLoading,
    isError,
    error,
  } = usePostStore();
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    resetError();
    resetPost();
    if (id) {
      getPost(id);
    }
  }, [id, getPost, resetPost, resetError]);

  const numericId = id ? Number(id) : NaN;
  const loaded = Boolean(id) && post.id === numericId && !isLoading;

  const handleDelete = async () => {
    if (!id) return;
    await deletePost(id);
    setConfirmOpen(false);
    if (!usePostStore.getState().isError) {
      navigate("/day26/post");
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1">
        게시글 상세
      </Typography>
      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          뒤로
        </Button>
        <Button variant="outlined" component={RouterLink} to="/day26/post">
          목록
        </Button>
        {id && (
          <>
            <Button
              variant="contained"
              component={RouterLink}
              to={`/day26/post/${id}/edit`}
            >
              수정
            </Button>
            <Button
              color="error"
              variant="outlined"
              onClick={() => setConfirmOpen(true)}
            >
              삭제
            </Button>
          </>
        )}
      </Stack>
      {isError && (
        <Alert severity="error" onClose={resetError}>
          {error?.message ?? "요청에 실패했습니다."}
        </Alert>
      )}
      <Paper variant="outlined" sx={{ p: 2 }}>
        {!id ? (
          <Typography color="text.secondary">게시글 id가 없습니다.</Typography>
        ) : isLoading && !loaded ? (
          <Stack spacing={1} sx={{ mt: 1 }}>
            <Skeleton width="50%" height={36} />
            <Skeleton width="100%" />
            <Skeleton width="90%" />
          </Stack>
        ) : !loaded ? (
          <Typography color="text.secondary">
            게시글을 찾을 수 없습니다.
          </Typography>
        ) : (
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              #{post.id} · 작성자 User ID: {post.userId}
            </Typography>
            <Typography variant="h5" component="h2">
              {post.title}
            </Typography>
            <Divider />
            <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
              {post.body}
            </Typography>
          </Stack>
        )}
      </Paper>

      {loaded && <PostComments postId={numericId} />}

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>게시글 삭제</DialogTitle>
        <DialogContent>
          <DialogContentText>
            이 게시글을 삭제할까요? 이 작업은 되돌릴 수 없습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>취소</Button>
          <Button color="error" onClick={handleDelete} autoFocus>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default PostView;
