import { notifyError, notifySuccess } from '../../utils/notification';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import HelmetAsync from '../../components/shared/HelmetAsync';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();

  const fetchUsers = async () => {
    try {
      const res = await axiosSecure.get('/users');
      return res.data;
    } catch (error) {
      console.error('Error fetching users:', error.message);
      notifyError('Failed to fetch users.');
    }
  };

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const updateRole = async (email, role) => {
    try {
      const res = await axiosSecure.patch(`/users/${email}/role`, { role });
      if (res.data.modifiedCount) {
        notifySuccess('User role has been changed!');
        refetch();
      }
    } catch (error) {
      console.error('Error updating role:', error.message);
      notifyError('Failed to update user role.');
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="sm:p-6">
      <HelmetAsync title="Manage users" />
      <h2 className="mb-6 text-center">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="table border-collapse w-full text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          {users ? (
            <tbody>
              {users.map(user => (
                <tr key={user.email} className="hover:bg-gray-100">
                  <td className="border">{user.name || 'N/A'}</td>
                  <td className="border">{user.email}</td>
                  <td className="border capitalize">{user.role || 'user'}</td>
                  <td className="border">
                    <div className="flex gap-2 flex-wrap">
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
          ) : (
            <tbody>
              <tr>
                <td>Currently no user available...</td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
