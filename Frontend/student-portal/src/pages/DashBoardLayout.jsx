import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import {logoutUser} from "../redux/authSlice"

function DashboardLayout() {
  const dispatch = useDispatch()

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h3>Dashboard</h3>
        <nav>
          <ul className="student-links">
            <li><Link to="/student-HomePage">Home</Link></li>
            <li><Link to="/students">Student List</Link></li>
            <li><Link to="/create-student">Create Student</Link></li>
          </ul>
        </nav>
        <button className="logout-btn"
        onClick={() => dispatch(logoutUser())}
        >Logout</button>
      </aside>

      <div className="main">
        <Navbar />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
