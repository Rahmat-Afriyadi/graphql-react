import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../graphql/query";
import TableProduct from "../../components/table-product";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <p className="text-2xl font-bold">List of Products</p>
      <br />
      <div className="w-1/4">
        <button
          onClick={() => navigate("/product/create")}
          disabled={loading}
          className={`w-full py-2 text-white font-semibold rounded-lg transition-all bg-blue-600 hover:bg-blue-700`}
        >
          Create
        </button>
      </div>
      <br></br>
      <TableProduct data={data.getAllProducts} refetch={refetch} />
    </div>
  );
};

export default Products;
