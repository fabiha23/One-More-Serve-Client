import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../Components/Loading";
import { Navigate } from "react-router";

const PaymentHistory = () => {
  const { user, role } = useAuth();
  const axiosInstance = useAxios();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payment-history", user?.email],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/payments?email=${user.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  if (role === "admin" || role === "restaurant") {
    return <Navigate to="/forbidden" replace />;
  }

  if (isLoading) return <Loading />;

  return (
    <div>
      <h2 className="text-base-100 font-semibold text-2xl mb-3 bg-secondary p-4 rounded-lg px-6">
        Transaction History
      </h2>
      {payments.length === 0 ? (
        <p className="text-center text-gray-500">No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Amount Paid</th>
                <th>Payment Method</th>
                <th>Request Date</th>
                <th>Linked Role Request</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id}>
                  <td className="font-mono">{payment.transactionId}</td>
                  <td>${payment.amount}</td>
                  <td>{payment.paymentMethod}</td>
                  <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                  <td>
                    {payment.roleRequestId ? (
                      <span className="badge badge-success">Linked</span>
                    ) : (
                      <span className="badge badge-ghost">None</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
