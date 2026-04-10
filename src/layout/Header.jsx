import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { auth } from "../util/firebase";
import { AuthContext } from "../context/AuthContext";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Day 25", to: "/day25" },
  { label: "User", to: "/day26/user" },
  { label: "Post", to: "/day26/post" },
  { label: "Albums", to: "/albums" },
];

const Header = () => {
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar sx={{ flexWrap: "wrap", gap: 1, py: 1 }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            color: "inherit",
            textDecoration: "none",
            fontWeight: 700,
            mr: 1,
          }}
        >
          My App
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Stack
          direction="row"
          spacing={0.5}
          useFlexGap
          flexWrap="wrap"
          justifyContent="flex-end"
          alignItems="center"
        >
          {navItems.map(({ label, to }) => (
            <Button
              key={to}
              component={RouterLink}
              to={to}
              color="inherit"
              size="small"
            >
              {label}
            </Button>
          ))}
          {user ? (
            <>
              <Button
                component={RouterLink}
                to="/mypage"
                color="inherit"
                size="small"
              >
                MyPage
              </Button>
              <Button
                type="button"
                color="inherit"
                size="small"
                onClick={handleLogout}
              >
                로그아웃
              </Button>
            </>
          ) : (
            <Button
              component={RouterLink}
              to="/login"
              color="inherit"
              size="small"
              variant="outlined"
              sx={{ borderColor: "rgba(255,255,255,0.5)", color: "inherit" }}
            >
              로그인
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
