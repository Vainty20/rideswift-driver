import { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Root as PopupRootProvider } from "react-native-popup-confirm-toast";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/config/firebaseConfig";
import { fetchCurrentUser, logOut } from "./src/features/auth/authSlice";
import {
  useFonts,
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_500Medium_Italic,
  DMSans_700Bold,
  DMSans_700Bold_Italic,
} from "@expo-google-fonts/dm-sans";
import { authRoutes } from "./src/routes/authRoutes";
import { appRoutes } from "./src/routes/appRoutes";
import store from "./src/features/store";
import LoadingScreen from "./src/screens/LoadingScreen";

const Stack = createNativeStackNavigator();

const MainApp = () => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_400Regular_Italic,
    DMSans_500Medium,
    DMSans_500Medium_Italic,
    DMSans_700Bold,
    DMSans_700Bold_Italic,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          await dispatch(fetchCurrentUser());
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Error fetching current user:", error);
          setIsLoggedIn(false);
        }
      } else {
        dispatch(logOut());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading || !fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaProvider>
      <PopupRootProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {(isLoggedIn ? appRoutes : authRoutes).map(
              ({ name, component, options }) => (
                <Stack.Screen
                  key={name}
                  name={name}
                  component={component}
                  options={options}
                />
              )
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PopupRootProvider>
    </SafeAreaProvider>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}
