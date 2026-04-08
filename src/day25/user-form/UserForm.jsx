import { useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const UserForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [user, setUser] = useState({ name: "", age: 0 });

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <TextField
          label="User.Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          fullWidth
          size="small"
        />
        <TextField
          label="User.Age"
          type="number"
          value={user.age}
          onChange={(e) => setUser({ ...user, age: e.target.value })}
          fullWidth
          size="small"
        />
        <Typography variant="body2" color="text.secondary">
          Name: {user.name} / Age: {user.age}
        </Typography>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          size="small"
        />
        <TextField
          label="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          fullWidth
          size="small"
        />
        <Typography variant="body2" color="text.secondary">
          Name: {name} / Age: {age}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default UserForm;
