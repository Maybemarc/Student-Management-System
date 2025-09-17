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

function StudentSummaryChart() {
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

  if (!labels.length || !counts.length) {
    return (
      <div>
        <h3>No student data available</h3>
        <p>
          There are currently no students enrolled. Add student records to see
          the distribution chart.
        </p>
      </div>
    );
  }

  const chartData = labels.map((label, index) => ({
    year: label,
    count: counts[index] || 0,
  }));

  return (
    <div style={{ width: "100%", height: 550 }}>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{ top: 100, right: 1, left: 1, bottom: 1 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis allowDecimals={false} />
          <Tooltip formatter={(value) => [`${value} students`, "Count"]} />
          <Bar dataKey="count" fill="red" />
        </BarChart>
      </ResponsiveContainer>

      <div style={{ marginTop: "2rem" }}className="chart-para" >
        <h3>Student Distribution</h3>
        <p>
          <strong>Total Students:</strong> {counts.reduce((a, b) => a + b, 0)}
        </p>
        <p>
          This chart represents the number of students enrolled each year.
          It helps visualize growth trends and identify years with higher or
          lower admissions, allowing admins to make informed decisions about
          resource planning and student management.
        </p>
      </div>
    </div>
  );
}

export default StudentSummaryChart;
