import { Suspense, lazy } from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../constants/color";
import Loading from "../components/ui/Loading";

const ReportForm = lazy(() => import("../components/forms/ReportForm"));

export default function CreateReportScreen({ route }) {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Suspense fallback={<Loading />}>
        <ReportForm item={item} />
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
