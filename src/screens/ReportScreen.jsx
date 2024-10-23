import { Suspense, lazy } from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../constants/color";
import Loading from "../components/ui/Loading";

const ReportList = lazy(() => import("../features/reports/ReportList"));

export default function ReportScreen() {
  return (
    <View style={styles.container}>
      <Suspense fallback={<Loading />}>
        <ReportList />
      </Suspense>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgBase100,
    paddingHorizontal: 16,
  },
});
