import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/color";
import LoginForm from "../components/forms/LoginForm";
import Logo from "../assets/logo.png";
import _ from "lodash";

export default function LoginScreen({ navigation }) {
  const handleGoRegister = () => {
    navigation.push("Register");
  };

  const handleGoRegisterDebounced = _.debounce(handleGoRegister, 1000, {
    leading: true,
    trailing: false,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={Logo} />
        <Text style={styles.greetings}>Beat the traffic with RideSwift</Text>
      </View>
      <View style={styles.loginForm}>
        <Text style={styles.title}>RideSwift Drivers</Text>
        <Text style={styles.subTitle}>Login to continue</Text>
        <LoginForm navigation={navigation} />
        <View style={styles.registerContainer}>
          <Text style={styles.text}>Don't have an account?</Text>
          <Pressable onPress={handleGoRegisterDebounced}>
            <Text style={styles.link}>Register</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.primaryColor,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 300,
    height: 300,
  },
  loginForm: {
    width: "100%",
    padding: 16,
    paddingBottom: 50,
    backgroundColor: "white",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  greetings: {
    fontSize: 25,
    color: Colors.light,
    textAlign: "center",
    fontFamily: "DMSans_700Bold",
  },
  title: {
    fontSize: 32,
    color: Colors.primaryColor,
    fontFamily: "DMSans_700Bold",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "semibold",
    color: Colors.secondaryColor,
    fontFamily: "DMSans_400Regular",
  },
  text: {
    color: Colors.secondaryColor,
    fontFamily: "DMSans_400Regular",
    fontSize: 15,
  },
  forgetPassword: {
    alignSelf: "flex-end",
  },
  registerContainer: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  link: {
    color: Colors.link,
    fontFamily: "DMSans_700Bold",
    fontSize: 15,
    marginLeft: 5,
  },
});
