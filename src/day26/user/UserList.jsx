import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import useUserStore from "../../store/userStore";

const UserList = () => {
  const { users, isLoading, getUsers, deleteUser } = useUserStore();
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteUser(deleteTarget.id);
    setDeleteTarget(null);
  };

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
              <UserItem
                key={`user-${user.id}`}
                user={user}
                onDeleteClick={() => setDeleteTarget(user)}
              />
            ))}
          </List>
        </Paper>
      )}
      <Dialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
      >
        <DialogTitle>사용자 삭제</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {deleteTarget
              ? `「${deleteTarget.name}」 사용자를 삭제할까요?`
              : ""}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>취소</Button>
          <Button color="error" onClick={handleConfirmDelete} autoFocus>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
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

const UserItem = ({ user, onDeleteClick }) => {
  return (
    <ListItem
      disablePadding
      divider
      secondaryAction={
        <>
          <IconButton
            edge="end"
            aria-label="수정"
            component={RouterLink}
            to={`/day26/user/${user.id}/edit`}
          >
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label="삭제" onClick={onDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </>
      }
    >
      <ListItemButton
        component={RouterLink}
        to={`/day26/user/${user.id}`}
        sx={{ pr: 14 }}
      >
        <ListItemText primary={user.name} secondary={user.email} />
      </ListItemButton>
    </ListItem>
  );
};

export default UserList;
