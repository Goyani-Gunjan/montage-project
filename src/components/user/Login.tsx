import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidationSchema } from "../../schema/Schema";

import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    await Cookies.set(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiM2FhZGYxMTAtYmJlYy00MDhmLTliMzktZDU2ZTZhZWFhZWNlIiwidXNlcklkIjoiNzkxOTU5NWUtMDAxMS03MGM1LTkwMDAtMWMzODhhOTg0NjVhIiwic3RyaXBlSWQiOiJjdXNfUnl1UVFZVkNaVU52eXoiLCJzdWJzY3JpcHRpb25TdGF0dXMiOiJhY3RpdmUiLCJzdHJpcGVTdWJzY3JpcHRpb25JZCI6InN1Yl8xUWFjZ2JTSFpVbktDc3ZyYVVFR0ZOZTIiLCJzdHJpcGVTY2hlZHVsZUlkIjpudWxsLCJ1c2VyUm9sZSI6MywicHJvZHVjdEluZm8iOmZhbHNlLCJlbWFpbCI6ImFqYXlwdGwwNDAxQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IkFqYXkiLCJsYXN0TmFtZSI6IlBhdGVsIiwib3JnYW5pemF0aW9uIjoiIiwidXNlck5hbWUiOm51bGwsImNvbXBhbnlOZXdzIjpmYWxzZSwib2ZmZXJzIjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAyNC0xMi0yNlQwOTo1NDoxNS42OTlaIiwidXBkYXRlZEF0IjoiMjAyNS0wMy0yMVQwMzo1MToxOS4xODVaIiwic3Vic2NyaXB0aW9uSWQiOiJmNjY1OTFmOC1mZWZlLTQzZWUtOTIzNy1mOGUyNDU3MzM4OGMiLCJpbWFnZSI6Imh0dHBzOi8vbW9udGFnZS1kYXRhLWRldi5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS91c2VyLzNhYWRmMTEwLWJiZWMtNDA4Zi05YjM5LWQ1NmU2YWVhYWVjZS9wcm9maWxlLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1Db250ZW50LVNoYTI1Nj1VTlNJR05FRC1QQVlMT0FEJlgtQW16LUNyZWRlbnRpYWw9QUtJQTJMSVBaWkNIVk9QM0RONVAlMkYyMDI1MDQxMyUyRnVzLXdlc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNTA0MTNUMTcwODQwWiZYLUFtei1FeHBpcmVzPTg2NDAwJlgtQW16LVNpZ25hdHVyZT00ZWUzNmU0MzExODljMzQ3Zjg0N2UxOTJlYTJiOTA5N2Q4MmEzZDVlZjIzNWU0MDgzNTZkYTdiNzQzYmQ0YzIzJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ4LWlkPUdldE9iamVjdCJ9LCJ1c2VySWQiOiI3OTE5NTk1ZS0wMDExLTcwYzUtOTAwMC0xYzM4OGE5ODQ2NWEiLCJpc0FkbWluIjpmYWxzZSwiaGFzQWRtaW5QYW5lbEFjY2VzcyI6dHJ1ZSwiY29nbml0byI6eyJzdWIiOiI3OTE5NTk1ZS0wMDExLTcwYzUtOTAwMC0xYzM4OGE5ODQ2NWEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9jb2duaXRvLWlkcC51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS91cy13ZXN0LTFfQjRnUEJvUXNVIiwiY29nbml0bzp1c2VybmFtZSI6Ijc5MTk1OTVlLTAwMTEtNzBjNS05MDAwLTFjMzg4YTk4NDY1YSIsInByZWZlcnJlZF91c2VybmFtZSI6IkFqYXkiLCJnaXZlbl9uYW1lIjoiQWpheSIsIm9yaWdpbl9qdGkiOiJhNjM2ZDBhMi1kZDM4LTRkOTItYjFkOC0xNzI4NzAwMDBmOTIiLCJhdWQiOiIyb25ydDZtdmFrOTEwZ2c1YXBwM3BodHN1OSIsImV2ZW50X2lkIjoiOTg1MTgxNGItNmI2Ny00ZjJjLWI5ZTAtZDkxMDRmMzc3ZTUyIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3NDQ1NjQxMTksIm5hbWUiOiJBamF5IFBhdGVsIiwiZXhwIjoxNzQ0NTY3NzE5LCJpYXQiOjE3NDQ1NjQxMTksImZhbWlseV9uYW1lIjoiUGF0ZWwiLCJqdGkiOiI0ZjkwMDIyMC0zN2U5LTRiZWEtYWExYy04YjQ0YTFiODllOGEiLCJlbWFpbCI6ImFqYXlwdGwwNDAxQGdtYWlsLmNvbSJ9LCJpYXQiOjE3NDQ1NjQxMjAsImV4cCI6MTc0NTQyODEyMH0.5RmdQD6ix1gqOx6l2AeFrrATTUUWkAhqflWP2nhvAF8"
    );
    navigate("/home");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <nav className="w-full bg-white shadow p-4 flex items-center">
        <div className="flex items-center space-x-2">
          <img
            src="assets/Montage-Logo.svg"
            alt="Montage Logo"
            className="h-6"
          />
          <span className="font-semibold text-lg">Montage</span>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold text-center">Sign In</h2>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginValidationSchema}
            onSubmit={handleLogin}
          >
            <Form className="mt-4">
              <div className="mb-4">
                <label className="block text-gray-700">
                  User name or email
                </label>
                <Field
                  type="text"
                  name="email"
                  className="w-full p-2 border rounded mt-1"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full p-2 border rounded mt-1"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white p-2 rounded hover:bg-gray-500"
                onClick={handleLogin}
              >
                Sign In
              </button>
            </Form>
          </Formik>
          <div className="text-center mt-4 text-sm">
            <a href="#" className="text-blue-500">
              Trouble Signing In?
            </a>
          </div>
          <div className="mt-4 border-t pt-4 text-center text-sm">
            <span>OR</span>
          </div>
          <button
            className="w-full mt-4 bg-gray-200 text-gray-700 p-2 rounded hover:bg-gray-50"
            onClick={() => navigate("/signup")}
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
