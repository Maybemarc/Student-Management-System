import { Link } from "react-router-dom";
import StudentChart from "../components/StudentChart"

function HomePage() {
  return (
    <div>
      <h2>HomePage</h2>
      <Link to="/register">Register</Link>
      <p>Students</p>
      <Link to="/create-student">create</Link>

      <Link to="/students">
        <p> Get the students</p>
      </Link>
    </div>
  );
}

export default HomePage;
