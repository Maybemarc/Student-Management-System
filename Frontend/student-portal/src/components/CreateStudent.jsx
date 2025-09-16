import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStudent } from "../redux/studentSlice";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";

function CreateStudent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.students);

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

   const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "photo" && files.length > 0) {
      try {
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1000,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(files[0], options);
        setFormData({ ...formData, photo: compressedFile });
      } catch (error) {
        alert.error(`Failed to process image. Please try another photo.`,error);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentData = new FormData()

    for (const key in formData) {
      studentData.append(key, formData[key]);
    }

    console.log(studentData);

    try {
      const response =  await dispatch(createStudent( studentData ));
      if (response.meta.requestStatus === "fulfilled") {
      alert("created")
      navigate("/students");
    }
    } catch (error) {
      console.log(`Error in Creating User: `, error.message);
    }
  };

  return (
   <div className="form-container">
      <h2>Create Student</h2>
      <form className="student-form" onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input type="text" name="studentClass" placeholder="Class" value={formData.studentClass} onChange={handleChange} required />
        <input type="text" name="rollNumber" placeholder="Roll Number" value={formData.rollNumber} onChange={handleChange} required />
        <input type="text" name="guardian" placeholder="Guardian Name" value={formData.guardian} onChange={handleChange} required />
        <input type="text" name="year" placeholder="Year" value={formData.year} onChange={handleChange} />
        <input type="file" name="photo" onChange={handleChange} accept="image/*" required />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Student"}
        </button>
      </form>
    </div>
  );
}

export default CreateStudent;
