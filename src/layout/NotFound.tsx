import { Link as RouterLink } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const NotFound = () => {
  return (
    <Stack spacing={2} sx={{ alignItems: "center", py: 6 }}>
      <Typography variant="h3" component="h1">
        404 Not Found
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ textAlign: "center" }}
      >
        요청한 페이지를 찾을 수 없습니다.
      </Typography>
      <Button component={RouterLink} to="/" variant="contained">
        홈으로
      </Button>
    </Stack>
  );
};

export default NotFound;
