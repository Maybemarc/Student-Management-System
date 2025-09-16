import { Link, useNavigate } from "react-router-dom";

function StudentResults({students,onDelete}) {
  const navigate =useNavigate()

  if (!Array.isArray(students) || students.length === 0) return <div>No results found.</div>;

  return (
     <div className="results-container">
      {students.map((student) => (
        <div key={student._id} className="student-card" onClick={() => navigate(`/student/${student._id}`) } >
          <div className="student-info">
            {student.photo && (
              <img
                src={student.photo}
                alt={student.fullName}
                className="student-photo"
              />
            )}
            <div>
              <h3>{student.fullName}</h3>
              <p>Email: {student.email}</p>
              <p>Class: {student.studentClass}</p>
              <p>Roll Number: {student.rollNumber}</p>
            </div>
          </div>
          <div className="student-actions">
            <Link to={`/update-student/${student._id}`}>
              <button className="update-btn">Update</button>
            </Link>
            <button className="delete-btn" onClick={() => onDelete(student._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StudentResults