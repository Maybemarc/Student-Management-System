import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, fetchCurrentUser } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) return;

    try {
      const response = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(response)) {
        dispatch(fetchCurrentUser());
        alert("Login Success");
        navigate("/students");
      }
    } catch (error) {
      console.log(`Error in logging in:`, error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-overall">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
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
