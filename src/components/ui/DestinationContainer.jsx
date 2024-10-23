import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/color";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function DestinationContainer({
  pickupLocation,
  dropoffLocation,
}) {
  return (
    <View style={styles.destinationContainer}>
      <View style={styles.destinationRow}>
        <Ionicons
          name="radio-button-on"
          color={Colors.primaryColor}
          size={25}
        />
        <View>
          <Text style={styles.destinationLabel}>Pickup:</Text>
          <Text style={styles.destination}>{pickupLocation}</Text>
        </View>
      </View>
      <Ionicons
        name="arrow-down-outline"
        color={Colors.secondaryColor}
        size={24}
      />
      <View style={styles.destinationRow}>
        <Ionicons name="location" color={Colors.error400} size={25} />
        <View>
          <Text style={styles.destinationLabel}>Destination:</Text>
          <Text style={styles.destination}>{dropoffLocation}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  destinationContainer: {
    backgroundColor: Colors.bgBase200,
    borderRadius: 20,
    padding: 16,
  },
  destinationLabel: {
    fontSize: 17,
    marginBottom: 4,
    color: Colors.secondaryColor,
    fontFamily: "DMSans_700Bold",
  },
  destination: {
    fontSize: 15,
    maxWidth: "90%",
    color: Colors.textColor,
    fontFamily: "DMSans_500Medium",
  },
  destinationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
