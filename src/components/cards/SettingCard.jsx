import { View, Text, Pressable, StyleSheet } from "react-native";
import { Colors } from "../../constants/color";
import Ionicons from "react-native-vector-icons/Ionicons";
import _ from "lodash";

export default function SettingCard({ item, navigation }) {
  const handleGoPath = () => {
    navigation.push(item.path);
  };

  const handleGoPathDebounced = _.debounce(handleGoPath, 2000, {
    leading: true,
    trailing: false,
  });

  return (
    <Pressable style={styles.settingItem} onPress={handleGoPathDebounced}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <View style={styles.settingIcon}>
          <Ionicons name={item.icon} color={Colors.light} size={25} />
        </View>
        <Text style={styles.label}>{item.label}</Text>
      </View>

      <Ionicons
        name="chevron-forward-outline"
        color={Colors.secondaryColor}
        size={30}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.secondaryColor,
  },
  label: {
    fontSize: 18,
    color: Colors.secondaryColor,
    fontFamily: "DMSans_500Medium",
  },
});
