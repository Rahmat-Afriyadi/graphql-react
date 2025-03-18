import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../graphql/mutations";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logout, selectAuth } from "../store/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async () => {
    try {
      const { data } = await login({ variables: { email, password } });
      console.log("ini data yaa  ", data.login);
      dispatch(setUser(data.login));
    } catch (err) {
      console.log("ini error ", err);
      console.error("Login failed", err);
    }
  };

  return (
    <div>
      {auth.token ? (
        <div>
          <p>Logged in as {auth.user.email}</p>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
      ) : (
        <div className="flex items-center justify-center ">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              <input
                type="text"
                placeholder="Enter your email"
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

            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

            <button
              onClick={handleLogin}
              disabled={loading}
              className={`w-full py-2 text-white font-semibold rounded-lg transition-all 
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
          `}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
