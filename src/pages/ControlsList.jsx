import { useEffect, useState } from "react";
import api from "../service/api.js";

function ControlsList() {
  const [controls, setControls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchControls();
  }, []);

  const fetchControls = async () => {
    try {
      const res = await api.get("/controls/all");
      setControls(res.data || []);
    } catch (err) {
      console.log(err);
      setControls([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h1 className="p-5">Loading...</h1>;
  if (controls.length === 0) return <h1 className="p-5">No data</h1>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Controls List</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Control ID</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Department</th>
            <th className="border p-2">Owner</th>
          </tr>
        </thead>

        <tbody>
          {controls.map((c) => (
            <tr key={c.id}>
              <td className="border p-2">{c.controlId}</td>
              <td className="border p-2">{c.title}</td>
              <td className="border p-2">{c.department}</td>
              <td className="border p-2">{c.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ControlsList;