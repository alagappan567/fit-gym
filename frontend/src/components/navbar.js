import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <button className="home-btn">Home</button>
        </Link>
        <nav>
          {user && (
            <div>
              <Link to="/history">
                <button className="history-btn">History</button>
              </Link>
              <button className="logout-btn" onClick={handleClick}>Log out</button>
              <span>{user.email}</span>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
