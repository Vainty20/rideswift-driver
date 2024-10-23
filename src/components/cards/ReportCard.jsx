import { View, Text, Image, StyleSheet } from "react-native";
import { Colors } from "../../constants/color";
import UserInfo from "../ui/UserInfo";

export default function ReportCard({ item }) {
  return (
    <View style={styles.card}>
      <UserInfo
        profilePic={item.userProfilePic}
        mobileNumber={item.userMobileNumber}
        name={item.userName}
      />
      {item.images.length > 0 && (
        <Image source={{ uri: item.images[0] }} style={styles.image} />
      )}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.betweenContainer}>
        <Text style={styles.date}>{item.createdAt}</Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  betweenContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginVertical: 12,
  },
  title: {
    fontSize: 18,
    marginTop: 6,
    fontFamily: "DMSans_700Bold",
    color: Colors.textColor,
  },
  description: {
    fontSize: 18,
    marginTop: 2,
    fontFamily: "DMSans_500Medium",
    color: Colors.textColor,
  },
  status: {
    width: "auto",
    padding: 5,
    borderRadius: 5,
    fontFamily: "DMSans_400Regular",
    color: Colors.light,
    backgroundColor: Colors.secondaryColor,
  },
  date: {
    fontSize: 13,
    fontFamily: "DMSans_400Regular",
    color: Colors.textColor,
  },
});
