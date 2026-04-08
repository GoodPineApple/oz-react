import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1">
        User List
      </Typography>
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
