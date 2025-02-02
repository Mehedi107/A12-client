import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../../hooks/useAuth';
import { notifyError, notifySuccess } from '../../../utils/notification';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import { saveUserDataToDB } from '../../../utils/saveUserDataToDB';

const GoogleLogin = ({ redirectTo, label }) => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const res = await googleLogin();
      const userData = {
        name: res.user.displayName,
        email: res.user.email,
        photo: res.user.photoURL,
        role: 'user',
        status: 'regular',
      };

      // Save user data to database
      await saveUserDataToDB(userData);

      notifySuccess('Successfully Logged In!');
      navigate(redirectTo);
    } catch (error) {
      notifyError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-4">
      <button className="btn-neutral btn btn-block" onClick={handleGoogleLogin}>
        <FcGoogle className="text-2xl" />
        {label}
      </button>
    </div>
  );
};

GoogleLogin.propTypes = {
  redirectTo: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default GoogleLogin;
