import { calculateAge } from "./calculateAge";
import * as Yup from "yup";

export const logInValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Email must be a Gmail address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const registerValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "First Name must be at least 3 characters")
    .required("First Name is required"),
  lastName: Yup.string()
    .min(3, "Last Name must be at least 3 characters")
    .required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Email must be a Gmail address")
    .required("Email is required"),
  mobileNumber: Yup.string()
    .required("Mobile Number is required")
    .matches(
      /^09\d{9}$/,
      "Mobile Number must be 11 digits long and start with 09"
    ),
  birthDate: Yup.date()
    .required("Birthdate is required")
    .nullable()
    .test("age", "You must be at least 18 years old", (value) => {
      if (!value) return false;
      return calculateAge(value) >= 18;
    }),
  gender: Yup.string().required("Gender is required"),
  weight: Yup.number().required("Weight is required").positive().integer(),
  vehicle: Yup.string().required("Vehicle is required"),
  plateNumber: Yup.string()
    .min(3, "Plate Number must be at least 3 characters")
    .required("Plate Number is required"),
  maxLoad: Yup.number().required("Max Load is required").positive().integer(),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const editPersonalInfoValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "First Name must be at least 3 characters")
    .required("First Name is required"),
  lastName: Yup.string()
    .min(3, "Last Name must be at least 3 characters")
    .required("Last Name is required"),
  address: Yup.string(),
  weight: Yup.number().required("Weight is required").positive().integer(),
  vehicle: Yup.string().required("Vehicle is required"),
  plateNumber: Yup.string()
    .min(3, "Plate Number must be at least 3 characters")
    .required("Plate Number is required"),
  maxLoad: Yup.number().required("Max Load is required").positive().integer(),
});

export const changeEmailValidationSchema = Yup.object({
  newEmail: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const changePasswordValidationSchema = Yup.object({
  currentPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const reportValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  description: Yup.string()
    .min(3, "Description must be at least 3 characters")
    .required("Description Name is required"),
  images: Yup.array().max(5, "You can upload up to 5 images"),
});
