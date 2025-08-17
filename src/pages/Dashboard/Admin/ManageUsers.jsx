import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Loading from '../../../Components/Loading';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUserShield, FaStore, FaHandHoldingHeart, FaUserEdit, FaTrashAlt } from 'react-icons/fa';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  const handleMakeRole = async (email, role) => {
    try {
      await axiosSecure.patch(`/users/role?email=${email}`, { role });
      Swal.fire({
        title: 'Success',
        text: `${role} role assigned successfully`,
        icon: 'success',
        background: '#FEFAE0',
        confirmButtonColor: '#CCD5AE'
      });
      refetch();
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: err.message || 'Failed to update role',
        icon: 'error',
        background: '#FEFAE0',
        confirmButtonColor: '#f43f5e'
      });
    }
  };

  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: 'Confirm Delete',
      text: 'Are you sure you want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      background: '#FEFAE0',
      confirmButtonColor: '#f43f5e',
      cancelButtonColor: '#CCD5AE'
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/users/${userId}`);
        Swal.fire({
          title: 'Deleted!',
          text: 'User has been deleted successfully.',
          icon: 'success',
          background: '#FEFAE0',
          confirmButtonColor: '#CCD5AE'
        });
        refetch();
      } catch (err) {
        Swal.fire({
          title: 'Error',
          text: err.message || 'Failed to delete user',
          icon: 'error',
          background: '#FEFAE0',
          confirmButtonColor: '#f43f5e'
        });
      }
    }
  };

  if (isLoading) return <Loading />;

  return (
    <section>
      <div className="mb-6">
        <div className="bg-primary/80 rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-base-100">Manage Users</h1>
        </div>
      </div>
      <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden border border-neutral">
        {users.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-4">
              <FaUserEdit className="text-accent text-3xl" />
            </div>
            <h3 className="text-xl font-medium text-accent mb-2">No users found</h3>
            <p className="text-accent/70">When users register, they'll appear here for management.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">
                    Current Role
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-accent uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-secondary/10">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-accent">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin'
                          ? 'bg-primary/30 text-accent border border-primary'
                          : user.role === 'restaurant'
                          ? 'bg-secondary/30 text-accent border border-secondary'
                          : user.role === 'charity'
                          ? 'bg-accent/10 text-accent border border-accent/20'
                          : 'bg-neutral/10 text-accent border border-neutral/20'
                      }`}>
                        {user.role || 'user'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleMakeRole(user.email, 'admin')}
                          className="px-3 py-1 rounded-lg cursor-pointer text-sm font-medium bg-primary text-accent hover:bg-primary/80 transition-colors flex items-center"
                          title="Make Admin"
                        >
                          <FaUserShield className="mr-1" />
                        </button>
                        <button
                          onClick={() => handleMakeRole(user.email, 'restaurant')}
                          className="px-3 py-1 rounded-lg cursor-pointer text-sm font-medium bg-secondary text-accent hover:bg-secondary/80 transition-colors flex items-center"
                          title="Make Restaurant"
                        >
                          <FaStore className="mr-1" />
                        </button>
                        <button
                          onClick={() => handleMakeRole(user.email, 'charity')}
                          className="px-3 py-1 rounded-lg cursor-pointer text-sm font-medium bg-accent/10 text-accent hover:bg-accent/20 transition-colors flex items-center border border-accent/20"
                          title="Make Charity"
                        >
                          <FaHandHoldingHeart className="mr-1" />
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="px-3 py-1 rounded-lg text-sm cursor-pointer font-medium bg-error/10 text-error hover:bg-error/20 transition-colors flex items-center border border-error/20"
                          title="Delete User"
                        >
                          <FaTrashAlt className="mr-1" />
                        </button>
                      </div>
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

export default ManageUsers;