import { useContext, useEffect, useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  type AuthError,
} from "firebase/auth";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import GoogleIcon from "@mui/icons-material/Google";
import { auth, googleProvider } from "../util/firebase";
import { AuthContext } from "../context/AuthContext";
import { AlertContext } from "../context/AlertContext";

interface LocationState {
  from?: { pathname?: string };
}

function getAuthErrorMessage(code?: string): string | null {
  switch (code) {
    case "auth/email-already-in-use":
      return "이미 사용 중인 이메일입니다.";
    case "auth/invalid-email":
      return "이메일 형식이 올바르지 않습니다.";
    case "auth/weak-password":
      return "비밀번호는 6자 이상이어야 합니다.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "이메일 또는 비밀번호가 올바르지 않습니다.";
    case "auth/popup-closed-by-user":
      return "로그인 창이 닫혔습니다. 다시 시도해 주세요.";
    case "auth/popup-blocked":
      return "팝업이 차단되었습니다. 브라우저에서 팝업을 허용해 주세요.";
    default:
      return null;
  }
}

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  const showAlert = useContext(AlertContext);

  const [tab, setTab] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fromPath = (location.state as LocationState | null)?.from?.pathname;
  const redirectPath =
    fromPath && fromPath !== "/login" ? fromPath : "/";

  useEffect(() => {
    if (!loading && user) {
      navigate(redirectPath, { replace: true });
    }
  }, [loading, user, navigate, redirectPath]);

  const reportError = (e: unknown, fallback: string) => {
    const err = e as AuthError;
    showAlert(
      getAuthErrorMessage(err.code) || err.message || fallback,
      "error",
    );
  };

  const handleGoogle = async () => {
    setSubmitting(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate(redirectPath, { replace: true });
    } catch (e) {
      reportError(e, "로그인에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate(redirectPath, { replace: true });
    } catch (e) {
      reportError(e, "로그인에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      showAlert("비밀번호가 일치하지 않습니다.", "error");
      return;
    }
    if (password.length < 6) {
      showAlert("비밀번호는 6자 이상이어야 합니다.", "error");
      return;
    }
    setSubmitting(true);
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      navigate(redirectPath, { replace: true });
    } catch (e) {
      reportError(e, "회원가입에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          계정
        </Typography>
        <Tabs
          value={tab}
          onChange={(_, v: number) => setTab(v)}
          sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}
        >
          <Tab label="로그인" />
          <Tab label="회원가입" />
        </Tabs>

        <Stack spacing={2}>
          <Button
            type="button"
            variant="outlined"
            size="large"
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={handleGoogle}
            disabled={submitting || loading}
          >
            Google로 계속하기
          </Button>

          <Divider>또는</Divider>

          {tab === 0 ? (
            <Box component="form" onSubmit={handleLogin}>
              <Stack spacing={2}>
                <TextField
                  label="이메일"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  required
                  fullWidth
                />
                <TextField
                  label="비밀번호"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                  required
                  fullWidth
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={submitting || loading}
                >
                  로그인
                </Button>
              </Stack>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleSignup}>
              <Stack spacing={2}>
                <TextField
                  label="이메일"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  required
                  fullWidth
                />
                <TextField
                  label="비밀번호"
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                  required
                  fullWidth
                />
                <TextField
                  label="비밀번호 확인"
                  type="password"
                  name="passwordConfirm"
                  autoComplete="new-password"
                  value={passwordConfirm}
                  onChange={(ev) => setPasswordConfirm(ev.target.value)}
                  required
                  fullWidth
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={submitting || loading}
                >
                  회원가입
                </Button>
              </Stack>
            </Box>
          )}
        </Stack>
      </Paper>
    </Container>
  );
};

export default AuthPage;
