import { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MyThemeContext } from "../context/MyThemeContext";

const Footer = () => {
  const { theme } = useContext(MyThemeContext);
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
    </Box>
  );
};

export default Footer;
