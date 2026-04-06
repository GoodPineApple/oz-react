import { useState } from "react";
import { useParams, useEffect } from "react-router-dom";

const UserView = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
      );
      const data = await response.json();
      console.log(data);
      setUser(data);
    };
    fetchUser();
  }, [id]);

  return (
    <div>
      <h1>User View</h1>
      <div>
        <p>User ID: {id}</p>
      </div>
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
