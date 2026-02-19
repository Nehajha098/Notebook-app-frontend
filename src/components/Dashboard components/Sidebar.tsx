import "./sidebar.css";
import { useState, useEffect } from "react";
import axios from "axios";

interface Notebook {
  id: number;
  fileName: string;
}

type SidebarProps = {
  onSelectionChange: (ids: number[]) => void;
};

function Sidebar({ onSelectionChange }: SidebarProps) {
  const [files, setFiles] = useState<Notebook[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchMyNotebooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/my-notebooks", {
          withCredentials: true
        });
        setFiles(response.data);
      } catch (err) {
        console.error("Error fetching notebooks", err);
      }
    };
    fetchMyNotebooks();
  }, []);

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prev) => {
      let next: number[];
      if (prev.includes(id)) {
        next = prev.filter((item) => item !== id);
      } else {
        next = [...prev, id];
      }
      onSelectionChange(next);
      return next;
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const newFile = e.target.files[0];
    const formData = new FormData();
    formData.append("file", newFile);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/upload-pdf",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      if (response.status === 200) {
        // Backend should return the saved notebook record.
        if (response.data && typeof response.data === "object" && "id" in response.data) {
          const notebook = response.data as { id: number; fileName: string };
          setFiles((prevFiles) => [...prevFiles, { id: notebook.id, fileName: notebook.fileName }]);
        } else {
          // Fallback: refetch list if backend returns a string/message.
          const refreshed = await axios.get("http://localhost:8080/api/my-notebooks", {
            withCredentials: true
          });
          setFiles(refreshed.data);
        }
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Could not save the notebook.");
    }
    e.target.value = "";
  };

  const deleteFile = async (id: number, index: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/delete-pdf/${id}`, {
        withCredentials: true
      });
      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
      setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="sidebar">
      <h4 className="notespace">Note Space</h4>

      <div className="newfiles">
        <label htmlFor="fileUpload" className="addfiles">+</label>
        <p>Create new Notebook</p>
      </div>

      <div className="file-list">
        {files.map((file, index) => (
          <div className="file-item" key={file.id || index}>
            <input 
              type="checkbox"
              checked={selectedIds.includes(file.id)}
              onChange={() => handleCheckboxChange(file.id)}
              style={{ marginRight: "10px", cursor: "pointer" }}
            />
            <span>📄 {file.fileName}</span> 
            <button className="delete-btn" onClick={() => deleteFile(file.id, index)}>✖</button>
          </div>
        ))}
      </div>

      <input type="file" id="fileUpload" style={{ display: "none" }} onChange={handleFileChange} accept="application/pdf" />
    </div>
  );
}

export default Sidebar;