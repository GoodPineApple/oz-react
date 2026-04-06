import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
        console.log(data);
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
    <div>
      <h1>User List</h1>
      {isLoading && <p>Loading...</p>}
      {!isLoading && users.length === 0 && <p>No users found</p>}
      {!isLoading &&
        users.length > 0 &&
        users.map((user) => <UserItem key={`user-${user.id}`} user={user} />)}
    </div>
  );
};

const UserItem = ({ user }) => {
  return (
    <div key={user.id}>
      <Link to={`/day26/user/${user.id}`}>
        <h2>{user.name}</h2>
      </Link>
      <p>{user.email}</p>
    </div>
  );
};

export default UserList;
