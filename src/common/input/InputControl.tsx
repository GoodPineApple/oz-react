import TextField from "@mui/material/TextField";
import type { ChangeEvent } from "react";

interface InputControlProps {
  value: string;
  onValueChange: (value: string) => void;
}

const InputControl = ({ value, onValueChange }: InputControlProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
