import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxios from '../../../hooks/useAxios';
import Loading from '../../../Components/Loading';

const ManageUsers = () => {
  const axiosInstance = useAxios();

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosInstance.get('/users');
      return res.data;
    },
  });

  const handleMakeRole = async (email, role) => {
    try {
      await axiosInstance.patch(`/users/role?email=${email}`, { role });
      Swal.fire('Success', `${role} role assigned`, 'success');
      refetch();
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  };

  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: 'Confirm Delete',
      text: 'Are you sure you want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/users/${userId}`);
        Swal.fire('Deleted!', 'User has been deleted.', 'success');
        refetch();
      } catch (err) {
        Swal.fire('Error', err.message, 'error');
      }
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className="space-x-2">
                <button onClick={() => handleMakeRole(user.email, 'admin')} className="btn btn-xs">Make Admin</button>
                <button onClick={() => handleMakeRole(user.email, 'restaurant')} className="btn btn-xs">Make Restaurant</button>
                <button onClick={() => handleMakeRole(user.email, 'charity')} className="btn btn-xs">Make Charity</button>
                <button onClick={() => handleDelete(user._id)} className="btn btn-xs btn-error">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
