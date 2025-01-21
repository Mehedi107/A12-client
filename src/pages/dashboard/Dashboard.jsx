import { NavLink, Outlet } from 'react-router';
import HelmetAsync from '../../components/shared/HelmetAsync';
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Dashboard = () => {
  const { user } = useAuth();
  const [role, setRole] = useState('');

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const res = await axiosPublic.get(`/user/${user.email}`);
      // console.log(res.data.role);
      setRole(res.data.role);
    };
    fetchCurrentUser();
  }, [axiosPublic, user.email]);

  if (role === 'moderator') {
    // console.log(role);
  }
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <HelmetAsync title="Dashboard" />
      {/* Navigation Sidebar */}
      <div className="w-full md:w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <ul>
          <li className="mb-2">
            <NavLink
              to={'my-profile'}
              className={({ isActive }) =>
                isActive
                  ? 'bg-gray-700 block p-2 rounded'
                  : 'block p-2 rounded hover:bg-gray-700'
              }
            >
              My Profile
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to={'add-product'}
              className={({ isActive }) =>
                isActive
                  ? 'bg-gray-700 block p-2 rounded'
                  : 'block p-2 rounded hover:bg-gray-700'
              }
            >
              Add Product
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to={'my-product'}
              className={({ isActive }) =>
                isActive
                  ? 'bg-gray-700 block p-2 rounded'
                  : 'block p-2 rounded hover:bg-gray-700'
              }
            >
              My Product
            </NavLink>
          </li>

          {/* Moderator routes */}
          {role === 'moderator' ? (
            <>
              <li className="mb-2">
                <NavLink
                  to={'product-review'}
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-gray-700 block p-2 rounded'
                      : 'block p-2 rounded hover:bg-gray-700'
                  }
                >
                  Product Review
                </NavLink>
              </li>

              <li className="mb-2">
                <NavLink
                  to={'reported-content'}
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-gray-700 block p-2 rounded'
                      : 'block p-2 rounded hover:bg-gray-700'
                  }
                >
                  Reported Content
                </NavLink>
              </li>
            </>
          ) : (
            ''
          )}
        </ul>
        <div className="divider divider-accent"></div>
        <ul>
          <li className="mb-2">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'bg-gray-700 block p-2 rounded'
                  : 'block p-2 rounded hover:bg-gray-700'
              }
              to={'/'}
            >
              Home
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'bg-gray-700 block p-2 rounded'
                  : 'block p-2 rounded hover:bg-gray-700'
              }
              to={'/products'}
            >
              All Products
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="w-full md:w-3/4 bg-gray-100 p-4 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
