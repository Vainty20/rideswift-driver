import { StyleSheet, Pressable } from "react-native";
import { Colors } from "../../constants/color";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function BackButtonFAB() {
  const navigation = useNavigation();

  return (
    <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" color={Colors.light} size={25} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    position: "absolute",
    zIndex: 20,
    top: 50,
    left: 20,
    padding: 12,
    borderRadius: 100,
    backgroundColor: Colors.primaryColor,
    borderColor: Colors.accent400,
    borderWidth: 1,
  },
});
