import { Formik, Form, Field, ErrorMessage } from "formik";

import { signupValidationSchema } from "../../schema/Schema";
import { fetchPost } from "../../utils/FetchApi";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const handleSignup = async (values: {
    fullName: string;
    email: string;
    password: string;
  }) => {
    const response = await fetchPost(
      "/register",
      "POST",
      JSON.stringify(values)
    );
    if (response.success) {
      console.log("Signup Successful:", response.data);
      alert("Account created successfully!");
    } else {
      console.error("Signup Failed:", response.message);
      alert(response.message || "Signup failed");
    }
  };

  const handleLoginRoute = () => {
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/5 bg-blue-900 text-white p-8 flex flex-col justify-center">
        <div className="mb-8 flex items-center space-x-2">
          <img src="assets/cinapp.png" alt="Montage Logo" className="h-8" />
          <span className="text-xl font-semibold">Montage</span>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Get started for free</h2>
          <p className="text-sm">Only pay for what you need</p>
        </div>
        <ul className="space-y-4">
          <li className="flex items-start space-x-2">
            <span className="text-lg">✅</span>
            <div>
              <h3 className="font-semibold">Get started fast</h3>
              <p className="text-sm">
                Start for free. Designing with Montage Studio is always free so
                you can sign up and get started without friction.
              </p>
            </div>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-lg">✅</span>
            <div>
              <h3 className="font-semibold">Access free design tools</h3>
              <p className="text-sm">
                Use our design tools to create the perfect design for your next
                home or ADU project!
              </p>
            </div>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-lg">✅</span>
            <div>
              <h3 className="font-semibold">Trusted by industry leaders</h3>
              <p className="text-sm">
                Join our growing network of registered architects designing and
                developing projects with Montage Studio.
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div className="flex-1 flex justify-center items-center">
        <div className="w-96 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center">
            Create your account
          </h2>
          <Formik
            initialValues={{
              accountType: "individual",
              fullName: "",
              email: "",
              username: "",
              password: "",
            }}
            validationSchema={signupValidationSchema}
            onSubmit={handleSignup}
          >
            <Form className="mt-4">
              <div className="mb-4 flex flex-col space-y-2">
                <label className="flex items-center space-x-2">
                  <Field
                    type="radio"
                    name="accountType"
                    value="individual"
                    className="form-radio"
                  />
                  <span>Individual</span>
                </label>
                <label className="flex items-center space-x-2">
                  <Field
                    type="radio"
                    name="accountType"
                    value="business"
                    className="form-radio"
                  />
                  <span>Business</span>
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Full name</label>
                <Field
                  type="text"
                  name="fullName"
                  className="w-full p-2 border rounded mt-1"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <Field
                  type="email"
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
                <label className="block text-gray-700">User name</label>
                <Field
                  type="text"
                  name="username"
                  className="w-full p-2 border rounded mt-1"
                />
                <ErrorMessage
                  name="username"
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

              <div className="mb-4 flex items-center">
                <Field
                  type="checkbox"
                  name="terms"
                  id="terms"
                  className="mr-2"
                />
                <label htmlFor="terms" className="text-sm">
                  I agree to the Montage{" "}
                  <a href="#" className="text-blue-500">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-500">
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white p-2 rounded  cursor-pointer"
                onClick={handleLoginRoute}
              >
                Create Account
              </button>

              <p className="text-center text-sm mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500">
                  Log In
                </Link>
              </p>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Signup;
