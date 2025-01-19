import { Link } from 'react-router';

const Error = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-accent">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-clr-primary">404</h1>
        <p className="text-2xl font-semibold mt-4 text-gray-800">
          Oops! Page Not Found.
        </p>
        <p className="mt-2 text-gray-600">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          to="/"
          className="bg-primary text-accent mt-6 inline-block px-6 py-3 rounded shadow transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
