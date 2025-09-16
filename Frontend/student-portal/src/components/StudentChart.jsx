import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentSummary } from "../redux/studentSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function StudentSummaryChart(){
  const dispatch = useDispatch();
  const { summary, isLoading, error } = useSelector(
    (state) => state.students
  );

  useEffect(() => {
    dispatch(fetchStudentSummary());
  }, [dispatch]);

  if (isLoading) return <p>Loading chart...</p>;
  if (error) return <p>Error: {error}</p>;

  const labels = Array.isArray(summary?.labels) ? summary.labels : [];
  const counts = Array.isArray(summary?.counts)
    ? summary.counts
    : Array.isArray(summary?.count)
    ? summary.count
    : [];

   const chartData = labels.map((label, index) => ({
    year: label,
    count: counts[index] || 0,
  }));


  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="green" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudentSummaryChart;
