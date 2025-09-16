import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword as resetPasswordThunk } from "../redux/authSlice";
import { useParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams(); 
  const { isLoading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "newPassword" && e.target.value.length < 8) {
      setErrors((prev) => ({ ...prev, newPassword: "Password must be at least 8 characters" }));
    } else {
      setErrors((prev) => ({ ...prev, newPassword: "" }));
    }

    if (e.target.name === "confirmPassword" && e.target.value !== formData.newPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.newPassword || !formData.confirmPassword) return;

    if (formData.newPassword.length < 8) return;

    if (formData.newPassword !== formData.confirmPassword) return;

    try {
      await dispatch(resetPasswordThunk({ token, newPassword: formData.newPassword }));
      alert("Password reset successfully!");
      navigate("/login");
    } catch (error) {
      alert(error?.message || "Failed to reset password");
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-overall">
        <h2>Reset Password</h2>
        <p className="reset-context">
          Enter your new password and confirm it below.
        </p>
        <form className="reset-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              required
            />
            {errors.newPassword && <span className="error">{errors.newPassword}</span>}
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              required
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
