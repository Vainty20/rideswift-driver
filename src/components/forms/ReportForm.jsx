import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Formik } from "formik";
import { Colors } from "../../constants/color";
import { reportValidationSchema } from "../../utils/validationSchema";
import { createReport } from "../../features/reports/reportsSlice";
import { Popup } from "react-native-popup-confirm-toast";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

export default function ReportForm({ item }) {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [images, setImages] = useState([]);

  const { loading } = useSelector((state) => state.reports);

  const reportInitialValues = {
    images: [],
    title: "",
    description: "",
  };

  const handleEditInfo = async (values, { resetForm }) => {
    try {
      const reportData = {
        ...values,
        images,
        item,
      };

      await dispatch(createReport(reportData)).unwrap();
      resetForm();
      setImages([]);

      Popup.show({
        type: "success",
        title: "Success!",
        textBody: "Your report has been successfully submitted.",
        buttonText: "OK",
        iconEnabled: false,
        titleTextStyle: { fontFamily: "DMSans_700Bold", textAlign: "left" },
        descTextStyle: { fontFamily: "DMSans_400Regular", textAlign: "left" },
        okButtonStyle: { backgroundColor: Colors.primaryColor },
        timing: 5000,
        callback: () => Popup.hide(),
      });
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Create Report failed:", error.message);
    }
  };

  const pickImage = async () => {
    if (images.length >= 5) {
      setErrorMessage(
        "Image Limit Reached. You can only upload up to 5 images."
      );
      Popup.show({
        type: "danger",
        title: "Image Limit Reached",
        textBody: "You can only upload up to 5 images.",
        buttonText: "OK",
        iconEnabled: false,
        titleTextStyle: { fontFamily: "DMSans_700Bold", textAlign: "left" },
        descTextStyle: { fontFamily: "DMSans_400Regular", textAlign: "left" },
        okButtonStyle: { backgroundColor: Colors.error400 },
        timing: 5000,
        callback: () => Popup.hide(),
      });
      return;
    }

    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Popup.show({
        type: "danger",
        title: "Permission Required",
        textBody: "Permission to access camera roll is required!",
        buttonText: "OK",
        iconEnabled: false,
        titleTextStyle: { fontFamily: "DMSans_700Bold", textAlign: "left" },
        descTextStyle: { fontFamily: "DMSans_400Regular", textAlign: "left" },
        okButtonStyle: { backgroundColor: Colors.error400 },
        timing: 5000,
        callback: () => Popup.hide(),
      });
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      const imageUri = selectedImage.uri;

      setImages((prevImages) => [...prevImages, imageUri]);
    }
  };

  return (
    <Formik
      initialValues={reportInitialValues}
      validationSchema={reportValidationSchema}
      onSubmit={handleEditInfo}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        resetForm,
      }) => (
        <>
          {images.length > 0 && (
            <FlatList
              data={images}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.images}
              renderItem={({ item }) => (
                <Image source={{ uri: item }} style={styles.selectedImage} />
              )}
            />
          )}

          <TouchableOpacity
            onPress={pickImage}
            disabled={images.length >= 5}
            style={styles.imagePicker}
          >
            <Ionicons
              name="images-outline"
              color={Colors.secondaryColor}
              size={45}
            />
            <Text style={styles.imagePickerText}>
              {images.length >= 5 ? "Image Limit Reached" : "Pick an Image"}
            </Text>
          </TouchableOpacity>

          <Input
            maxLength={50}
            placeholder="Report Title"
            onChangeText={handleChange("title")}
            onBlur={handleBlur("title")}
            value={values.title}
            errorMessage={touched.title && errors.title ? errors.title : ""}
          />
          <Input
            maxLength={1000}
            placeholder="Description"
            onChangeText={handleChange("description")}
            onBlur={handleBlur("description")}
            value={values.description}
            errorMessage={
              touched.description && errors.description
                ? errors.description
                : ""
            }
          />

          <View style={styles.space} />

          <Button
            text="Submit Report"
            loading={loading}
            onPress={handleSubmit}
          />

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
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
  imagePicker: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: Colors.bgBase200,
    borderColor: Colors.secondaryColor,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  imagePickerText: {
    color: Colors.textColor,
    fontFamily: "DMSans_500Medium",
    fontSize: 16,
  },
  images: {
    maxHeight: 150,
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  errorText: {
    textAlign: "center",
    fontFamily: "DMSans_500Medium",
    color: Colors.error400,
    fontSize: 13,
    marginTop: 12,
  },
});
