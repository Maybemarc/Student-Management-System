import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function DashboardLayout() {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h3>Dashboard</h3>
        <nav>
          <ul className="student-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/students">Student List</Link></li>
            <li><Link to="/create-student">Create Student</Link></li>
            {/* <li><Link to="/update-student/:id">Update Details</Link></li> */}
          </ul>
        </nav>
        <button className="logout-btn">Logout</button>
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
