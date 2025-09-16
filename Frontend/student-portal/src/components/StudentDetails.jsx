import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudent } from "../redux/studentSlice";

function StudentDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedStudent, isLoading, error } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchStudent(id));
  }, [dispatch, id]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!selectedStudent) return <p>No student found</p>;

  return (
   <div className="student-details-container">
      <div className="student-card">
        <div className="student-photo-section">
          <img
            src={selectedStudent.photo}
            alt={selectedStudent.fullName}
            className="student-photo"
          />
        </div>
        <div className="student-info-section">
          <h2 className="student-name">{selectedStudent.fullName}</h2>
          <p><strong>Roll Number:</strong> {selectedStudent.rollNumber}</p>
          <p><strong>Class:</strong> {selectedStudent.studentClass}</p>
          <p><strong>Email:</strong> {selectedStudent.email}</p>
          <p><strong>Phone:</strong> {selectedStudent.phoneNumber}</p>
          <p><strong>Address:</strong> {selectedStudent.address}</p>
          <p><strong>Guardian:</strong> {selectedStudent.guardian}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
