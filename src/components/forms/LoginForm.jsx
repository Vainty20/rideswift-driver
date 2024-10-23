import { useState } from "react";
import { Formik } from "formik";
import { Popup } from "react-native-popup-confirm-toast";
import { useDispatch, useSelector } from "react-redux";
import { Pressable, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/color";
import { forgotPassword, logIn } from "../../features/auth/authSlice";
import { logInInitialValues } from "../../constants/initialValues";
import { logInValidationSchema } from "../../utils/validationSchema";
import { formatFirebaseAuthErrorMessage } from "../../utils/formatFirebaseAuthErrorMessage";
import Button from "../ui/Button";
import Input from "../ui/Input";
import PasswordInput from "../ui/PasswordInput";

export default function LoginForm({ navigation }) {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const { loading } = useSelector((state) => state.auth);

  const handleLogIn = async (values, { resetForm }) => {
    try {
      await dispatch(logIn(values)).unwrap();
      Popup.show({
        type: "success",
        title: "Success!",
        textBody: "You have successfully logged in.",
        buttonText: "OK",
        iconEnabled: false,
        titleTextStyle: { fontFamily: "DMSans_700Bold", textAlign: "left" },
        descTextStyle: { fontFamily: "DMSans_400Regular", textAlign: "left" },
        okButtonStyle: { backgroundColor: Colors.primaryColor },
        timing: 5000,
        callback: () => Popup.hide(),
      });
      navigation.replace("Home");
    } catch (error) {
      console.error(error);
      const formattedErrorMessage = formatFirebaseAuthErrorMessage(
        error.message || error.code
      );
      setErrorMessage(formattedErrorMessage);
    } finally {
      resetForm();
    }
  };

  const handleForgotPassword = async (email) => {
    try {
      if (!email) {
        throw new Error(
          "An email address is required to send the password reset link."
        );
      }

      await dispatch(forgotPassword(email)).unwrap();
      Popup.show({
        type: "success",
        title: "Success!",
        textBody:
          "Password reset email sent successfully! Please check your inbox.",
        buttonText: "OK",
        iconEnabled: false,
        titleTextStyle: { fontFamily: "DMSans_700Bold", textAlign: "left" },
        descTextStyle: { fontFamily: "DMSans_400Regular", textAlign: "left" },
        okButtonStyle: { backgroundColor: Colors.primaryColor },
        timing: 5000,
        callback: () => Popup.hide(),
      });
    } catch (error) {
      console.log(error.message);
      const formattedErrorMessage = formatFirebaseAuthErrorMessage(
        error.message || error.code
      );
      setErrorMessage(formattedErrorMessage);
      console.log("Forgot Password failed:", formattedErrorMessage);
    }
  };

  return (
    <Formik
      initialValues={logInInitialValues}
      validationSchema={logInValidationSchema}
      onSubmit={handleLogIn}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <>
          <Input
            maxLength={40}
            placeholder="Email"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            errorMessage={touched.email && errors.email ? errors.email : ""}
          />

          <PasswordInput
            maxLength={40}
            placeholder="Password"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            errorMessage={
              touched.password && errors.password ? errors.password : ""
            }
          />

          <Pressable onPress={() => handleForgotPassword(values.email)}>
            <Text style={styles.link}>Forgot Password?</Text>
          </Pressable>

          <Button text="Login" loading={loading} onPress={handleSubmit} />

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
        </>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  link: {
    color: Colors.link,
    fontSize: 15,
    fontFamily: "DMSans_700Bold",
    alignSelf: "flex-end",
    marginLeft: 5,
    marginBottom: 10,
  },
  errorText: {
    textAlign: "center",
    fontFamily: "DMSans_500Medium",
    color: Colors.error400,
    fontSize: 13,
    marginTop: 12,
  },
});
