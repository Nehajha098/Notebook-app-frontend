import Sidebar from "./Dashboard components/Sidebar";
import Workspace from "./Dashboard components/Workspace";
import "./dashboard.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState<string | null>(null);
  const [summarizing, setSummarizing] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/dashboard", { withCredentials: true })
      .then((res) => {
        setMessage(res.data);
        console.log(message);
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
  }, [navigate]);

  const handleSelectionChange = (ids: number[]) => {
    setSelectedIds(ids);
  };

  const handleSummarize = async () => {
    if (selectedIds.length === 0) return;

    setSummarizing(true);
    setSummary(null);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/summarize",
        { ids: selectedIds },
        { withCredentials: true }
      );

      setSummary(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data, null, 2)
      );
    } catch (err) {
      console.error("Summary failed:", err);
      alert("Failed to generate summary. Check the console.");
    } finally {
      setSummarizing(false);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar onSelectionChange={handleSelectionChange} />
      <Workspace
        summary={summary}
        loading={summarizing}
        onSummarize={handleSummarize}
        hasSelection={selectedIds.length > 0}
      />
    </div>
  );
}

export default Dashboard;