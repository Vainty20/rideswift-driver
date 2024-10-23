import { View, Text, StyleSheet } from "react-native";
import { formatDate } from "../../utils/formatDate";
import { Colors } from "../../constants/color";
import Button from "../ui/Button";
import RideDetails from "../ui/RideDetails";
import UserInfo from "../ui/UserInfo";
import DestinationContainer from "../ui/DestinationContainer";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function BookingCard({ item, onReport }) {
  return (
    <View style={styles.card}>
      <UserInfo
        profilePic={item.userProfilePic}
        mobileNumber={item.userMobileNumber}
        name={item.userName}
      />
      <View style={styles.betweenContainer}>
        <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
        {item.rating > 0 ? (
          <View style={styles.starIcon}>
            <Ionicons name="star" size={20} color="orange" />
            <Text style={styles.starLabel}>({item.rating})</Text>
          </View>
        ) : (
          <Text style={styles.notRated}>Not rated yet.</Text>
        )}
      </View>
      <DestinationContainer
        pickupLocation={item.pickupLocation}
        dropoffLocation={item.dropoffLocation}
      />
      <RideDetails
        rideDistance={item.rideDistance}
        ridePrice={item.ridePrice}
        rideTime={item.rideTime}
      />
      <Button text="Report!" variant="danger" onPress={onReport} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  betweenContainer: {
    marginVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    fontSize: 13,
    fontFamily: "DMSans_400Regular",
    color: Colors.textColor,
  },
  notRated: {
    fontSize: 13,
    fontFamily: "DMSans_400Regular",
    color: Colors.error400,
  },
  starIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  starLabel: {
    fontSize: 13,
    fontFamily: "DMSans_400Regular",
    color: "orange",
  },
});
