import { useEffect, useState } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import { useMutation } from "@apollo/client";
import { DELETE_USER_MUTATION } from "../graphql/mutations";

const TableUser = ({ data, refetch }) => {
  const [deleteUser, { loading }] = useMutation(DELETE_USER_MUTATION);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Sorting function
  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.key) {
      return sortConfig.direction === "asc"
        ? a[sortConfig.key] > b[sortConfig.key]
          ? 1
          : -1
        : a[sortConfig.key] < b[sortConfig.key]
        ? 1
        : -1;
    }
    return 0;
  });

  // Handle sorting when clicking the header
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 shadow-md rounded-lg overflow-hidden divide-y divide-gray-300">
        <thead className="bg-cyan-400 text-white">
          <tr>
            <th className="px-6 py-3 text-left cursor-pointer" onClick={() => handleSort("id")}>
              ID{" "}
              {sortConfig.key === "id" &&
                (sortConfig.direction === "asc" ? (
                  <ArrowUpIcon className="w-4 inline" />
                ) : (
                  <ArrowDownIcon className="w-4 inline" />
                ))}
            </th>
            <th className="px-6 py-3 text-left cursor-pointer" onClick={() => handleSort("name")}>
              Name{" "}
              {sortConfig.key === "name" &&
                (sortConfig.direction === "asc" ? (
                  <ArrowUpIcon className="w-4 inline" />
                ) : (
                  <ArrowDownIcon className="w-4 inline" />
                ))}
            </th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedData.map((item, index) => (
            <tr key={item.id} className="hover:bg-gray-100 transition">
              <td className="px-6 py-3">{index + 1}</td>
              <td className="px-6 py-3">{item.name}</td>
              <td className="px-6 py-3">{item.email}</td>
              <td className="px-6 py-3">
                <a
                  className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                  href={"/users/" + item.id}
                >
                  Edit
                </a>
                <button
                  className="ml-2 px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                  onClick={() => {
                    try {
                      Swal.fire({
                        title: "Confirm Delete",
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonColor: "#0891B2",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes",
                        showLoaderOnConfirm: true,
                        preConfirm: async () => {
                          await deleteUser({ variables: { id: item.id } });
                          refetch();
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
                  }}
                >
                  {loading ? "Loading..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableUser;
