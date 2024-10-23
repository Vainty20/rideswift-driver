import { View, StyleSheet, Text, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Formik } from "formik";
import { Timestamp } from "firebase/firestore";
import { Colors } from "../../constants/color";
import { register } from "../../features/auth/authSlice";
import { registerInitialValues } from "../../constants/initialValues";
import { registerValidationSchema } from "../../utils/validationSchema";
import { formatFirebaseAuthErrorMessage } from "../../utils/formatFirebaseAuthErrorMessage";
import { Popup } from "react-native-popup-confirm-toast";
import Loading from "../ui/Loading";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";
import PasswordInput from "../ui/PasswordInput";
import genderList from "../../data/genderList.json";
import useFetchData from "../../hooks/useFetchData";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function RegisterForm({ navigation }) {
  const dispatch = useDispatch();
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { data, loading: vehicleLoading } = useFetchData("vehicles");
  const [errorMessage, setErrorMessage] = useState(null);
  const [birthDate, setBirthDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const vehicleList = [
    { label: "Select Vehicle", value: "" },
    ...data.map((item) => ({
      label: item.vehicle,
      value: item.vehicle,
    })),
  ];

  const handleRegister = async (values, { resetForm }) => {
    try {
      const timestamp = Timestamp.fromDate(new Date(values.birthDate));
      await dispatch(register({ ...values, birthDate: timestamp })).unwrap();
      Popup.show({
        type: "success",
        title: "Success!",
        textBody:
          "Your account has been created! Please verify your email to log in. A verification email has been sent.",
        buttonText: "OK",
        iconEnabled: false,
        titleTextStyle: { fontFamily: "DMSans_700Bold", textAlign: "left" },
        descTextStyle: { fontFamily: "DMSans_400Regular", textAlign: "left" },
        okButtonStyle: { backgroundColor: Colors.primaryColor },
        timing: 5000,
        callback: () => Popup.hide(),
      });
      navigation.replace("Login");
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

  if (vehicleLoading) return <Loading />;
  return (
    <Formik
      initialValues={registerInitialValues}
      validationSchema={registerValidationSchema}
      onSubmit={handleRegister}
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
          <View style={styles.row}>
            <View style={styles.gridItem}>
              <Input
                maxLength={40}
                placeholder="First Name"
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                value={values.firstName}
                errorMessage={
                  touched.firstName && errors.firstName ? errors.firstName : ""
                }
              />
            </View>
            <View style={styles.gridItem}>
              <Input
                maxLength={40}
                placeholder="Last Name"
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                value={values.lastName}
                errorMessage={
                  touched.lastName && errors.lastName ? errors.lastName : ""
                }
              />
            </View>
          </View>
          <Input
            maxLength={40}
            placeholder="Email"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            errorMessage={touched.email && errors.email ? errors.email : ""}
          />
          <Input
            maxLength={11}
            placeholder="Mobile Number"
            keyboardType="numeric"
            onChangeText={handleChange("mobileNumber")}
            onBlur={handleBlur("mobileNumber")}
            value={values.mobileNumber}
            errorMessage={
              touched.mobileNumber && errors.mobileNumber
                ? errors.mobileNumber
                : ""
            }
          />
          <Pressable onPress={() => setShowPicker(true)}>
            <Input
              placeholder="Birthdate"
              value={
                values.birthDate
                  ? new Date(values.birthDate).toLocaleDateString()
                  : ""
              }
              editable={false}
              errorMessage={
                touched.birthDate && errors.birthDate ? errors.birthDate : ""
              }
            />
          </Pressable>
          {showPicker && (
            <DateTimePicker
              value={birthDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || birthDate;
                setShowPicker(false);
                setBirthDate(currentDate);
                handleChange("birthDate")(
                  currentDate.toISOString().split("T")[0]
                );
              }}
            />
          )}
          <View style={styles.row}>
            <View style={styles.gridItem}>
              <Select
                selectedValue={values.gender}
                onValueChange={handleChange("gender")}
                errorMessage={
                  touched.gender && errors.gender ? errors.gender : ""
                }
                items={genderList}
              />
            </View>
            <View style={styles.gridItem}>
              <Input
                placeholder="Weight in kg"
                keyboardType="numeric"
                maxLength={3}
                onChangeText={handleChange("weight")}
                onBlur={handleBlur("weight")}
                value={values.weight}
                errorMessage={
                  touched.weight && errors.weight ? errors.weight : ""
                }
              />
            </View>
          </View>
          <Select
            selectedValue={values.vehicle}
            onValueChange={handleChange("vehicle")}
            errorMessage={
              touched.vehicle && errors.vehicle ? errors.vehicle : ""
            }
            items={vehicleList}
          />
          <View style={styles.row}>
            <View style={styles.gridItem}>
              <Input
                maxLength={15}
                placeholder="Plate Number"
                onChangeText={handleChange("plateNumber")}
                onBlur={handleBlur("plateNumber")}
                value={values.plateNumber}
                errorMessage={
                  touched.plateNumber && errors.plateNumber
                    ? errors.plateNumber
                    : ""
                }
              />
            </View>
            <View style={styles.gridItem}>
              <Input
                placeholder="Max Load"
                keyboardType="numeric"
                maxLength={3}
                onChangeText={handleChange("maxLoad")}
                onBlur={handleBlur("maxLoad")}
                value={values.maxLoad}
                errorMessage={
                  touched.maxLoad && errors.maxLoad ? errors.maxLoad : ""
                }
              />
            </View>
          </View>
          <PasswordInput
            maxLength={50}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            errorMessage={
              touched.password && errors.password ? errors.password : ""
            }
          />
          <PasswordInput
            maxLength={50}
            placeholder="Confirm Password"
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
          <Button
            text="Register"
            loading={authLoading}
            onPress={handleSubmit}
          />
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
          <View style={styles.space} />
        </>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  space: {
    height: 20,
    width: 20,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%",
  },
  errorText: {
    textAlign: "center",
    fontFamily: "DMSans_500Medium",
    color: Colors.error400,
    fontSize: 13,
    marginTop: 12,
  },
});
