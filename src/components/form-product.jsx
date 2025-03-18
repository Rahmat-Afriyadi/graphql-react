import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_PRODUCT_MUTATION, CREATE_PRODUCT_MUTATION } from "../graphql/mutations";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const FormProduct = ({ defaultValues }) => {
  const navigate = useNavigate();
  const [name, setName] = useState(defaultValues.name);
  const [price, setPrice] = useState(defaultValues.price);
  const [stock, setStock] = useState(defaultValues.stock);
  const [updateProduct, { loading }] = useMutation(UPDATE_PRODUCT_MUTATION);
  const [createProduct, { loading1 }] = useMutation(CREATE_PRODUCT_MUTATION);

  const handle = () => {
    try {
      Swal.fire({
        title: "Apakah data yang dimasukan sudah benar",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#0891B2",
        cancelButtonColor: "#d33",
        confirmButtonText: "Save",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          if (defaultValues.id) {
            await updateProduct({ variables: { id: defaultValues.id, name, price, stock } });
          } else {
            await createProduct({ variables: { name, price, stock } });
          }
          navigate("/product");
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });
    } catch (err) {
      console.error("Mutation error:", err);
      if (err.graphQLErrors) {
        console.error("GraphQL Errors:", err.graphQLErrors);
      }
      if (err.networkError) {
        console.error("Network Error:", err.networkError);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center ">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            {defaultValues.id ? "Detail Product" : "Create Product"}
          </h2>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-1">Nama</label>
            <input
              type="text"
              placeholder="Nama Product"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-1">Price</label>
            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

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

export default FormProduct;
