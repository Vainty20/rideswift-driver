import { Suspense, lazy } from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../constants/color";
import Loading from "../components/ui/Loading";

const BookingList = lazy(() => import("../features/booking/BookingList"));

export default function BookingHistoryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Suspense fallback={<Loading />}>
        <BookingList navigation={navigation} />
      </Suspense>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgBase100,
    paddingHorizontal: 16,
  },
});
