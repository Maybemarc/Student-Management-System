import { Link } from "react-router-dom";

function PublicNavbar() {
  return (
    <nav className="public-navbar">
      <div className="navbar-left-side">Student Portal</div>
      <div className="navbar-right-side">
        <Link to="/register">
        Register
        </Link>
        <Link to="/login">
        login
        </Link>
      </div>
    </nav>
  );
}

export default PublicNavbar;
