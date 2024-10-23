import { useState } from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { Popup } from "react-native-popup-confirm-toast";
import { Colors } from "../../constants/color";
import { formatFirebaseAuthErrorMessage } from "../../utils/formatFirebaseAuthErrorMessage";
import { changePasswordValidationSchema } from "../../utils/validationSchema";
import { changePasswordInitialValues } from "../../constants/initialValues";
import { changePassword } from "../../features/auth/authSlice";
import Button from "../ui/Button";
import PasswordInput from "../ui/PasswordInput";

export default function ChangePasswordForm() {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const { loading, error } = useSelector((state) => state.auth);

  const handleChangePassword = async (values, { resetForm }) => {
    try {
      await dispatch(changePassword(values)).unwrap();
      Popup.show({
        type: "success",
        title: "Success!",
        textBody: "Your password has been successfully changed.!",
        buttonText: "OK",
        iconEnabled: false,
        titleTextStyle: { fontFamily: "DMSans_700Bold", textAlign: "left" },
        descTextStyle: { fontFamily: "DMSans_400Regular", textAlign: "left" },
        okButtonStyle: { backgroundColor: Colors.primaryColor },
        timing: 5000,
        callback: () => Popup.hide(),
      });
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

  return (
    <Formik
      initialValues={changePasswordInitialValues}
      validationSchema={changePasswordValidationSchema}
      onSubmit={handleChangePassword}
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
          <PasswordInput
            maxLength={50}
            placeholder="Current Password"
            onChangeText={handleChange("currentPassword")}
            onBlur={handleBlur("currentPassword")}
            value={values.currentPassword}
            errorMessage={
              touched.currentPassword && errors.currentPassword
                ? errors.currentPassword
                : ""
            }
          />
          <PasswordInput
            maxLength={50}
            placeholder="New Password"
            onChangeText={handleChange("newPassword")}
            onBlur={handleBlur("newPassword")}
            value={values.newPassword}
            errorMessage={
              touched.newPassword && errors.newPassword
                ? errors.newPassword
                : ""
            }
          />
          <PasswordInput
            maxLength={50}
            placeholder="Confirm New Password"
            onChangeText={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            value={values.confirmPassword}
            errorMessage={
              touched.confirmPassword && errors.confirmPassword
                ? errors.confirmPassword
                : ""
            }
          />

          <View style={styles.space} />

          <Button text="Save" loading={loading} onPress={handleSubmit} />

          {error ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        </>
      )}
    </Formik>
  );
}
const styles = StyleSheet.create({
  space: {
    height: 20,
    width: "100%",
  },
  errorText: {
    textAlign: "center",
    fontFamily: "DMSans_500Medium",
    color: Colors.error400,
    fontSize: 13,
    marginTop: 12,
  },
});
