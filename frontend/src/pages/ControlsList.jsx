import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api.js";
import ControlForm from "./ControlForm.jsx";

function ControlsList() {
  const [controls, setControls] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const navigate = useNavigate();
  const recordsPerPage = 5;

  useEffect(() => {
    fetchControls();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchControls();
    }, 500);

    return () => clearTimeout(timer);
  }, [search, status, fromDate, toDate]);

  const fetchControls = async () => {
    try {
      const params = {};

      if (search) params.q = search;
      if (status) params.status = status;
      if (fromDate) params.fromDate = fromDate;
      if (toDate) params.toDate = toDate;

      const res = await api.get("/controls/filter", { params });

      setControls(res.data);
      setCurrentPage(1);
    } catch (error) {
      console.error("FETCH ERROR:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this control?")) return;

    try {
      await api.delete(`/controls/${id}`);
      alert("Deleted successfully");
      fetchControls();
    } catch (error) {
      console.error("DELETE ERROR:", error);
      alert("Error deleting control");
    }
  };

  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setFromDate("");
    setToDate("");
  };

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = controls.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(controls.length / recordsPerPage);

  return (
  <div className="page-container">
      <h1>Internal Controls</h1>

      <button onClick={() => navigate("/dashboard")}>Dashboard</button>

      <br />
      <br />

      <ControlForm onSuccess={fetchControls} />

      <div className="filter-section" style={{ margin: "20px" }}>
        <input
          placeholder="Search by title, department, owner, ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "250px" }}
        />

        <div
          className="button-row"
          style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          margin: "15px 0"
         }}
       >
          <button
            onClick={() => navigate("/analytics")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Analytics
          </button>

          <button
            onClick={() => navigate("/ai-panel")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Open AI Panel
          </button>
        </div>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

        <button onClick={clearFilters}>Clear</button>
      </div>

      {controls.length === 0 ? (
        <h3>No data</h3>
      ) : (
        <>
          <table border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Department</th>
                <th>Owner</th>
                <th>Status</th>
                <th>Risk</th>
                <th>Score</th>
                <th>Review Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentRecords.map((c) => (
                <tr key={c.id}>
                  <td>{c.controlId}</td>
                  <td>{c.title}</td>
                  <td>{c.department}</td>
                  <td>{c.owner}</td>
                  <td>{c.status}</td>
                  <td>{c.riskLevel}</td>
                  <td>{c.effectivenessScore}</td>
                  <td>{c.reviewDate}</td>

                  <td>
                    <button
                      onClick={() =>
                        navigate("/detail", { state: { control: c } })
                      }
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        navigate("/detail", { state: { control: c } })
                      }
                      style={{ marginLeft: "5px" }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(c.id)}
                      style={{ marginLeft: "5px" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <br />

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          <span style={{ margin: "0 10px" }}>
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </>
      )}
    </div>
  );
}

export default ControlsList;