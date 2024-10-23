import { Pressable, StyleSheet } from "react-native";
import { Colors } from "../../constants/color";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function IconButton({
  onPress,
  iconName,
  iconColor,
  iconSize,
  style,
}) {
  return (
    <Pressable onPress={onPress} style={[styles.iconBtn, style]}>
      <Ionicons
        name={iconName}
        color={iconColor || Colors.secondaryColor}
        size={iconSize || 30}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconBtn: {
    backgroundColor: Colors.bgBase100,
    borderColor: Colors.secondaryColor,
    borderRadius: 100,
    borderWidth: 1,
    padding: 6,
  },
});
