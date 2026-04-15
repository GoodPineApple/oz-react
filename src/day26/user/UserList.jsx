import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import useUserStore from "../../store/userStore";

const UserList = () => {
  const { users, isLoading, getUsers } = useUserStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1">
        User List
      </Typography>
      <Button variant="contained" component={RouterLink} to={`/day26/user-add`}>
        사용자 생성
      </Button>
      {isLoading && (
        <BoxCentered>
          <CircularProgress />
        </BoxCentered>
      )}
      {!isLoading && users.length === 0 && (
        <Typography color="text.secondary">No users found</Typography>
      )}
      {!isLoading && users.length > 0 && (
        <Paper variant="outlined">
          <List disablePadding>
            {users.map((user) => (
              <UserItem key={`user-${user.id}`} user={user} />
            ))}
          </List>
        </Paper>
      )}
    </Stack>
  );
};

function BoxCentered({ children }) {
  return (
    <Stack alignItems="center" sx={{ py: 4 }}>
      {children}
    </Stack>
  );
}

const UserItem = ({ user }) => {
  return (
    <ListItem disablePadding divider>
      <ListItemButton component={RouterLink} to={`/day26/user/${user.id}`}>
        <ListItemText primary={user.name} secondary={user.email} />
      </ListItemButton>
    </ListItem>
  );
};

export default UserList;
