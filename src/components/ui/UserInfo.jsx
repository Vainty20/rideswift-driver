import { View, Text, Image, StyleSheet } from "react-native";
import { Colors } from "../../constants/color";
import DefaultPic from "../../assets/default-profile.jpg";

export default function UserInfo({
  profilePic,
  mobileNumber,
  name,
  isDarkBackground,
}) {
  const textColor = isDarkBackground ? Colors.light : Colors.textColor;

  return (
    <View style={styles.header}>
      <View style={styles.userContainer}>
        <Image
          style={styles.profilePic}
          source={profilePic ? { uri: profilePic } : DefaultPic}
        />
        <View>
          <Text style={[styles.mobileNumber, { color: textColor }]}>
            {mobileNumber}
          </Text>
          <Text style={[styles.username, { color: textColor }]}>
            {name}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profilePic: {
    width: 50,
    height: 50,
    backgroundColor: Colors.light, 
    borderRadius: 50,
  },
  mobileNumber: {
    fontSize: 15,
    fontFamily: "DMSans_500Medium",
  },
  username: {
    fontSize: 25,
    fontFamily: "DMSans_700Bold",
  },
  plateNumberLabel: {
    fontSize: 15,
    fontFamily: "DMSans_500Medium",
  },
  plateNumber: {
    fontSize: 25,
    fontFamily: "DMSans_700Bold",
    textAlign: "right",
  },
});
