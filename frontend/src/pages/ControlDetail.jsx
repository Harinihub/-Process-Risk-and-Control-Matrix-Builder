import { useLocation, useNavigate } from "react-router-dom";
import api from "../service/api.js";

function ControlDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const control = state?.control;

  if (!control) {
    return <h2>No control selected</h2>;
  }

  const handleDelete = async () => {
    await api.delete(`/controls/${control.id}`);
    alert("Deleted successfully");
    navigate("/");
  };

  const getBadgeColor = (score) => {
    if (score >= 80) return "green";
    if (score >= 50) return "orange";
    return "red";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Control Details</h1>

      <p><b>Control ID:</b> {control.controlId}</p>
      <p><b>Title:</b> {control.title}</p>
      <p><b>Department:</b> {control.department}</p>
      <p><b>Owner:</b> {control.owner}</p>
      <p><b>Status:</b> {control.status}</p>
      <p><b>Risk Level:</b> {control.riskLevel}</p>

      <p>
        <b>Score:</b>{" "}
        <span
          style={{
            backgroundColor: getBadgeColor(control.effectivenessScore || 0),
            color: "white",
            padding: "5px 10px",
            borderRadius: "10px",
          }}
        >
          {control.effectivenessScore}
        </span>
      </p>

      <button onClick={() => navigate("/", { state: { editControl: control } })}>
        Edit
      </button>

      <button onClick={handleDelete} style={{ marginLeft: "10px" }}>
        Delete
      </button>
    </div>
  );
}

export default ControlDetail;