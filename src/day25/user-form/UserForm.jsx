import { useState } from "react";

const UserForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [user, setUser] = useState({ name: "", age: 0 });

  return (
    <div>
      <input
        type="text"
        placeholder="User.Name"
        value={user.name}
        onChange={(e) =>
          setUser({
            ...user,
            name: e.target.value,
          })
        }
      />
      <input
        type="number"
        placeholder="User.Age"
        value={user.age}
        onChange={(e) =>
          setUser({
            ...user,
            age: e.target.value,
          })
        }
      />
      <p>
        Name: {user.name} / Age: {user.age}
      </p>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <p>
        Name: {name} / Age: {age}
      </p>
    </div>
  );
};

export default UserForm;
