import { View, Text, Image, StyleSheet } from "react-native";
import { greetings } from "../../utils/greetings";
import { formatPrice } from "../../utils/formatPrice";
import { Colors } from "../../constants/color";
import DefaultPic from "../../assets/default-profile.jpg";
import useIncomeData from "../../hooks/useIncomeData";
import useFetchUserBookings from "../../hooks/useFetchUserBookings";
import Loading from "./Loading";

export default function UserHome({ user }) {
  const { bookings, loading } = useFetchUserBookings();
  const { todayIncome, yesterdayIncome } = useIncomeData(bookings);

  if (loading) return <Loading />;

  return (
    <View style={styles.userContainer}>
      <View style={styles.headerUser}>
        <Image
          style={styles.profilePic}
          source={user?.profilePic ? { uri: user.profilePic } : DefaultPic}
        />
        <View>
          <Text style={styles.greetings}>{greetings()}</Text>
          <Text
            style={styles.username}
          >{`${user?.firstName} ${user?.lastName}`}</Text>
        </View>
      </View>
      <View style={styles.incomeContainer}>
        <View>
          <Text style={styles.incomeLabel}>Yesterday's Income:</Text>
          <Text style={styles.incomeValue}>{formatPrice(yesterdayIncome)}</Text>
        </View>
        <View>
          <Text style={styles.incomeLabel}>Today's Income:</Text>
          <Text style={styles.incomeValue}>{formatPrice(todayIncome)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    backgroundColor: Colors.primaryColor,
    marginVertical: 20,
    borderRadius: 20,
    padding: 20,
  },
  headerUser: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profilePic: {
    width: 50,
    height: 50,
    backgroundColor: Colors.light,
    borderColor: Colors.light,
    borderWidth: 2,
    borderRadius: 50,
  },
  greetings: {
    fontSize: 15,
    color: Colors.light,
    fontFamily: "DMSans_500Medium",
  },
  username: {
    fontSize: 20,
    color: Colors.light,
    fontFamily: "DMSans_700Bold",
  },
  incomeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  incomeLabel: {
    fontSize: 15,
    fontFamily: "DMSans_500Medium",
    color: Colors.light,
  },
  incomeValue: {
    fontSize: 25,
    fontFamily: "DMSans_500Medium",
    color: Colors.light,
  },
});
