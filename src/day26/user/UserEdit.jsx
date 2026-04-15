import { useEffect, useState } from "react";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import useUserStore from "../../store/userStore";

function UserEditForm({ id, user }) {
  const navigate = useNavigate();
  const { updateUser, isLoading } = useUserStore();
  const [form, setForm] = useState({
    name: user.name ?? "",
    email: user.email ?? "",
    phone: user.phone ?? "",
    website: user.website ?? "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(id, { ...user, ...form });
    if (!useUserStore.getState().isError) {
      navigate(`/day26/user/${id}`);
    }
  };

  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          이름
        </Typography>
        <TextField
          label="이름"
          fullWidth
          size="small"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </Box>
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          이메일
        </Typography>
        <TextField
          label="이메일"
          fullWidth
          size="small"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </Box>
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          전화
        </Typography>
        <TextField
          label="전화"
          fullWidth
          size="small"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </Box>
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          웹사이트
        </Typography>
        <TextField
          label="웹사이트"
          fullWidth
          size="small"
          value={form.website}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
        />
      </Box>
      <Button type="submit" variant="contained" disabled={isLoading}>
        저장
      </Button>
    </Stack>
  );
}

const UserEdit = () => {
  const { id } = useParams();
  const {
    user,
    getUser,
    resetUser,
    resetError,
    isLoading,
    isError,
    error,
  } = useUserStore();

  useEffect(() => {
    resetError();
    resetUser();
    if (id) {
      getUser(id);
    }
  }, [id, getUser, resetUser, resetError]);

  const numericId = id ? Number(id) : NaN;
  const loaded = Boolean(id) && user.id === numericId;
  const loadFailed = Boolean(id) && !isLoading && user.id !== numericId;

  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1">
        사용자 수정
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Button variant="outlined" component={RouterLink} to="/day26/user">
          목록
        </Button>
        {id && (
          <Button
            variant="outlined"
            component={RouterLink}
            to={`/day26/user/${id}`}
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
            수정할 사용자 id가 없습니다.
          </Typography>
        ) : loadFailed ? (
          <Typography color="text.secondary">
            사용자를 찾을 수 없습니다.
          </Typography>
        ) : !loaded ? (
          <Typography color="text.secondary">불러오는 중…</Typography>
        ) : (
          <UserEditForm key={id} id={id} user={user} />
        )}
      </Paper>
    </Stack>
  );
};

export default UserEdit;
