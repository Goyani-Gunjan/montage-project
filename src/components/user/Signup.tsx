import { Formik, Form, Field, ErrorMessage } from "formik";
import montageLogo from "../../assets/cineapp.png";
import { signupValidationSchema } from "../../schema/Schema";

const Signup = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left Side Panel */}
      <div className="w-1/5 bg-blue-900 text-white p-8 flex flex-col justify-center">
        <div className="mb-8 flex items-center space-x-2">
          <img src={montageLogo} alt="Montage Logo" className="h-8" />
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

      {/* Right Side Form */}
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
            onSubmit={(values) => {
              console.log("Form Submitted", values);
            }}
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
                <Field type="checkbox" name="terms" className="mr-2" />
                <span className="text-sm">
                  I agree to the Montage{" "}
                  <a href="#" className="text-blue-500">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-500">
                    Privacy Policy
                  </a>
                  .
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-400 text-white p-2 rounded cursor-not-allowed"
                disabled
              >
                Create Account
              </button>

              <p className="text-center text-sm mt-4">
                Already have an account?{" "}
                <a href="#" className="text-blue-500">
                  Log In
                </a>
              </p>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Signup;
