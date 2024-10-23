import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../../constants/color";
import DefaultPic from "../../assets/default-profile.jpg";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function UserSettings({ user, pickImage, loading }) {
  return (
    <>
      <View style={{ position: "relative" }}>
        {loading ? (
          <ActivityIndicator size={150} color={Colors.primaryColor} />
        ) : (
          <>
            <Image
              style={styles.profilePicImage}
              source={user?.profilePic ? { uri: user.profilePic } : DefaultPic}
            />
            <Pressable
              style={styles.editBtn}
              onPress={pickImage}
              disabled={loading}
            >
              <Ionicons name="pencil" color={Colors.secondaryColor} size={25} />
            </Pressable>
          </>
        )}
      </View>
      <Text
        style={styles.username}
      >{`${user?.firstName} ${user?.lastName}`}</Text>
      <Text style={styles.email}>{user?.email}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  profilePicImage: {
    width: 150,
    height: 150,
    borderRadius: 150,
    marginBottom: 20,
    backgroundColor: Colors.secondaryColor,
    borderColor: Colors.secondaryColor,
    borderWidth: 2,
    shadowColor: Colors.secondaryColor,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  editBtn: {
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.bgBase100,
    borderColor: Colors.secondaryColor,
    borderWidth: 2,
    position: "absolute",
    right: 20,
    bottom: 20,
  },
  username: {
    fontSize: 20,
    color: Colors.textColor,
    fontFamily: "DMSans_500Medium",
    marginBottom: 6,
  },
  email: {
    fontSize: 18,
    color: Colors.textColor,
    fontFamily: "DMSans_500Medium",
    marginBottom: 40,
  },
});
