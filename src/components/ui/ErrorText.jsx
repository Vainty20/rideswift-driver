import { Text, View, StyleSheet } from "react-native";
import { Colors } from "../../constants/color";

export default function ErrorText({ error }) {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.error400,
    backgroundColor: Colors.bgBase200,
  },
  errorText: {
    fontSize: 16,
    color: Colors.error400,
    fontFamily: "DMSans_500Medium",
  },
});
