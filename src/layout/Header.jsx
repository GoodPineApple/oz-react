import { Link } from "react-router-dom";
const Header = () => {
  const navStyle = { display: "flex", gap: "10px", justifyContent: "center" };
  return (
    <>
      <h1>My App</h1>
      <nav style={navStyle}>
        <Link to="/">
          <h2>Home</h2>
        </Link>
        <Link to="/day25">Day 25</Link>
        <Link to="/day26">Day 26</Link>
        <Link to="/day26/user">User</Link>
        <Link to="/day26/post">Post</Link>
      </nav>
    </>
  );
};

export default Header;
