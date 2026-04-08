import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const StyledBox = () => {
  return (
    <Box
      component="section"
      sx={{
        p: 2,
        border: "1px dashed",
        borderColor: "divider",
        borderRadius: 1,
        bgcolor: "background.paper",
        width: "100%",
        maxWidth: 480,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Styled Box
      </Typography>
    </Box>
  );
};

export default StyledBox;
