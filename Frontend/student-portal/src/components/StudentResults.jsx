import { useNavigate } from "react-router-dom";

function StudentResults({students}) {
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
            <div className="student-content" >
              <h3>{student.fullName}</h3>
              <p> <strong> Email: </strong>{student.email}</p>
              <p> <strong> Class: </strong>{student.studentClass}</p>
              <p> <strong> Roll Number: </strong>{student.rollNumber}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StudentResults