import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageRequests = () => {
  const queryClient = useQueryClient();
  const axiosInstance = useAxios();
  const axiosSecure=useAxiosSecure()

  // Fetch donation requests
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["donationRequests"],
    queryFn: async () => {
      const res = await axiosInstance.get("/donationRequests");
      return res.data;
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/donationRequests/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Request has been removed.", "success");
      queryClient.invalidateQueries(["donationRequests"]);
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p className="text-center mt-6">Loading requests...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Donation Requests</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th>#</th>
              <th>Donation Title</th>
              <th>Charity Name</th>
              <th>Charity Email</th>
              <th>Request Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, idx) => (
              <tr key={req._id}>
                <td>{idx + 1}</td>
                <td>{req.donationTitle || "N/A"}</td>
                <td>{req.charityName}</td>
                <td>{req.charityEmail}</td>
                <td className="max-w-xs whitespace-normal">{req.requestDescription}</td>
                <td>
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRequests;
