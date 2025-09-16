import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../redux/authSlice";

function ForgotPassword() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      await dispatch(forgotPassword(email));
      alert("Reset email sent!");
      setEmail("");
    } catch (error) {
      console.log("Error in forgot-password:", error.message);
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-overall">
        <h2>Forgot Password</h2>
        <p className="forgot-context">
          Enter your registered email address and get a password reset link.
        </p>
        <form className="forgot-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Reset Email"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
