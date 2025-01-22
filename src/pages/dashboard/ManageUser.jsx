import { useState } from 'react';
import { notifyError, notifySuccess } from '../../utils/notification';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ManageUser = () => {
  const [loading, setLoading] = useState(true);
  // const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const fetchUsers = async () => {
    try {
      const res = await axiosSecure.get('/users');
      return res.data;
    } catch (error) {
      console.error('Error fetching users:', error.message);
      notifyError('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const updateRole = async (email, role) => {
    try {
      const res = await axiosSecure.patch(`/users/${email}/role`, { role });
      // console.log(res);
      if (res.data.modifiedCount) {
        notifySuccess('User role has been changed!');
        refetch();
      }
    } catch (error) {
      console.error('Error updating role:', error.message);
      notifyError('Failed to update user role.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-center">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.email} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{user.name || 'N/A'}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border capitalize">
                  {user.role || 'user'}
                </td>
                <td className="px-4 py-2 border">
                  <div className="flex gap-2">
                    {user.role !== 'admin' && (
                      <button
                        onClick={() => updateRole(user.email, 'admin')}
                        className="btn btn-sm bg-green-500 hover:bg-green-600 text-white"
                      >
                        Make Admin
                      </button>
                    )}
                    {user.role !== 'moderator' && (
                      <button
                        onClick={() => updateRole(user.email, 'moderator')}
                        className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        Make Moderator
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
