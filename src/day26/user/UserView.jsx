import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import useUserStore from "../../store/userStore";

const UserView = () => {
  const { user, getUser, resetUser } = useUserStore();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    resetUser();
    if (id) {
      getUser(id);
    }
  }, [id, getUser, resetUser]);

  const handleNavigateToPost = () => {
    navigate(`/day26/post?userId=${id}`);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1">
        User View
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleNavigateToPost}
          disabled={!id}
        >
          게시글 보러 이동하기
        </Button>
      </Stack>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          User ID: {id ?? "—"}
        </Typography>
        {!id ? (
          <Typography color="text.secondary">
            사용자 상세는 목록에서 선택하거나 URL에 id를 넣어 주세요.
          </Typography>
        ) : !user ? (
          <Box sx={{ mt: 1 }}>
            <Skeleton width="60%" height={32} />
            <Skeleton width="80%" />
            <Skeleton width="70%" />
          </Box>
        ) : (
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                User Name
              </Typography>
              <Typography variant="body1">{user.name}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                User Email
              </Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Box>
          </Stack>
        )}
      </Paper>
    </Stack>
  );
};

export default UserView;
