import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchStudent, updateStudent } from "../redux/studentSlice";
import { toast } from "react-hot-toast";
import imageCompression from "browser-image-compression";

function UpdateStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedStudent, isLoading, error } = useSelector((state) => state.students);

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

  const [errors, setErrors] = useState({
    email: "",
    phoneNumber: "",
    rollNumber: "",
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
        photo: null,
      });
    }
  }, [selectedStudent]);

  useEffect(() => {
    if (error) {
      toast.error(error?.message || "Something went wrong");
    }
  }, [error]);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "photo" && files.length > 0) {
      try {
        const options = { maxSizeMB: 0.5, maxWidthOrHeight: 1000, useWebWorker: true };
        const compressedFile = await imageCompression(files[0], options);
        setFormData({ ...formData, photo: compressedFile });
      } catch (err) {
        toast.error("Failed to process image. Please try another photo.");
      }
    } else {
      setFormData({ ...formData, [name]: value });

      if (name === "email") {
        const valid = /\S+@\S+\.\S+/.test(value);
        setErrors((prev) => ({ ...prev, email: valid ? "" : "Invalid email" }));
      }

      if (name === "phoneNumber") {
        const valid = /^[0-9]{10}$/.test(value);
        setErrors((prev) => ({ ...prev, phoneNumber: valid ? "" : "Phone must be 10 digits" }));
      }

      if (name === "rollNumber") {
        const valid = value.trim() !== "";
        setErrors((prev) => ({ ...prev, rollNumber: valid ? "" : "Roll Number is required" }));
      }
    }
  };

  const validateForm = () => {
    return (
      /\S+@\S+\.\S+/.test(formData.email) &&
      /^[0-9]{10}$/.test(formData.phoneNumber) &&
      formData.rollNumber.trim() !== ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });

    try {
      const response = await dispatch(updateStudent({ id, formData: data }));
      if (response.meta.requestStatus === "fulfilled") {
        toast.success("Student updated successfully!");
        navigate(`/student/${id}`);
      } else {
        toast.error(response.payload?.message || "Failed to update student");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
     if (error) {
      toast.error(error?.message || "Something went wrong");
    }
  },[error])

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="form-container">
      <h2>Update Student</h2>
      <form className="student-form" onSubmit={handleSubmit}>
        <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required />
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        {errors.email && <span className="error">{errors.email}</span>}

        <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" required />
        {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}

        <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
        <input name="studentClass" value={formData.studentClass} onChange={handleChange} placeholder="Class" required />

        <input name="rollNumber" value={formData.rollNumber} onChange={handleChange} placeholder="Roll Number" required />
        {errors.rollNumber && <span className="error">{errors.rollNumber}</span>}

        <input name="guardian" value={formData.guardian} onChange={handleChange} placeholder="Guardian Name" required />
        <input name="year" value={formData.year} onChange={handleChange} placeholder="Year" />
        <input type="file" name="photo" onChange={handleChange} />

        <button type="submit">{isLoading ? "Updating..." : "Update Student"}</button>
      </form>
    </div>
  );
}

export default UpdateStudent;
