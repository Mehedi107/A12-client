import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import HelmetAsync from '../components/shared/HelmetAsync';
import { notifyError, notifySuccess } from '../utils/notification';
import GoogleLogin from '../components/shared/buttons/GoogleLogin';
import useAuth from '../hooks/useAuth';
import { saveUserDataToDB } from '../utils/saveUserDataToDB';
import { verifyPassword } from '../utils/verifyPassword';
import { Link, useLocation, useNavigate } from 'react-router';

const Register = () => {
  const [toggle, setToggle] = useState(false);
  const { createUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location?.state?.from?.pathname || '/';

  const handleCreateUser = async e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
    const formData = { name, email, photo, password, role: 'user' };

    try {
      verifyPassword(password);
      setLoading(true);

      await createUser(email, password, name, photo);
      // Save user data to Database...
      await saveUserDataToDB(formData);

      notifySuccess('Account created successfully!');
      form.reset();
      navigate(redirectTo);
    } catch (error) {
      notifyError(error.message);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <HelmetAsync title="Register" />

      <div className="w-full max-w-md m-5 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl text-center mb-4">Register</h2>
        <form onSubmit={handleCreateUser}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              id="username"
              className="input w-full mt-2 input-bordered"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="photo"
              id="photo"
              className="input w-full mt-2 input-bordered"
              placeholder="Enter Photo URL"
              required
            />
          </div>

          <div className="mb-4">
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
            <label className="input input-bordered flex items-center gap-2">
              <input
                type={toggle ? 'text' : 'password'}
                className="grow"
                placeholder="Enter a password"
                name="password"
                required
              />
              <span
                onClick={() => setToggle(!toggle)}
                className="cursor-pointer"
              >
                {toggle ? <FaEye /> : <FaEyeSlash />}
              </span>
            </label>
          </div>

          <button type="submit" className="btn border-none btn-block mt-3">
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="divider">Or</div>

        <GoogleLogin label="Sign up with Google" redirectTo={redirectTo} />

        <div className="flex justify-center items-center mt-6 gap-2">
          <span>Already have an account?</span>
          <Link className="link" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
