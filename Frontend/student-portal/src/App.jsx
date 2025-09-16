import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import StudentDetails from "./components/StudentDetails";
import StudentList from "./components/StudentList";
import UpdateStudent from "./components/UpdateStudent";
import HomePage from "./pages/HomePage";
import CreateStudent from "./components/CreateStudent";
import ProtectedRoute from "./components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCurrentUser } from "./redux/authSlice";
import NotFound from "./redux/NotFound";
import DashboardLayout from "./pages/DashBoardLayout";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast"

function App() {
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {/* <h2>App component</h2> */}
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route element={<ProtectedRoute adminOnly={true} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/students" element={<StudentList />} />
            <Route path="/create-student" element={<CreateStudent />} />
            <Route path="/student/:id" element={<StudentDetails />} />
            <Route path="/update-student/:id" element={<UpdateStudent />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;



