import { useSelector } from "react-redux";
import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/color";
import AllBookingsList from "../features/booking/AllBookingsList";
import useCurrentLocation from "../hooks/useCurrentLocation";
import useFetchUserBookings from "../hooks/useFetchUserBookings";
import UserHome from "../components/ui/UserHome";
import Button from "../components/ui/Button";
import IconButton from "../components/ui/IconButton";
import Logo from "../assets/logo.png";
import LoadingScreen from "./LoadingScreen";
import _ from "lodash";

export default function HomeScreen({ navigation }) {
  const { user } = useSelector((state) => state.auth);
  const { bookings, loading: bookLoading } = useFetchUserBookings();
  const {
    location,
    locationCoordinates,
    loading: locationLoading,
  } = useCurrentLocation();

  const isLoading = locationLoading || bookLoading;

  if (isLoading) return <LoadingScreen />;

  const latestOngoingBooking = bookings.find(
    (booking) =>
      booking.bookStatus !== "dropoff" && booking.bookStatus !== "cancelled"
  );

  const handleGoSettings = () => {
    navigation.push("Settings");
  };

  const handleGoSettingsDebounced = _.debounce(handleGoSettings, 1000, {
    leading: true,
    trailing: false,
  });

  const handleGoViewCurrentBooking = () => {
    navigation.push("ViewCurrentBooking", {
      id: latestOngoingBooking.id,
    });
  };

  const handleGoViewCurrentBookingDebounced = _.debounce(
    handleGoViewCurrentBooking,
    1000,
    {
      leading: true,
      trailing: false,
    }
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={Logo} />
          <Text style={styles.title}>RideSwift</Text>
        </View>
        <IconButton
          onPress={handleGoSettingsDebounced}
          iconName="settings-outline"
          iconColor={Colors.secondaryColor}
          iconSize={30}
        />
      </View>

      {user ? <UserHome user={user} /> : null}

      {!latestOngoingBooking ? (
        <AllBookingsList
          user={user}
          navigation={navigation}
          location={location}
          locationCoordinates={locationCoordinates}
        />
      ) : (
        <Button
          text="View Current Booking"
          onPress={handleGoViewCurrentBookingDebounced}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    position: "relative",
    backgroundColor: Colors.bgBase100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 25,
    color: Colors.primaryColor,
    fontFamily: "DMSans_700Bold",
  },
});
