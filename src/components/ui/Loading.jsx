import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/color";
import LottieView from "lottie-react-native";

export default function Loading() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Loading</Text>
      <LottieView
        source={require("../../assets/animations/loading.json")}
        style={styles.animation}
        autoPlay
        loop
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: Colors.textColor,
    fontFamily: "DMSans_700Bold",
  },
  animation: {
    width: 200,
    height: 80,
  },
});
