import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import { Colors } from "../constants/color";
import { changeProfilePic } from "../features/auth/authSlice";
import { pickImage } from "../utils/pickImage";
import AccountSettingList from "../components/ui/AccountSettingList";
import UserSettings from "../components/ui/UserSettings";

export default function SettingsScreen({ navigation }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const handlePickImage = async () => {
    setLoading(true);
    await pickImage(dispatch, changeProfilePic);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {user ? (
        <UserSettings
          user={user}
          pickImage={handlePickImage}
          loading={loading}
        />
      ) : null}
      <AccountSettingList navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.bgBase100,
    paddingHorizontal: 16,
  },
});
