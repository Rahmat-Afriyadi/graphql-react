import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../../graphql/query";
import { useParams } from "react-router-dom";
import FormUser from "../../components/form-user";

const DetailUser = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { id: id },
  });
  if (id === undefined) {
    return <FormUser defaultValues={{}} />;
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <FormUser defaultValues={data.getUser} />;
};
export default DetailUser;
