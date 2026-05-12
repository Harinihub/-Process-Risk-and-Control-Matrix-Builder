import React, { useState } from "react";
import axios from "axios";

function AIPanel() {
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a question or prompt.");
      return;
    }

    setLoading(true);
    setError("");
    setAiResponse("");

    try {
      const response = await axios.post("http://localhost:8080/api/ai/generate", {
        prompt: prompt,
      });

      setAiResponse(response.data.response || response.data.message || response.data);
    } catch (err) {
      setError("Failed to get AI response. Please check backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>AI Assistance Panel</h2>

      <p>
        Use this panel to generate control descriptions, recommendations, or
        audit summaries.
      </p>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Example: Generate a recommendation for high risk access control..."
        rows="5"
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "15px",
          marginTop: "10px",
        }}
      />

      <br />

      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          backgroundColor: loading ? "#999" : "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Generating..." : "Generate AI Response"}
      </button>

      {loading && (
        <div style={{ marginTop: "20px", color: "#2563eb" }}>
          Loading... AI is generating response.
        </div>
      )}

      {error && (
        <div
          style={{
            marginTop: "20px",
            padding: "12px",
            backgroundColor: "#fee2e2",
            color: "#991b1b",
            borderRadius: "8px",
          }}
        >
          {error}
        </div>
      )}

      {aiResponse && (
        <div
          style={{
            marginTop: "25px",
            padding: "20px",
            backgroundColor: "#f9fafb",
            border: "1px solid #ddd",
            borderRadius: "10px",
          }}
        >
          <h3>AI Response</h3>
          <p style={{ whiteSpace: "pre-line", lineHeight: "1.6" }}>
            {aiResponse}
          </p>
        </div>
      )}
    </div>
  );
}

export default AIPanel;