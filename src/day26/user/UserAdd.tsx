import { useState, type FormEvent } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";
import type { User } from "../../model";

const UserAdd = () => {
  const { addUser, isLoading, isError, error, resetError } = useUserStore();
  const navigate = useNavigate();
  const [user, setUser] = useState<Pick<User, "name" | "email">>({
    name: "",
    email: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetError();
    await addUser(user);
    if (!useUserStore.getState().isError) {
      navigate("/day26/user");
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1">
        User Add
      </Typography>
      <Button variant="contained" component={RouterLink} to={`/day26/user`}>
        사용자 목록으로 이동
      </Button>
      {isError && (
        <Alert severity="error" onClose={resetError}>
          {error?.message ?? "요청에 실패했습니다."}
        </Alert>
      )}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack
          spacing={2}
          sx={{ mt: 1 }}
          component="form"
          onSubmit={handleSubmit}
        >
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              User Name
            </Typography>
            <TextField
              label="User Name"
              fullWidth
              size="small"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              User Email
            </Typography>
            <TextField
              label="User Email"
              fullWidth
              size="small"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </Box>
          <Button type="submit" variant="contained" disabled={isLoading}>
            사용자 추가
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default UserAdd;
