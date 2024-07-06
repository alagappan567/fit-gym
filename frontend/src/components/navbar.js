import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import fitlogoIcon from "../assets/fitlogo.png"
import { RiLogoutBoxRFill } from "react-icons/ri";
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
            <span className="username">{user.username}</span>
            <Link to="/">
              <button className="home-btn">Home</button>
            </Link>
            <Link to="/history">
              <button className="history-btn">History</button>
            </Link>
            <RiLogoutBoxRFill onClick={handleClick} className="logout"/>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
