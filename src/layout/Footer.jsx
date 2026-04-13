import { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MyThemeContext } from "../context/MyThemeContext";

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
      <Typography variant="body2">Footer ({theme})</Typography>
      <Button onClick={toggleTheme}>Toggle Theme</Button>
    </Box>
  );
};

export default Footer;
