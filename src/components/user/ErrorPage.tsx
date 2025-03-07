import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100 bg-primary">
      <div className="text-center">
        <h1 className="display-1 text-danger">404</h1>
        <h2 className="fw-bold">Oops! Page not found.</h2>
        <p className="lead text-muted">
          The page you're looking for might have been moved or doesn't exist.
        </p>
        <Link to="/login" className="btn btn-primary btn-lg mt-3">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
