import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidationSchema } from "../../schema/Schema";

import { fetchPost } from "../../utils/FetchApi";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  // const {login} = useAuth();
  const handleLogin = async (values: { email: string; password: string }) => {
    const response = await fetchPost("/login", "POST", JSON.stringify(values));
    if (response.success) {
      console.log("Login Successful:", response.data);
      alert("Login successful");
      // login(response.data)
    } else {
      console.error("Login Failed:", response.message);
      alert(response.message || "Login failed");
    }
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
                onClick={() => navigate("/mainpage")}
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
