import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../graphql/query";
import TableUser from "../../components/table-user";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <p className="text-2xl font-bold">List of Users</p>
      <br />
      <div className="w-1/4">
        <button
          onClick={() => navigate("/users/create")}
          disabled={loading}
          className={`w-full py-2 text-white font-semibold rounded-lg transition-all bg-blue-600 hover:bg-blue-700`}
        >
          Create
        </button>
      </div>
      <br></br>
      <TableUser data={data.getAllUsers} refetch={refetch} />
    </div>
  );
};

export default Users;
