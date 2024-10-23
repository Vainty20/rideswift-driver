import { Text, StyleSheet, ScrollView } from "react-native";
import { Colors } from "../constants/color";
import {
  fareMatrixData,
  exampleBreakdownData,
  totalFareAmountData,
} from "../constants/fareMatrix";
import Table from "../components/ui/Table";
import LottieView from "lottie-react-native";

export default function FareMatrixScreen() {
  return (
    <ScrollView style={styles.container}>
      <LottieView
        source={require("../assets/animations/farematrix.json")}
        style={styles.animation}
        autoPlay
        loop
      />

      <Table
        headers={["Distance (km)", "Amount"]}
        rows={fareMatrixData?.map((item) => [item.label, item.amount])}
      />

      <Text style={styles.title}>Example Breakdown of Fare:</Text>

      <Table
        headers={["Description", "Value"]}
        rows={exampleBreakdownData?.map((item) => [item.label, item.value])}
      />

      <Text style={styles.totalText}>
        Total of <Text style={styles.totalAmount}>{totalFareAmountData}</Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgBase100,
    paddingHorizontal: 16,
  },
  animation: {
    width: "100%",
    height: 300,
  },
  title: {
    marginVertical: 20,
    fontSize: 16,
    color: Colors.secondaryColor,
    fontFamily: "DMSans_700Bold",
    textAlign: "center",
    fontWeight: "600",
  },
  totalText: {
    alignSelf: "flex-end",
    margin: 12,
    color: Colors.secondaryColor,
    fontFamily: "DMSans_500Medium",
  },
  totalAmount: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
