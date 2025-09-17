import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { user, isLoading } = useSelector((state) => state.auth);

  if (isLoading) return <p>Checking Authentication...</p>;

  if (user) return <Navigate to="/students" replace />;

  return <Outlet />;
};

export default PublicRoute;
