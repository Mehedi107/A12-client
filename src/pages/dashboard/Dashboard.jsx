import { NavLink, Outlet } from 'react-router';
import HelmetAsync from '../../components/shared/HelmetAsync';

const Dashboard = () => {
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
