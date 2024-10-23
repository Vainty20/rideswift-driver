import {
  View,
  Dimensions,
  Pressable,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { useDispatch } from "react-redux";
import { Popup } from "react-native-popup-confirm-toast";
import { logOut } from "../../features/auth/authSlice";
import { Colors } from "../../constants/color";
import settings from "../../data/settingList.json";
import SettingCard from "../cards/SettingCard";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function AccountSettingList({ navigation }) {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    Popup.show({
      type: "confirm",
      title: "Logout Confirmation",
      textBody: "Are you sure you want to logout?",
      buttonText: "Yes",
      confirmText: "No",
      iconEnabled: false,
      titleTextStyle: { fontFamily: "DMSans_700Bold", textAlign: "left" },
      descTextStyle: { fontFamily: "DMSans_400Regular", textAlign: "left" },
      okButtonStyle: { backgroundColor: Colors.error400 },
      buttonContentStyle: { flexDirection: "row-reverse" },
      callback: () => {
        dispatch(logOut());
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
        Popup.hide();
      },
      cancelCallback: () => {
        Popup.hide();
      },
    });
  };

  const keyExtractor = (item) => item.id;
  const renderItem = ({ item }) => (
    <SettingCard item={item} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={settings}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.flatListContent}
        ListFooterComponent={
          <Pressable style={styles.logoutButton} onPress={handleLogOut}>
            <View style={styles.settingLogoutIcon}>
              <Ionicons name="log-out-outline" color={Colors.light} size={25} />
            </View>
            <Text style={styles.logoutLabel}>Logout</Text>
          </Pressable>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width - 40,
    backgroundColor: Colors.bgBase200,
    padding: 6,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 12,
    paddingBottom: 10,
    marginTop: 12,
  },
  settingLogoutIcon: {
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.error400,
  },
  logoutLabel: {
    fontSize: 18,
    color: Colors.error400,
    fontFamily: "DMSans_500Medium",
  },
});
