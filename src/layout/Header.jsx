import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Day 25", to: "/day25" },
  { label: "Day 26", to: "/day26" },
  { label: "User", to: "/day26/user" },
  { label: "Post", to: "/day26/post" },
];

const Header = () => {
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
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
