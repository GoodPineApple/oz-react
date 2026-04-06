import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UserView = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

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

  const handleNavigateToPost = () => {
    navigate(`/day26/post?userId=${id}`);
  };

  return (
    <div>
      <h1>User View</h1>
      <button onClick={() => navigate(-1)}>Back</button>
      <button onClick={handleNavigateToPost}>게시글 보러 이동하기</button>
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
