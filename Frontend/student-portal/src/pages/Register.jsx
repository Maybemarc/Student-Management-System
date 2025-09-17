import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetError } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "fullName") setErrors(prev => ({ ...prev, fullName: value ? "" : "Full Name is required" }));
    if (name === "email") setErrors(prev => ({ ...prev, email: /\S+@\S+\.\S+/.test(value) ? "" : "Invalid email address" }));
    if (name === "password") setErrors(prev => ({ ...prev, password: value.length >= 8 ? "" : "Password must be at least 8 characters" }));
    if (name === "phoneNumber") setErrors(prev => ({ ...prev, phoneNumber: /^[0-9]{10}$/.test(value) ? "" : "Phone number must be 10 digits" }));
    if (name === "address") setErrors(prev => ({ ...prev, address: value ? "" : "Address is required" }));
  };

  const validateForm = () => {
    return (
      formData.fullName &&
      formData.email &&
      /\S+@\S+\.\S+/.test(formData.email) &&
      formData.password.length >= 8 &&
      /^[0-9]{10}$/.test(formData.phoneNumber) &&
      formData.address
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      const response = await dispatch(registerUser(formData));

      if (response.meta.requestStatus === "fulfilled") {
        toast.success("Registered successfully!");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message || error || "Registration failed");
      dispatch(resetError());
    }
  }, [error,dispatch]);

  return (
    <div className="register-container">
      <div className="register-overall">
        <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          {["fullName","email","password","phoneNumber","address"].map((field) => (
            <div className="input-group" key={field}>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                value={formData[field]}
                onChange={handleChange}
                required
              />
              {errors[field] && <span className="error">{errors[field]}</span>}
            </div>
          ))}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="login-link">
          Already have an account? <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Register;
