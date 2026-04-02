const InputControl = ({ value, onValueChange }) => {
  const handleChange = (e) => {
    onValueChange(e.target.value);
  };
  return (
    <div>
      <input type="text" value={value} onChange={handleChange} />
    </div>
  );
};

export default InputControl;
