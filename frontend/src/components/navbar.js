import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import fitlogoIcon from "../assets/fitlogo.png"
import "./navbar.css"

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };
  return (
    <div className="navbar">
        <img src={fitlogoIcon} alt="logo" className="logo"></img>
        <nav className="nav-btns">
          {user && (
            <div className="nav-btns">
              <Link to="/">
                <button className="home-btn">Home</button>
              </Link>
              <Link to="/history">
                <button className="history-btn">History</button>
              </Link>
              <button className="logout-btn" onClick={handleClick}> Log out</button>
              <span className="email">{user.email}</span>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login"><button className="nav-login-btn">Login</button></Link>
              <Link to="/signup"><button className="nav-signin-btn"> Signup </button></Link>
            </div>
          )}
        </nav>
    </div>
  );
};

export default Navbar;
