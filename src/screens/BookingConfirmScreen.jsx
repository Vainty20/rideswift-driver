import { useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { doc, runTransaction } from "firebase/firestore";
import { auth, db } from "../config/firebaseConfig";
import { Colors } from "../constants/color";
import Map from "../components/ui/Map";
import Button from "../components/ui/Button";
import UserInfo from "../components/ui/UserInfo";
import RideDetails from "../components/ui/RideDetails";
import DestinationContainer from "../components/ui/DestinationContainer";
import useCurrentLocation from "../hooks/useCurrentLocation";
import useCurrentBooking from "../hooks/useCurrentBooking";
import LoadingScreen from "./LoadingScreen";
import BackButtonFAB from "../components/ui/BackButtonFAB";
import _ from "lodash";

export default function BookingConfirmScreen({ route, navigation }) {
  const { id } = route.params;
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const { currentBooking, loading: currentBookingLoading } =
    useCurrentBooking(id);

  const {
    location,
    locationCoordinates,
    loading: locationLoading,
  } = useCurrentLocation();

  const handleBookStatus = async (status) => {
    if (loading) return;

    setLoading(true);

    try {
      const bookDocRef = doc(db, "book", id);

      await runTransaction(db, async (transaction) => {
        const bookDocSnapshot = await transaction.get(bookDocRef);
        if (!bookDocSnapshot.data().driverId) {
          transaction.update(bookDocRef, {
            driverId: auth.currentUser.uid,
            driverMobileNumber: user?.mobileNumber,
            driverName: `${user.firstName} ${user.lastName}`,
            driverProfilePic: user.profilePic || "",
            driverPlateNumber: user.plateNumber,
            driverVehicle: user.vehicle,
            bookStatus: status,
          });
        } else {
          transaction.update(bookDocRef, {
            bookStatus: status,
          });
          if (status === "dropoff") {
            navigation.replace("Home");
          }
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookStatusDebounced = _.debounce(handleBookStatus, 1000, {
    leading: true,
    trailing: false,
  });

  if (locationLoading || currentBookingLoading || !currentBooking)
    return <LoadingScreen />;

  if (currentBooking.bookStatus === "cancelled") {
    navigation.replace("Home");
    return null;
  }

  const destination =
    currentBooking.bookStatus === "to pickup"
      ? currentBooking.dropoffLocation
      : currentBooking.bookStatus === "confirmed"
      ? currentBooking.pickupLocation
      : currentBooking.dropoffLocation;

  const destinationCoords =
    currentBooking.bookStatus === "to pickup"
      ? currentBooking.dropoffCoords
      : currentBooking.bookStatus === "confirmed"
      ? currentBooking.pickupCoords
      : currentBooking.dropoffCoords;

  const statusMapping = {
    pending: { text: "Confirm", nextStatus: "confirmed" },
    confirmed: { text: "Pickup", nextStatus: "to pickup" },
    "to pickup": { text: "Dropoff", nextStatus: "dropoff" },
  };

  const { text, nextStatus } = statusMapping[currentBooking.bookStatus] || {};

  return (
    <SafeAreaView style={styles.container}>
      <Map
        origin={location}
        originCoords={locationCoordinates}
        destination={destination}
        destinationCoords={destinationCoords}
      />
      <BackButtonFAB />
      <View style={styles.contentContainer}>
        <View style={styles.homeContainer}>
          <UserInfo
            profilePic={currentBooking?.userProfilePic}
            name={currentBooking?.userName}
            mobileNumber={currentBooking?.userMobileNumber}
          />

          <DestinationContainer
            pickupLocation={currentBooking?.pickupLocation}
            dropoffLocation={currentBooking?.dropoffLocation}
          />

          <RideDetails
            rideDistance={currentBooking?.rideDistance}
            ridePrice={currentBooking?.ridePrice}
            rideTime={currentBooking?.rideTime}
          />

          {text ? (
            <Button
              text={text}
              loading={loading}
              onPress={() => handleBookStatusDebounced(nextStatus)}
            />
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: Colors.bgBase100,
  },
  contentContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    margin: 12,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  homeContainer: {
    backgroundColor: Colors.bgBase100,
    width: "100%",
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },
});
