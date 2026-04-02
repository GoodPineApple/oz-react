import { useState, useEffect } from "react";

const DataFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // boolean : true, false
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts/1",
        );
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>{data.title}</h1>
          <p>{data.body}</p>
        </div>
      )}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default DataFetch;
