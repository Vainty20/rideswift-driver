import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/color";

export default function Table({ headers = [], rows = [] }) {
  return (
    <View style={styles.table}>
      <View style={styles.row}>
        {headers.map((header, index) => (
          <Text key={index} style={styles.header}>
            {header}
          </Text>
        ))}
      </View>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, cellIndex) => (
            <Text key={cellIndex} style={styles.cell}>
              {cell}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontFamily: "DMSans_700Bold",
    textAlign: "left",
    color: Colors.light,
    backgroundColor: Colors.primaryColor,
  },
  cell: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontFamily: "DMSans_500Medium",
    textAlign: "left",
    color: Colors.textColor,
    borderBottomWidth: 1,
    borderBottomColor: Colors.bgBase200,
  },
});
