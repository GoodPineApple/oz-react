import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const MyPage = () => {
  return (
    <Paper variant="outlined" sx={{ p: 3, maxWidth: 560 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Page
      </Typography>
      <Typography variant="body2" color="text.secondary">
        로그인 후 이용할 수 있는 페이지입니다.
      </Typography>
    </Paper>
  );
};

export default MyPage;
