import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchStudent, updateStudent } from "../redux/studentSlice";
import imageCompression from "browser-image-compression";

function UpdateStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedStudent, isLoading } = useSelector((state) => state.students);

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    email: "",
    phoneNumber: "",
    address: "",
    studentClass: "",
    rollNumber: "",
    guardian: "",
    year: "",
    photo: null,
  });

  useEffect(() => {
    dispatch(fetchStudent(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedStudent) {
      setFormData({
        fullName: selectedStudent.fullName || "",
        dob: selectedStudent.dob || "",
        gender: selectedStudent.gender || "",
        email: selectedStudent.email || "",
        phoneNumber: selectedStudent.phoneNumber || "",
        address: selectedStudent.address || "",
        studentClass: selectedStudent.studentClass || "",
        rollNumber: selectedStudent.rollNumber || "",
        guardian: selectedStudent.guardian || "",
        year: selectedStudent.year || "",
      });
    }
  }, [selectedStudent]);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      try {
        const options = { maxSizeMB: 0.5, maxWidthOrHeight: 1000, useWebWorker: true };
        const compressedFile = await imageCompression(files[0], options);
        setFormData({ ...formData, [name]: compressedFile });
      } catch (error) {
        alert("Error processing image",error);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });
    dispatch(updateStudent({ id, formData: data })).then(() => navigate(`/student/${id}`));
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="update-container">
      <h2>Update Student</h2>
      <form className="student-form" onSubmit={handleSubmit}>
        <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" />
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
        <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
        <input name="studentClass" value={formData.studentClass} onChange={handleChange} placeholder="Class" />
        <input name="rollNumber" value={formData.rollNumber} onChange={handleChange} placeholder="Roll Number" />
        <input name="guardian" value={formData.guardian} onChange={handleChange} placeholder="Guardian Name" />
        <input name="year" value={formData.year} onChange={handleChange} placeholder="Year" />
        <input type="file" name="photo" onChange={handleChange} />
        <button type="submit">{isLoading ? "Updating..." : "Update Student"}</button>
      </form>
    </div>
  );
}

export default UpdateStudent;
