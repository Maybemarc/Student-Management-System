import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../redux/studentSlice"; 
import StudentSearch from "./StudentSearch";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  
  const handleSearch = async (query) => {
    try {
      await dispatch(fetchStudents({ search: query })); 
      navigate("/students"); 
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return (
    <nav className="navbar-active">
      <div className="navbar-left">
          <h2>Student Portal</h2>
      </div>

      {user && (
        <div className="navbar-search">
          <StudentSearch onSearch={handleSearch} />
        </div>
      )}

      <div className="navbar-links">
        {!user ? (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <>
            <Link to="/student-HomePage">Admin Panel</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
