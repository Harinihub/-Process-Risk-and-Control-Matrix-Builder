import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

function Analytics() {
  const [controls, setControls] = useState([]);
  const [period, setPeriod] = useState("all");

  useEffect(() => {
    fetchControls();
  }, []);

  const fetchControls = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/controls/all");
      setControls(response.data);
    } catch (error) {
      console.error("Error fetching analytics data", error);
    }
  };

  const filterByPeriod = () => {
    if (period === "all") return controls;

    const today = new Date();

    return controls.filter((control) => {
      if (!control.reviewDate) return false;

      const reviewDate = new Date(control.reviewDate);
      const diffDays = Math.floor((today - reviewDate) / (1000 * 60 * 60 * 24));

      if (period === "7") return diffDays <= 7;
      if (period === "30") return diffDays <= 30;
      if (period === "90") return diffDays <= 90;

      return true;
    });
  };

  const filteredControls = filterByPeriod();

  const riskData = ["LOW", "MEDIUM", "HIGH"].map((risk) => ({
    name: risk,
    value: filteredControls.filter((c) => c.riskLevel === risk).length,
  }));

  const statusData = ["ACTIVE", "INACTIVE"].map((status) => ({
    name: status,
    value: filteredControls.filter((c) => c.status === status).length,
  }));

  const departmentData = Object.values(
    filteredControls.reduce((acc, control) => {
      const dept = control.department || "Unknown";
      if (!acc[dept]) {
        acc[dept] = { department: dept, count: 0 };
      }
      acc[dept].count += 1;
      return acc;
    }, {})
  );

  const scoreData = filteredControls.map((control) => ({
    title: control.title,
    score: control.effectivenessScore,
  }));

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ textAlign: "center" }}>Analytics Dashboard</h1>

      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <label style={{ marginRight: "10px", fontWeight: "bold" }}>
          Select Period:
        </label>

        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          style={{ padding: "8px", borderRadius: "6px" }}
        >
          <option value="all">All Time</option>
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
        </select>
      </div>

      <div
        className="analytics-grid"
        style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "30px"
        }}
      >
        <div style={cardStyle}>
          <h3>Risk Level Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={riskData} dataKey="value" nameKey="name" outerRadius={100} label>
                {riskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={cardStyle}>
          <h3>Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Controls" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={cardStyle}>
          <h3>Controls by Department</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <XAxis dataKey="department" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Controls" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={cardStyle}>
          <h3>Effectiveness Score</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={scoreData}>
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" name="Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

export default Analytics;