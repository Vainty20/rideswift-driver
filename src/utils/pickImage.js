import * as ImagePicker from "expo-image-picker";
import { Popup } from "react-native-popup-confirm-toast";
import { Colors } from "../constants/color";

export const pickImage = async (dispatch, changeProfilePic) => {
  let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
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
    aspect: [2, 2],
    quality: 1,
  });

  if (!result.cancelled && result.assets && result.assets.length > 0) {
    const selectedImage = result.assets[0];
    const imageUri = selectedImage.uri;

    Popup.show({
      type: "confirm",
      title: "Change Profile Picture",
      textBody: "Do you want to change your profile picture?",
      buttonText: "OK",
      cancelButtonText: "Cancel",
      iconEnabled: false,
      titleTextStyle: { fontFamily: "DMSans_700Bold", textAlign: "left" },
      descTextStyle: { fontFamily: "DMSans_400Regular", textAlign: "left" },
      okButtonStyle: { backgroundColor: Colors.primaryColor },
      callback: async () => {
        const blob = await fetch(imageUri).then((response) => response.blob());

        dispatch(changeProfilePic(blob))
          .unwrap()
          .then(() => {
            Popup.show({
              type: "success",
              title: "Profile Picture Updated",
              textBody: "Your profile picture has been updated.",
              buttonText: "OK",
              iconEnabled: false,
              titleTextStyle: { fontFamily: "DMSans_700Bold", textAlign: "left" },
              descTextStyle: { fontFamily: "DMSans_400Regular", textAlign: "left" },
              okButtonStyle: { backgroundColor: Colors.primaryColor },
              timing: 5000,
              callback: () => Popup.hide(),
            });
          })
          .catch((error) => {
            Popup.show({
              type: "danger",
              title: "Error",
              textBody: error.message,
              buttonText: "OK",
              iconEnabled: false,
              titleTextStyle: { fontFamily: "DMSans_700Bold", textAlign: "left" },
              descTextStyle: { fontFamily: "DMSans_400Regular", textAlign: "left" },
              okButtonStyle: { backgroundColor: Colors.error400 },
              timing: 5000,
              callback: () => Popup.hide(),
            });
          });
      },
      cancelCallback: () => {
        Popup.hide();
      },
    });
  }
};
