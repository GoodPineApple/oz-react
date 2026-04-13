import { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MyThemeContext } from "../context/MyThemeContext";
import SnackBar from "../common/snack-bar/SnackBar";

const Footer = () => {
  const { theme, toggleTheme } = useContext(MyThemeContext);
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.dark",
        color: "primary.contrastText",
        py: 2,
        px: 2,
        textAlign: "center",
      }}
    >
      <SnackBar />
      <Typography variant="body2">Footer ({theme})</Typography>
      <Button onClick={toggleTheme}>Toggle Theme</Button>
    </Box>
  );
};

export default Footer;
