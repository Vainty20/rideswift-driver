import { useEffect } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchReports } from "../reports/reportsSlice";
import Loading from "../../components/ui/Loading";
import ErrorText from "../../components/ui/ErrorText";
import ReportCard from "../../components/cards/ReportCard";

export default function ReportList() {
  const dispatch = useDispatch();
  const { reports, loading, error } = useSelector((state) => state.reports);

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <ErrorText error={error} />;
  if (reports.length === 0)
    return <ErrorText error="No reports available yet." />;

  const keyExtractor = (item, index) => item.id || index.toString();
  const renderItem = ({ item }) => <ReportCard item={item} />;

  return (
    <FlatList
      data={reports}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
}
