import { Link } from "react-router-dom";

const Header = () => {
  // const navStyle = { display: "flex", gap: "10px", justifyContent: "center" };
  return (
    <header className="bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold">My App</h1>
      <nav className="flex gap-4 justify-center">
        <Link to="/">
          <h2>Home</h2>
        </Link>
        <Link to="/day25">Day 25</Link>
        <Link to="/day26">Day 26</Link>
        <Link to="/day26/user">User</Link>
        <Link to="/day26/post">Post</Link>
      </nav>
    </header>
  );
};

export default Header;
