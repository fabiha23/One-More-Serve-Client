import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";
import { FaTrashAlt, FaHandHoldingHeart, FaEnvelope, FaListAlt } from "react-icons/fa";

const ManageRequests = () => {
  const queryClient = useQueryClient();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();

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
      Swal.fire({
        title: "Deleted!",
        text: "Request has been removed.",
        icon: "success",
        background: "#FEFAE0",
        confirmButtonColor: "#CCD5AE"
      });
      queryClient.invalidateQueries(["donationRequests"]);
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#CCD5AE",
      confirmButtonText: "Yes, delete it!",
      background: "#FEFAE0"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <section>
      <div className="mb-6">
        <div className="bg-primary/80 rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-base-100">Manage Donation Requests</h1>
        </div>
      </div>

      <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden border border-neutral">
        {requests.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-4">
              <FaHandHoldingHeart className="text-accent text-3xl" />
            </div>
            <h3 className="text-xl font-medium text-accent mb-2">No donation requests found</h3>
            <p className="text-accent/70">When charities request donations, they'll appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    Donation Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    <div className="flex items-center">
                      <FaHandHoldingHeart className="mr-2" /> Charity
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    <div className="flex items-center">
                      <FaEnvelope className="mr-2" /> Email
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    <div className="flex items-center">
                      <FaListAlt className="mr-2" /> Description
                    </div>
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-accent uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral">
                {requests.map((req, idx) => (
                  <tr key={req._id} className="hover:bg-secondary/10">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">{idx + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-accent font-medium">
                      {req.donationTitle || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
                      {req.charityName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
                      {req.charityEmail}
                    </td>
                    <td className="px-6 py-4 text-sm text-accent max-w-xs">
                      <div className="line-clamp-2">{req.requestDescription}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <button
                        onClick={() => handleDelete(req._id)}
                        className="px-3 py-1 rounded-lg text-sm cursor-pointer font-medium bg-error/10 text-error hover:bg-error/20 transition-colors flex items-center border border-error/20"
                        disabled={deleteMutation.isLoading}
                      >
                        <FaTrashAlt className="mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default ManageRequests;