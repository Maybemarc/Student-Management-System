import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import StudentSearch from "./StudentSearch";

function Navbar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className={user ? `navbar-active` : `navbar`}>
      <div className="navbar-left">
        {/* <StudentSearch /> */}
      </div>
      <div className="navbar-right">
        {!user ? (
          <>
            <Link to="/register" className="nav-link">
              Register
            </Link>
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </>
        ) : (
          <div className="" >
            <Link to="/students" className="nav-link">
              Admin Panel
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
