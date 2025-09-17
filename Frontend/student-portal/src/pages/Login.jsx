import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, fetchCurrentUser, resetError } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading,error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      const emailValid = /\S+@\S+\.\S+/.test(value);
      setErrors((prev) => ({ ...prev, email: emailValid ? "" : "Invalid email address" }));
    }

    if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: value.length >= 8 ? "" : "Password must be at least 8 characters",
      }));
    }
  };

  const validateForm = () => {
    return formData.email && formData.password.length >= 8 && /\S+@\S+\.\S+/.test(formData.email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      const response = await dispatch(loginUser(formData));
      if (response.meta.requestStatus === "fulfilled") {
        await dispatch(fetchCurrentUser());
        toast.success("Login successful!");
        navigate("/students");
      
      }
    } catch (error) {
      toast.error(error.message)
    }

  };

  useEffect(() => {
  if (error && error !== "Unauthorized") {
    toast.error(error.message || error);
    dispatch(resetError());
  }
}, [error, dispatch]);
  return (
    <div className="login-container">
      <div className="login-overall">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="link-text">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        <p className="link-text">
          <Link to="/forgot-password">Forgot your password?</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
