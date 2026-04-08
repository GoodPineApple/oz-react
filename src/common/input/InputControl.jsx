import TextField from "@mui/material/TextField";

const InputControl = ({ value, onValueChange }) => {
  const handleChange = (e) => {
    onValueChange(e.target.value);
  };
  return (
    <TextField
      fullWidth
      size="small"
      label="입력"
      value={value}
      onChange={handleChange}
      margin="normal"
    />
  );
};

export default InputControl;
