import { Suspense, lazy } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Colors } from "../constants/color";
import Loading from "../components/ui/Loading";

const RegisterForm = lazy(() => import("../components/forms/RegisterForm"));

export default function RegisterScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Suspense fallback={<Loading />}>
        <RegisterForm navigation={navigation} />
      </Suspense>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgBase100,
    paddingHorizontal: 16,
  },
});
