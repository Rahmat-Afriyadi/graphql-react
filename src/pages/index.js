import isAuthenticated from "../auth";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  return isAuthenticated() ? (
    <div className="flex flex-col justify-center flex-1 min-h-full py-12 sm:px-6 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="px-6 py-12 bg-slate-50  sm:rounded-lg sm:px-12">
          Selamat datang {localStorage.getItem("name")}
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}
