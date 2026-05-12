import { useState } from "react";
import api from "../service/api.js";

function ControlForm({ onSuccess }) {
  const [form, setForm] = useState({
    controlId: "",
    title: "",
    description: "",
    department: "",
    owner: "",
    status: "ACTIVE",
    riskLevel: "LOW",
    controlType: "",
    effectivenessScore: "",
    reviewDate: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/controls/create", form);
      alert("Control created successfully ✅");

      // Reset form
      setForm({
        controlId: "",
        title: "",
        description: "",
        department: "",
        owner: "",
        status: "ACTIVE",
        riskLevel: "LOW",
        controlType: "",
        effectivenessScore: "",
        reviewDate: "",
      });

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      alert("Error creating control ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Control</h3>

      <input
        name="controlId"
        placeholder="Control ID"
        value={form.controlId}
        onChange={handleChange}
      />

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />

      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <input
        name="department"
        placeholder="Department"
        value={form.department}
        onChange={handleChange}
      />

      <input
        name="owner"
        placeholder="Owner"
        value={form.owner}
        onChange={handleChange}
      />

      <select name="status" value={form.status} onChange={handleChange}>
        <option value="ACTIVE">ACTIVE</option>
        <option value="INACTIVE">INACTIVE</option>
      </select>

      <select name="riskLevel" value={form.riskLevel} onChange={handleChange}>
        <option value="LOW">LOW</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
      </select>

      <input
        name="controlType"
        placeholder="Control Type"
        value={form.controlType}
        onChange={handleChange}
      />

      <input
        name="effectivenessScore"
        placeholder="Effectiveness Score"
        value={form.effectivenessScore}
        onChange={handleChange}
      />

      <input
        type="date"
        name="reviewDate"
        value={form.reviewDate}
        onChange={handleChange}
      />

      <button type="submit">Create</button>
    </form>
  );
}

export default ControlForm;