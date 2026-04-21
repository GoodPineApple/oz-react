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
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Alert from "@mui/material/Alert";
import useUserStore from "../../store/userStore";

const UserView = () => {
  const {
    user,
    getUser,
    resetUser,
    resetError,
    deleteUser,
    isLoading,
    isError,
    error,
  } = useUserStore();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    resetError();
    resetUser();
    if (id) {
      getUser(id);
    }
  }, [id, getUser, resetUser, resetError]);

  const handleNavigateToPost = () => {
    navigate(`/day26/post?userId=${id}`);
  };

  const numericId = id ? Number(id) : NaN;
  const loaded = Boolean(id) && user.id === numericId && !isLoading;

  const handleDelete = async () => {
    if (!id) return;
    await deleteUser(id);
    setConfirmOpen(false);
    if (!useUserStore.getState().isError) {
      navigate("/day26/user");
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1">
        사용자 상세
      </Typography>
      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          뒤로
        </Button>
        <Button variant="outlined" component={RouterLink} to="/day26/user">
          목록
        </Button>
        {id && (
          <>
            <Button
              variant="contained"
              component={RouterLink}
              to={`/day26/user/${id}/edit`}
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
        <Button
          variant="contained"
          onClick={handleNavigateToPost}
          disabled={!id}
        >
          이 사용자의 게시글
        </Button>
      </Stack>
      {isError && (
        <Alert severity="error" onClose={resetError}>
          {error?.message ?? "요청에 실패했습니다."}
        </Alert>
      )}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          User ID: {id ?? "—"}
        </Typography>
        {!id ? (
          <Typography color="text.secondary">
            사용자 상세는 목록에서 선택하거나 URL에 id를 넣어 주세요.
          </Typography>
        ) : isLoading && !loaded ? (
          <Box sx={{ mt: 1 }}>
            <Skeleton width="60%" height={32} />
            <Skeleton width="80%" />
            <Skeleton width="70%" />
          </Box>
        ) : !loaded ? (
          <Typography color="text.secondary">
            사용자를 찾을 수 없습니다.
          </Typography>
        ) : (
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                이름
              </Typography>
              <Typography variant="body1">{user.name}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                이메일
              </Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                전화
              </Typography>
              <Typography variant="body1">{user.phone}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                웹사이트
              </Typography>
              <Typography variant="body1">{user.website}</Typography>
            </Box>
          </Stack>
        )}
      </Paper>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>사용자 삭제</DialogTitle>
        <DialogContent>
          <DialogContentText>
            이 사용자를 삭제할까요? 연관 데이터는 백엔드 정책에 따릅니다.
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

export default UserView;
