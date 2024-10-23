import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import BookingConfirmScreen from "../screens/BookingConfirmScreen";
import SettingsScreen from "../screens/SettingsScreen";
import IncomeScreen from "../screens/IncomeScreen";
import EditPersonalInfoScreen from "../screens/EditPersonalInfoScreen";
import BookingHistoryScreen from "../screens/BookingHistoryScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import ReportScreen from "../screens/ReportScreen";
import CreateReportScreen from "../screens/CreateReportScreen";
import FareMatrixScreen from "../screens/FareMatrixScreen";
import { ScreenOptions } from "../utils/screenOptions";

export const authRoutes = [
  { name: "Login", component: LoginScreen, options: { headerShown: false } },
  { name: "Register", component: RegisterScreen, options: { ...ScreenOptions, title: "Create your account" } },
  { name: "Home", component: HomeScreen, options: { headerShown: false } },
  { name: "BookingConfirm", component: BookingConfirmScreen, options: { headerShown: false } },
  { name: "Settings", component: SettingsScreen, options: { ...ScreenOptions, title: "Your Profile" } },
  { name: "Income", component: IncomeScreen, options: { ...ScreenOptions, title: "Income Screen" } },
  { name: "EditPersonalInfo", component: EditPersonalInfoScreen, options: { ...ScreenOptions, title: "Edit Personal Info" } },
  { name: "BookingHistory", component: BookingHistoryScreen, options: { ...ScreenOptions, title: "Booking History" } },
  { name: "ChangePassword", component: ChangePasswordScreen, options: { ...ScreenOptions, title: "Change Password" } },
  { name: "Report", component: ReportScreen, options: { ...ScreenOptions, title: "Reports" } },
  { name: "CreateReport", component: CreateReportScreen, options: { ...ScreenOptions, title: "Create Report" } },
  { name: "FareMatrix", component: FareMatrixScreen, options: { ...ScreenOptions, title: "Fare Matrix" } },
];