import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidationSchema } from "../../schema/Schema";

import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    Cookies.set(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNzU5NTlhMGYtMmEyMS00YzYxLWFkMzgtMzQ4NjE4ZjM3OWU3IiwidXNlcklkIjoiYTlhOWM5MWUtNDBhMS03MDFlLWY0ZTEtOWZhMTQxYzRhY2E1Iiwic3RyaXBlSWQiOm51bGwsInN1YnNjcmlwdGlvblN0YXR1cyI6InRyaWFsaW5nIiwic3RyaXBlU3Vic2NyaXB0aW9uSWQiOm51bGwsInN0cmlwZVNjaGVkdWxlSWQiOm51bGwsInVzZXJSb2xlIjozLCJwcm9kdWN0SW5mbyI6ZmFsc2UsImVtYWlsIjoiaGV4YWNvZGVydGVzdEBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsIm9yZ2FuaXphdGlvbiI6ImhleGFhIiwidXNlck5hbWUiOm51bGwsImNvbXBhbnlOZXdzIjpmYWxzZSwib2ZmZXJzIjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAyNS0wMy0wN1QxMDoyNjoyMy43MTRaIiwidXBkYXRlZEF0IjoiMjAyNS0wMy0wN1QxMDoyNjoyMy43MjlaIiwic3Vic2NyaXB0aW9uSWQiOiI0Y2Q2MjRiZC1iNTM1LTRjZjItODA0Ni1lYzkxYmVmN2IzNzAiLCJpbWFnZSI6Imh0dHBzOi8vbW9udGFnZS1kYXRhLWRldi5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS91c2VyLzc1OTU5YTBmLTJhMjEtNGM2MS1hZDM4LTM0ODYxOGYzNzllNy9wcm9maWxlLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1Db250ZW50LVNoYTI1Nj1VTlNJR05FRC1QQVlMT0FEJlgtQW16LUNyZWRlbnRpYWw9QUtJQTJMSVBaWkNIVk9QM0RONVAlMkYyMDI1MDMxMCUyRnVzLXdlc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNTAzMTBUMDcyMjMyWiZYLUFtei1FeHBpcmVzPTg2NDAwJlgtQW16LVNpZ25hdHVyZT03MWM1ZWYxZDA1YTI1MWZkOWNhNjQ4MDNlNDFiODgyODE0ODA4NDc4ZDJiYzgzOTQzOTEzMjlmNjAxMWZiNTgzJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ4LWlkPUdldE9iamVjdCJ9LCJ1c2VySWQiOiJhOWE5YzkxZS00MGExLTcwMWUtZjRlMS05ZmExNDFjNGFjYTUiLCJpc0FkbWluIjpmYWxzZSwiaGFzQWRtaW5QYW5lbEFjY2VzcyI6ZmFsc2UsImNvZ25pdG8iOnsiY3VzdG9tOm9yZ2FuaXphdGlvbiI6ImhleGFhIiwic3ViIjoiYTlhOWM5MWUtNDBhMS03MDFlLWY0ZTEtOWZhMTQxYzRhY2E1IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8vY29nbml0by1pZHAudXMtd2VzdC0xLmFtYXpvbmF3cy5jb20vdXMtd2VzdC0xX0I0Z1BCb1FzVSIsImNvZ25pdG86dXNlcm5hbWUiOiJhOWE5YzkxZS00MGExLTcwMWUtZjRlMS05ZmExNDFjNGFjYTUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJIZXhhY29kZXJEZXYiLCJvcmlnaW5fanRpIjoiOWI2ODJlNTUtYjMwNC00YTE2LWJhMDItNmYwOGVmMWZkOWI5IiwiYXVkIjoiMm9ucnQ2bXZhazkxMGdnNWFwcDNwaHRzdTkiLCJldmVudF9pZCI6ImU2Y2UwZGQ4LWYxMjMtNDRkZi1iYTUwLWJkYjlmYmI0MjdhNiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzQxNTkxMzUxLCJuYW1lIjoiVGVzdCBVc2VyIiwiZXhwIjoxNzQxNTk0OTUxLCJpYXQiOjE3NDE1OTEzNTEsImp0aSI6Ijk2OTM4MDY2LWQ1ZGYtNGYwOC1iOTA5LWY4MTQ3NDZiNDIwZCIsImVtYWlsIjoiaGV4YWNvZGVydGVzdEBnbWFpbC5jb20ifSwiaWF0IjoxNzQxNTkxMzUyLCJleHAiOjE3NDI0NTUzNTJ9.veDZjmufY2KJDU8dTzpPI7F8Zdgs1nrXG-U3ltFD-LQ"
    );
    navigate("/mainPage");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <nav className="w-full bg-white shadow p-4 flex items-center">
        <div className="flex items-center space-x-2">
          <img src="assets/cinapp.png" alt="Montage Logo" className="h-6" />
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
