import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          ExpenseTracker
        </Link>

        {localStorage.getItem("token") ? (
          <ul className="nav-menu">
            <li
              className="nav-item"
              onClick={() => {
                location.reload();
                localStorage.clear();
              }}
            >
              <Link className="nav-links">Logout</Link>
            </li>
          </ul>
        ) : (
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/login" className="nav-links">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-links">
                Signup
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
