import { useEffect, useState } from "react";
import api from "../service/api.js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [stats, setStats] = useState({
    totalControls: 0,
    activeControls: 0,
    highRiskControls: 0,
    averageScore: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const res = await api.get("/controls/stats");
    setStats(res.data);
  };

  const chartData = [
    { name: "Total", value: stats.totalControls },
    { name: "Active", value: stats.activeControls },
    { name: "High Risk", value: stats.highRiskControls },
    { name: "Avg Score", value: stats.averageScore },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <div style={{ display: "flex", gap: "15px", marginBottom: "30px" }}>
        <div style={cardStyle}>Total Controls<br /><b>{stats.totalControls}</b></div>
        <div style={cardStyle}>Active Controls<br /><b>{stats.activeControls}</b></div>
        <div style={cardStyle}>High Risk<br /><b>{stats.highRiskControls}</b></div>
        <div style={cardStyle}>Average Score<br /><b>{stats.averageScore}</b></div>
      </div>

      <h2>Controls Overview</h2>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ccc",
  padding: "20px",
  width: "200px",
  textAlign: "center",
  borderRadius: "8px",
};

export default Dashboard;