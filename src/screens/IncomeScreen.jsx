import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, Image, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Colors } from "../constants/color";
import { formatPrice } from "../utils/formatPrice";
import QrCode from "../assets/gcash.png";
import useFetchUserBookings from "../hooks/useFetchUserBookings";
import monthNames from "../data/monthsList.json";
import filterIncomeList from "../data/filterIncomeList.json";
import Button from "../components/ui/Button";
import Loading from "../components/ui/Loading";
import Select from "../components/ui/Select";
import ErrorText from "../components/ui/ErrorText";
import useIncomeData from "../hooks/useIncomeData";

export default function IncomeScreen() {
  const { bookings, loading } = useFetchUserBookings();
  const [modalVisible, setModalVisible] = useState(false);
  const {
    monthlyIncome,
    filterType,
    setFilterType,
    todayIncome,
    yesterdayIncome,
  } = useIncomeData(bookings);

  if (loading) return <Loading />;
  if (monthlyIncome.length === 0)
    return <ErrorText error="No booking data available." />;

  return (
    <View style={styles.container}>
      <Select
        selectedValue={filterType}
        onValueChange={(value) => setFilterType(value)}
        items={filterIncomeList}
      />
      <View style={styles.incomeContainer}>
        <Text style={styles.incomeText}>
          Yesterday's Income: {formatPrice(yesterdayIncome)}
        </Text>
        <Text style={styles.incomeText}>
          Today's Income: {formatPrice(todayIncome)}
        </Text>
      </View>
      <View style={styles.chartContainer}>
        {bookings ? (
          <BarChart
            data={{
              labels:
                filterType === "monthly"
                  ? monthNames
                  : filterType === "weekly"
                  ? monthlyIncome.map((data) => data.week)
                  : monthlyIncome.map((data) => data.day),
              datasets: [{ data: monthlyIncome.map((data) => data.income) }],
            }}
            width={Dimensions.get("window").width - 20}
            height={300}
            yAxisLabel="₱"
            chartConfig={{
              backgroundColor: Colors.bgBase100,
              backgroundGradientFrom: Colors.bgBase100,
              backgroundGradientTo: Colors.bgBase100,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 102, 204, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 102, 204, ${opacity})`,
            }}
          />
        ) : null}
      </View>

      <View style={styles.incomeContainer}>
        <Text style={styles.incomeText}>
          RideSwift's (40%) Profit: {formatPrice(todayIncome * 0.4)}
        </Text>
        <Text style={styles.incomeText}>
          Drivers (60%) Profit: {formatPrice(todayIncome * 0.6)}
        </Text>
      </View>

      <Button text="Pay Now!" disabled={todayIncome < 0 }onPress={() => setModalVisible(true)} />

      {todayIncome > 0 ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>You need to pay {formatPrice(todayIncome * 0.4)}</Text>
              <Image source={QrCode} style={styles.modalImage} />
              <View style={styles.buttonContainer}>
                <Button
                  text="Close"
                  variant="danger"
                  onPress={() => setModalVisible(false)}
                />
                <Button
                  text="Confirm"
                  variant="primary"
                  onPress={() => setModalVisible(false)}
                />
              </View>
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: Colors.bgBase100,
  },
  chartContainer: {
    marginVertical: 20,
  },
  incomeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  incomeText: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "DMSans_500Medium",
    color: Colors.textColor,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalImage: {
    width: 200,
    height: 300,
    resizeMode: "cover",
    marginBottom: 20,
  },
});
