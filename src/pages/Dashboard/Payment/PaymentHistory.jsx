import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../Components/Loading";
import { Navigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaHistory, FaMoneyBillWave, FaCreditCard, FaCalendarAlt, FaHandsHelping } from "react-icons/fa";

const PaymentHistory = () => {
  const { user, role } = useAuth();
  const axiosSecure = useAxiosSecure();
  
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payment-history", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payments?email=${user.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  if (role === "admin" || role === "restaurant") {
    return <Navigate to="/forbidden" replace />;
  }

  if (isLoading) return <Loading />;

  return (
    <section>
      <div className="mb-6">
        <div className="bg-primary/80 rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-base-100">My Requests</h1>
        </div>
      </div>

      {payments.length === 0 ? (
        <div className="bg-base-100 rounded-xl shadow-sm p-8 text-center border border-neutral">
          <div className="mx-auto w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-4">
            <FaMoneyBillWave className="text-accent text-3xl" />
          </div>
          <h3 className="text-xl font-medium text-accent mb-2">No transactions found</h3>
          <p className="text-accent/70 max-w-md mx-auto">
            When you make payments for charity services, they'll appear here.
          </p>
        </div>
      ) : (
        <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden border border-neutral">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    <div className="flex items-center">
                      <FaCreditCard className="mr-2" /> Transaction
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    <div className="flex items-center">
                      <FaMoneyBillWave className="mr-2" /> Amount
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2" /> Date
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    <div className="flex items-center">
                      <FaHandsHelping className="mr-2" /> For
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral">
                {payments.map((payment) => (
                  <tr key={payment._id} className="hover:bg-secondary/10">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-accent">
                      {payment.transactionId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
                      ${payment.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
                      {payment.paymentMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
                      <span className="px-2 py-1 rounded-full text-xs bg-primary/30 text-accent">
                        Charity
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default PaymentHistory;