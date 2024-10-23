import { useState } from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { Popup } from "react-native-popup-confirm-toast";
import { Colors } from "../../constants/color";
import { formatFirebaseAuthErrorMessage } from "../../utils/formatFirebaseAuthErrorMessage";
import { editPersonalInfoValidationSchema } from "../../utils/validationSchema";
import { editPersonalInfo } from "../../features/auth/authSlice";
import Loading from "../ui/Loading";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";
import PlacesInput from "../ui/PlacesInput";
import useFetchData from "../../hooks/useFetchData";

export default function EditPersonalInfoForm() {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    user,
    loading: authLoading,
    error,
  } = useSelector((state) => state.auth);
  const { data, loading: vehicleLoading } = useFetchData("vehicles");

  const vehicleList = data.map((item) => ({
    label: item.vehicle,
    value: item.vehicle,
  }));
  const editPersonalInfoInitialValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    address: user?.address || "",
    weight: user?.weight ? String(user.weight) : "",
    vehicle: user?.vehicle || "",
    plateNumber: user?.plateNumber || "",
    maxLoad: user?.weight ? String(user.maxLoad) : "",
  };

  const handleEditInfo = async (values) => {
    try {
      await dispatch(editPersonalInfo(values)).unwrap();
      Popup.show({
        type: "success",
        title: "Success!",
        textBody: "Your personal information has been successfully updated.",
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
    }
  };

  if (vehicleLoading) return <Loading />;
  return (
    <Formik
      initialValues={editPersonalInfoInitialValues}
      validationSchema={editPersonalInfoValidationSchema}
      onSubmit={handleEditInfo}
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
            placeholder="First Name"
            onChangeText={handleChange("firstName")}
            onBlur={handleBlur("firstName")}
            value={values.firstName}
            errorMessage={
              touched.firstName && errors.firstName ? errors.firstName : ""
            }
          />
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

          <PlacesInput
            currentAddress={values.address}
            placeholder="Enter your address"
            onPlaceSelected={({ description }) => {
              handleChange("address")(description);
            }}
            errorMessage={
              touched.address && errors.address ? errors.address : ""
            }
          />

          <Input
            placeholder="Weight in kg"
            keyboardType="numeric"
            maxLength={3}
            onChangeText={handleChange("weight")}
            onBlur={handleBlur("weight")}
            value={values.weight}
            errorMessage={touched.weight && errors.weight ? errors.weight : ""}
          />

          <Select
            selectedValue={values.vehicle}
            onValueChange={handleChange("vehicle")}
            errorMessage={
              touched.vehicle && errors.vehicle ? errors.vehicle : ""
            }
            items={vehicleList}
          />

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

          <View style={styles.space} />

          <Button text="Save" loading={authLoading} onPress={handleSubmit} />

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
