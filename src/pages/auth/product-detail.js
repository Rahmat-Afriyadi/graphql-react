import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_ID } from "../../graphql/query";
import { useParams } from "react-router-dom";
import FormProduct from "../../components/form-product";

const DetailProduct = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id: id },
  });
  if (id === undefined) {
    return <FormProduct defaultValues={{}} />;
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <FormProduct defaultValues={data.getProduct} />;
};
export default DetailProduct;
