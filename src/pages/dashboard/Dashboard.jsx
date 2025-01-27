import { Link, NavLink, Outlet } from 'react-router';
import HelmetAsync from '../../components/shared/HelmetAsync';
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Dashboard = () => {
  const { user, signOutUser } = useAuth();
  const [role, setRole] = useState('');
  const axiosPublic = useAxiosPublic();

  const navLinks = (
    <>
      <li className="mb-2">
        <NavLink to={'my-profile'}>My Profile</NavLink>
      </li>
      <li className="mb-2">
        <NavLink to={'add-product'}>Add Product</NavLink>
      </li>
      <li className="mb-2">
        <NavLink to={'my-product'}>My Product</NavLink>
      </li>

      {/* Moderator routes */}
      {role === 'moderator' ||
        (role === 'admin' && (
          <>
            <li className="mb-2">
              <NavLink to={'product-review'}>Product Review</NavLink>
            </li>

            <li className="mb-2">
              <NavLink to={'reported-content'}>Reported Content</NavLink>
            </li>
          </>
        ))}
      {/* Amin routes */}
      {role === 'admin' && (
        <>
          <li className="mb-2">
            <NavLink to={'user'}>Manage User</NavLink>
          </li>
          <li className="mb-2">
            <NavLink to={'statistics'}>Statistics</NavLink>
          </li>

          <li className="mb-2">
            <NavLink to={'coupon'}>Manage Coupon</NavLink>
          </li>
        </>
      )}
      <li className="mb-2">
        <NavLink to={'/'}>Home</NavLink>
      </li>
      <li className="mb-2">
        <NavLink to={'/products'}>All Products</NavLink>
      </li>
      <li className="mb-2">
        <Link onClick={signOutUser}>Logout</Link>
      </li>
    </>
  );

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const res = await axiosPublic.get(`/user/${user.email}`);

      if (res.data.role === 'moderator') {
        setRole(res.data.role);
      }

      if (res.data.role === 'admin') {
        setRole(res.data.role);
      }

      if (res.data.role === 'user') {
        setRole(res.data.role);
      }
    };
    fetchCurrentUser();
  }, [axiosPublic, user.email]);

  return (
    <div>
      <HelmetAsync title="Dashboard" />
      {/* Dashboard Navbar for small device */}
      <div className="drawer md:hidden">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="navbar bg-base-300 w-full">
            <div className="mx-2 font-medium text-xl flex-1 px-2">
              Dashboard
            </div>
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square bg-transparent border-none shadow-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
          </div>
          {/* Page content here */}
          <div className="w-full bg-white p-4">
            <Outlet />
          </div>
          <div></div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 min-h-full w-80 p-4">
            {/* Sidebar content here */}
            {navLinks}
          </ul>
        </div>
      </div>

      {/* Navigation for large device */}
      <div className="hidden md:flex md:flex-row sm:min-h-screen transition-transform">
        <div className="w-full md:w-1/4 p-4 bg-base-300 ">
          <div className="flex justify-between items-start gap-4">
            <h2 className="text-xl sm:text-2xl font-bold sm:mb-4 mb-0 py-2">
              Dashboard
            </h2>
          </div>
          {/* Navigation links */}
          <ul className="hidden menu  sm:block">{navLinks}</ul>
        </div>

        {/* Content Area */}
        <div className="w-full md:w-3/4 bg-white p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
