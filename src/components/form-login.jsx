import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql/mutations";
import { useDispatch } from "react-redux";
import { setUser } from "../store/auth";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async () => {
    try {
      const { data } = await login({ variables: { email, password } });
      dispatch(setUser(data.login));
      window.location.reload();
    } catch (err) {
      if (err.graphQLErrors) {
        Swal.fire("Failed!", err.graphQLErrors[0].message, "error").then(() => {
          setEmail("");
          setPassword("");
        });
        console.error("GraphQL Errors:", err.graphQLErrors[0].message);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center ">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>} */}

          <a className="mb-4 text-blue-500 cursor-pointer" href="/register">
            Belum punya akun?
          </a>

          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full py-2 mt-4 text-white font-semibold rounded-lg transition-all 
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
          `}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
