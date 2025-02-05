import { Link, useLocation, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { notifyError, notifySuccess } from '../utils/notification';
import HelmetAsync from '../components/shared/HelmetAsync';
import GoogleLogin from '../components/shared/buttons/GoogleLogin';

const Login = () => {
  const [toggle, setToggle] = useState(false);
  const { signInUser, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location?.state?.from?.pathname || '/';

  const handleLogin = async e => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    await signInUser(email, password)
      .then(() => {
        notifySuccess('Successfully Logged In !');
        form.reset();
        navigate(redirectTo);
      })
      .catch(error => {
        notifyError(error.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-300 p-4">
      <HelmetAsync title="Login" />

      <div className="w-full max-w-md  m-5 p-8 rounded-lg shadow-lg bg-base-100">
        <h2 className="text-3xl text-center mb-6">Login</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-start">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="input w-full mt-2 input-bordered"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <p className=" mb-2 text-left">Password</p>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type={toggle ? 'text' : 'password'}
                className="grow"
                name="password"
                placeholder="Enter a password"
                required
              />
              <span
                onClick={() => setToggle(!toggle)}
                className="cursor-pointer"
              >
                {toggle ? <FaEye /> : <FaEyeSlash />}
              </span>
            </label>
            <p
              // onClick={handleForgetPassword}
              className=" mt-2 text-left text-sm hover:underline cursor-pointer"
            >
              Forget password?
            </p>
          </div>

          <button type="submit" className="btn btn-neutral btn-block mt-4 ">
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="divider">Or</div>

        <GoogleLogin
          redirectTo={redirectTo}
          label={'Continue with google'}
        ></GoogleLogin>

        <div className=" text-center mt-5">
          <p>
            Don&apos;t have account?{' '}
            <Link className=" link text-primary" to="/register">
              Create Account
            </Link>{' '}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
