import { Navigate, Outlet } from "react-router-dom";
import isAuthenticated from "./auth"; // Import your auth function

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
