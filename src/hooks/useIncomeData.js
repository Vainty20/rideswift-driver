import { useState, useEffect } from "react";
import monthNames from "../data/monthsList.json";

export default function useIncomeData(bookings) {
  const [monthlyIncome, setMonthlyIncome] = useState([]);
  const [filterType, setFilterType] = useState("daily");
  const [todayIncome, setTodayIncome] = useState(0);
  const [yesterdayIncome, setYesterdayIncome] = useState(0);

  useEffect(() => {
    const incomeData = {};
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    let todayIncomeTotal = 0;
    let yesterdayIncomeTotal = 0;

    if (filterType === "monthly") {
      monthNames.forEach((month, index) => {
        incomeData[`${index}`] = 0;
      });

      bookings.forEach((booking) => {
        const bookingDate = booking.createdAt.toDate();
        const monthIndex = bookingDate.getMonth();

        incomeData[`${monthIndex}`] += booking.ridePrice;

        if (bookingDate.toDateString() === today.toDateString()) {
          todayIncomeTotal += booking.ridePrice;
        } else if (bookingDate.toDateString() === yesterday.toDateString()) {
          yesterdayIncomeTotal += booking.ridePrice;
        }
      });

      setTodayIncome(todayIncomeTotal);
      setYesterdayIncome(yesterdayIncomeTotal);

      const chartData = Object.keys(incomeData).map((key) => ({
        month: monthNames[parseInt(key)],
        income: incomeData[key],
      }));
      setMonthlyIncome(chartData);
    } else if (filterType === "weekly") {
      const weekIncomeData = {};
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);

      bookings.forEach((booking) => {
        const bookingDate = booking.createdAt.toDate();
        if (bookingDate >= startDate) {
          const weekIndex = Math.floor((bookingDate.getDate() - 1) / 7);
          weekIncomeData[`${weekIndex}`] =
            (weekIncomeData[`${weekIndex}`] || 0) + booking.ridePrice;
        }

        if (bookingDate.toDateString() === today.toDateString()) {
          todayIncomeTotal += booking.ridePrice;
        } else if (bookingDate.toDateString() === yesterday.toDateString()) {
          yesterdayIncomeTotal += booking.ridePrice;
        }
      });

      setTodayIncome(todayIncomeTotal);
      setYesterdayIncome(yesterdayIncomeTotal);

      const weekChartData = Object.keys(weekIncomeData).map((key) => ({
        week: `Week ${parseInt(key) + 1}`,
        income: weekIncomeData[key],
      }));
      setMonthlyIncome(weekChartData);
    } else if (filterType === "daily") {
      const dayIncomeData = {};
      for (let i = 0; i < 2; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const formattedDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        dayIncomeData[formattedDate] = 0;  
      }

      bookings.forEach((booking) => {
        const bookingDate = booking.createdAt
          .toDate()
          .toLocaleDateString("en-US", { month: "short", day: "numeric" });
          
        dayIncomeData[bookingDate] =
          (dayIncomeData[bookingDate] || 0) + booking.ridePrice;

        if (bookingDate === today.toLocaleDateString("en-US", { month: "short", day: "numeric" })) {
          todayIncomeTotal += booking.ridePrice;
        } else if (bookingDate === yesterday.toLocaleDateString("en-US", { month: "short", day: "numeric" })) {
          yesterdayIncomeTotal += booking.ridePrice;
        }
      });

      setTodayIncome(todayIncomeTotal);
      setYesterdayIncome(yesterdayIncomeTotal);

      const dayChartData = Object.keys(dayIncomeData).map((key) => ({
        day: key,
        income: dayIncomeData[key],
      }));
      setMonthlyIncome(dayChartData);
    }
  }, [bookings, filterType]);

  return {
    monthlyIncome,
    filterType,
    setFilterType,
    todayIncome,
    yesterdayIncome,
  };
}
