import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const userIdParam = searchParams.get("userId");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
        );
        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
    if (userIdParam) {
      setUserId(Number(userIdParam));
    }
  }, [userIdParam]);

  const filteredPosts = posts.filter((post) => post.userId === userId);
  console.log(filteredPosts);

  return (
    <div>
      <h1>Post List</h1>
      <div>
        <input
          type="text"
          placeholder="UserID"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
        />
        <p>User ID: {userId}</p>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <PostItem key={`post-${post.id}`} post={post} />
        ))
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
};

const PostItem = ({ post }) => {
  return (
    <div key={post.id}>
      <h2>
        {post.id}. {post.title}
      </h2>
      <p>{post.body}</p>
      <p>User ID: {post.userId}</p>
    </div>
  );
};

export default PostList;
