import { useState } from "react";

const UserView = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(0);

  const handleGetUser = () => {
    console.log("Get User");
    const fetchUser = async () => {
      console.log(userId);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
      );
      const data = await response.json();
      console.log(data);
      setUser(data);
    };
    fetchUser();
  };

  return (
    <div>
      <h1>User View</h1>
      <div>
        <p>User ID: {userId}</p>
      </div>
      <input
        type="number"
        placeholder="UserID"
        onChange={(e) => setUserId(Number(e.target.value))}
      />
      <button onClick={handleGetUser}>Get User</button>
      <div>
        <h2>User Name</h2>
        <p>{user?.name}</p>
        <h2>User Email</h2>
        <p>{user?.email}</p>
      </div>
    </div>
  );
};

export default UserView;
