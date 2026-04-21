import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import UserView from "./user/UserView";

const Day26Page = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1">
        Day 26
      </Typography>
      <UserView />
    </Stack>
  );
};

export default Day26Page;
