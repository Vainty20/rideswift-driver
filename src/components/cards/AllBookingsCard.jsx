import { View, Text, StyleSheet } from "react-native";
import Button from "../ui/Button";
import DestinationContainer from "../ui/DestinationContainer";
import RideDetails from "../ui/RideDetails";
import UserInfo from "../ui/UserInfo";
import _ from "lodash";

export default function AllBookingsCard({ item, navigation }) {
  const handleGoBookConfirm = () => {
    navigation.push("BookingConfirm", {
      id: item.id,
    });
  };

  const handleGoSettingsDebounced = _.debounce(handleGoBookConfirm, 1000, {
    leading: true,
    trailing: false,
  });

  return (
    <View style={styles.card}>
      <UserInfo
        profilePic={item.userProfilePic}
        mobileNumber={item.userMobileNumber}
        name={item.userName}
      />
      <Text>{item.date}</Text>
      <DestinationContainer
        pickupLocation={item.pickupLocation}
        dropoffLocation={item.dropoffLocation}
      />
      <RideDetails
        rideDistance={item.rideDistance}
        ridePrice={item.ridePrice}
        rideTime={item.rideTime}
      />
      <Button text="View Booking" onPress={handleGoSettingsDebounced} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
