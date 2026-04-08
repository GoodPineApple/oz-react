import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer = () => {
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
      <Typography variant="body2">Footer</Typography>
    </Box>
  );
};

export default Footer;
