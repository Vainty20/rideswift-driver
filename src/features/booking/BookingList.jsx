import { FlatList } from "react-native";
import useFetchUserBookings from "../../hooks/useFetchUserBookings";
import Loading from "../../components/ui/Loading";
import ErrorText from "../../components/ui/ErrorText";
import BookingCard from "../../components/cards/BookingHistoryCard";
import _ from "lodash";

export default function BookingList({ navigation }) {
  const { bookings, loading, error } = useFetchUserBookings();

  const filteredBookings = bookings.filter(
    (book) => book.bookStatus === "dropoff"
  );

  if (loading) return <Loading />;
  if (error) return <ErrorText error={error} />;
  if (filteredBookings.length === 0)
    return <ErrorText error="You have no bookings yet." />;

  const handleGoReport = (item) => {
    navigation.push("CreateReport", { item });
  };

  const handleGoReportDebounced = _.debounce(handleGoReport, 1000, {
    leading: true,
    trailing: false,
  });

  const keyExtractor = (item, index) => item.id || index.toString();
  const renderItem = ({ item }) => (
    <BookingCard item={item} onReport={() => handleGoReportDebounced(item)} />
  );

  return (
    <FlatList
      data={filteredBookings}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
}
