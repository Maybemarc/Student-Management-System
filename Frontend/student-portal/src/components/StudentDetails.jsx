import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudent, deleteStudent } from "../redux/studentSlice";
import toast from "react-hot-toast";

function StudentDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedStudent, isLoading, error } = useSelector(
    (state) => state.students
  );

  useEffect(() => {
    dispatch(fetchStudent(id));
  }, [dispatch, id]);

  const handleDelete = async () => {
    const response = await dispatch(deleteStudent(selectedStudent._id));
    if (response.meta.requestStatus === "fulfilled") {
      toast.success("Student Deleted");
      navigate("/students");
    } else {
      toast.error(error || "Failed to delete student");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!selectedStudent) return <p>No student found</p>;

  return (
    <div className="student-section">
      <div className="student-overall">
        <div className="student-cover-section">
          <img
            src={selectedStudent.photo}
            alt={selectedStudent.fullName}
            className="student-photo"
          />
        </div>
        <div className="student-details-section ">
          <h2 className="student-name">{selectedStudent.fullName}</h2>
          <p><strong>Roll Number:</strong> {selectedStudent.rollNumber}</p>
          <p><strong>Class:</strong> {selectedStudent.studentClass}</p>
          <p><strong>Email:</strong> {selectedStudent.email}</p>
          <p><strong>Phone:</strong> {selectedStudent.phoneNumber}</p>
          <p><strong>Address:</strong> {selectedStudent.address}</p>
          <p><strong>Guardian:</strong> {selectedStudent.guardian}</p>
        </div>
      </div>

      <div className="student-actions-bottom">
        <Link to={`/update-student/${selectedStudent._id}`}>
          <button className="update-btn">Update</button>
        </Link>
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default StudentDetails;
