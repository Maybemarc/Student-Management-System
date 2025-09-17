import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import StudentDetails from "./components/StudentDetails";
import StudentList from "./components/StudentList";
import UpdateStudent from "./components/UpdateStudent";
import CreateStudent from "./components/CreateStudent";
import ProtectedRoute from "./components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "./redux/NotFound";
import DashboardLayout from "./pages/DashBoardLayout";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import StudentHomePage from "./components/StudentHomePage";
import PublicNavbar from "./components/publicNavbar";
import PublicRoute from "./components/publicRoute";
import { useEffect } from "react";
import { fetchCurrentUser } from "./redux/authSlice";

function App() {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state) => state.auth);

  useEffect(() => {
      dispatch(fetchCurrentUser());
  }, [dispatch]);


  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {user ? <Navbar /> : <PublicNavbar />}
      <Toaster />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>

        <Route element={<ProtectedRoute adminOnly={true} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/student-HomePage" element={<StudentHomePage />} />
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
