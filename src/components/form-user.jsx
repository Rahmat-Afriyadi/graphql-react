import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_MUTATION, CREATE_USER_MUTATION } from "../graphql/mutations";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const FormUser = ({ defaultValues }) => {
  const navigate = useNavigate();
  const [name, setName] = useState(defaultValues.name);
  const [email, setEmail] = useState(defaultValues.email);
  const [password, setPassword] = useState("");
  const [updateUser, { loading }] = useMutation(UPDATE_USER_MUTATION);
  const [register, { loading1 }] = useMutation(CREATE_USER_MUTATION);

  const handle = () => {
    Swal.fire({
      title: "Apakah data yang dimasukan sudah benar",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0891B2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          if (defaultValues.id) {
            await updateUser({ variables: { id: defaultValues.id, name, email } });
          } else {
            await register({ variables: { name, email, password } });
          }
          navigate("/users");
        } catch (err) {
          console.error("Mutation error:", err);
          if (err.graphQLErrors) {
            Swal.fire("Failed!", err.graphQLErrors[0].message, "error").then(() => {
              setName("");
              setEmail("");
              setPassword("");
            });
            console.error("GraphQL Errors:", err.graphQLErrors[0].message);
          }
          if (err.networkError) {
            console.error("Network Error:", err.networkError);
          }
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  return (
    <div>
      <div className="flex items-center justify-center ">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            {defaultValues.id ? "Detail User" : "Create User"}
          </h2>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-1">Nama</label>
            <input
              type="text"
              placeholder="Nama User"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

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

          {!defaultValues.id && (
            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          )}

          {/* {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>} */}

          <button
            onClick={handle}
            disabled={loading}
            className={`w-full py-2 text-white font-semibold rounded-lg transition-all 
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
          `}
          >
            {loading || loading1 ? "Loading..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormUser;
