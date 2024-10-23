import { View, Text, StyleSheet } from "react-native";
import { formatPrice } from "../../utils/formatPrice";
import { Colors } from "../../constants/color";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function RideDetails({ ridePrice, rideDistance, rideTime, isDarkBackground }) {
  const textColor = isDarkBackground ? Colors.light : Colors.textColor;

  return (
    <View style={styles.container}>
      <View style={styles.rideRow}>
        <View style={styles.rideRow}>
          <Ionicons
            name="speedometer-outline"
            color={textColor}
            size={20}
          />
          <Text style={[styles.rideLabel, { color: textColor }]}>{rideDistance}</Text>
        </View>
        <View style={styles.rideRow}>
          <Ionicons name="time-outline" color={textColor} size={20} />
          <Text style={[styles.rideLabel, { color: textColor }]}>{rideTime}</Text>
        </View>
      </View>
      <Text style={[styles.price, { color: textColor }]}>{formatPrice(ridePrice)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  rideRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  rideLabel: {
    fontSize: 15,
    fontFamily: "DMSans_500Medium",
  },
  price: {
    fontSize: 25,
    fontFamily: "DMSans_700Bold",
  },
});
