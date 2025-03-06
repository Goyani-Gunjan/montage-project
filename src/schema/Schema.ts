import * as Yup from "yup";

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const signupValidationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  username: Yup.string().required("Required"),
  password: Yup.string()
    .min(6, "Must be at least 6 characters")
    .required("Password is required"),
});

export { signupValidationSchema, loginValidationSchema };
