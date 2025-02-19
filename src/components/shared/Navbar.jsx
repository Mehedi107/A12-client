import { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import AuthContext from '../../context/AuthContext';
import avatar from '../../assets/avatar.png';

const Navbar = () => {
  const { user, signOutUser, loading } = useContext(AuthContext);
  const navLinks = (
    <>
      <li>
        <NavLink
          // className={({ isActive }) => (isActive ? '!bg-red-500' : '')}
          to={'/'}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to={'products'}>Products</NavLink>
      </li>
      {!user && (
        <li>
          <NavLink to={'login'}>Login</NavLink>
        </li>
      )}
    </>
  );

  const userProfile = (
    <>
      {user && (
        <div className="dropdown md:dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={user?.photoURL || user?.photo || avatar}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[10] mt-3 w-52 p-2 shadow"
          >
            <p className="text-center font-semibold text-lg">
              {(loading && user?.displayName) ||
                user?.name ||
                (user?.email && 'Hi! ' + user?.displayName) ||
                user?.name ||
                user?.email ||
                'User'}
            </p>
            <div className="divider m-0"></div>
            <li>
              <NavLink to={'dashboard/my-profile'}>Dashboard</NavLink>
            </li>
            <li>
              <Link onClick={signOutUser}>Logout</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );

  return (
    <nav className="navbar  backdrop-blur-sm fixed top-0 right-0 z-10 w-full">
      {/* Nav Start */}
      <div className="navbar-start">
        {/* Login button for small device */}
        <div className="md:hidden">{userProfile}</div>
        {!user && (
          <Link
            className="md:hidden bg-neutral text-sm text-white py-2 px-4 rounded"
            to={'login'}
          >
            Login
          </Link>
        )}
        {/* Logo for larger device */}
        <Link to="/" className="hidden md:block text-xl font-medium">
          ProdVent
        </Link>
      </div>

      {/* Nav Center */}
      <div className="navbar-center ">
        {/* Logo for small device */}
        <Link to="/" className="md:hidden font-medium text-xl">
          ProdVent
        </Link>
        {/* Nav links for large device */}
        <ul className="hidden font-medium md:flex menu menu-horizontal px-1">
          {navLinks}
        </ul>
      </div>

      {/* Nav End */}
      <div className="navbar-end items-end">
        {/* Avatar for large device */}
        <div className="hidden md:block">{userProfile}</div>

        {/* Mobile navigation */}
        <div className="drawer drawer-end w-auto md:hidden z-10">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <label
            htmlFor="my-drawer-2"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
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
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-3/4 sm:w-80 p-4">
              {/* Sidebar content here */}
              {navLinks}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
