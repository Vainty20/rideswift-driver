import { useState } from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/color";
import useFetchAllBookings from "../../hooks/useFetchAllBookings";
import Loading from "../../components/ui/Loading";
import ErrorText from "../../components/ui/ErrorText";
import AllBookingsCard from "../../components/cards/AllBookingsCard";
import Input from "../../components/ui/Input";

export default function AllBookingsList({ user, navigation }) {
  const { bookings, loading, error } = useFetchAllBookings();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBookings = bookings.filter((item) => {
    const isPendingAndAvailable =
      item.bookStatus === "pending" &&
      !item.driverId &&
      parseInt(item.userWeight) + parseInt(user.weight) + 10 <
        parseInt(user.maxLoad);

    const matchesLocation = searchQuery
      ? item.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.dropoffLocation.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return isPendingAndAvailable && matchesLocation;
  });

  if (loading) return <Loading />;
  if (error) return <ErrorText error={error} />;

  if (filteredBookings.length === 0) {
    return <ErrorText error="There's no available bookings yet." />;
  }

  const keyExtractor = (item, index) => item.id || index.toString();
  const renderItem = ({ item }) => (
    <AllBookingsCard item={item} navigation={navigation} />
  );

  return (
    <>
      <Input
        placeholder="Search by location"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {filteredBookings.length === 0 && searchQuery ? (
        <View style={styles.noResultsView}>
          <Text style={styles.noResultsText}>
            We couldn't find any bookings for "{searchQuery}".
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredBookings}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  noResultsView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 18,
    color: Colors.textColor,
    fontStyle: "italic",
  },
});
