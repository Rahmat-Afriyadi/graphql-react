import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../graphql/query";
import TableProduct from "../../components/table-product";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Products = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS, {
    variables: { search },
  });
  if (error) return <p>Error: {error.message}</p>;

  console.log("ini data yaa ", data);
  return (
    <div>
      <p className="text-2xl font-bold">List of Products</p>

      <br />
      <div className="flex gap-x-5">
        <div className="w-1/4">
          <button
            onClick={() => navigate("/products/create")}
            disabled={loading}
            className={`w-full py-2 text-white font-semibold rounded-lg transition-all bg-blue-600 hover:bg-blue-700`}
          >
            Create
          </button>
        </div>
        <div className="w-1/4">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <br></br>
      {!loading ? <TableProduct data={data.getAllProducts} refetch={refetch} /> : <p>Loading...</p>}
    </div>
  );
};

export default Products;
