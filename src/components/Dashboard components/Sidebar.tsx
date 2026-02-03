import "./sidebar.css";
import { useState, useEffect } from "react";
import axios from "axios";

// 1. Define exactly what a Notebook looks like
interface Notebook {
  id: number;
  fileName: string;
}

function Sidebar() {
  // 2. Use the Notebook interface for the state
  const [files, setFiles] = useState<Notebook[]>([]);

  // Fetch notebooks on load
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

  // Handle new file upload
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
        // 3. IMPORTANT: Re-fetch the list or add the response data
        // This ensures the new item has an 'id' from the database
        setFiles((prevFiles) => [...prevFiles, response.data]);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Could not save the notebook.");
    }

    e.target.value = "";
  };

  // 4. Unified Delete Function
  const deleteFile = async (id: number, index: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/delete-notebook/${id}`, {
        withCredentials: true
      });
      // Remove from UI only if backend delete is successful
      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
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
            {/* Always use fileName to match the backend model */}
            <span>📄 {file.fileName}</span> 
            <button 
              className="delete-btn" 
              onClick={() => deleteFile(file.id, index)}
            >
              ✖
            </button>
          </div>
        ))}
      </div>

      <input
        type="file"
        id="fileUpload"
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="application/pdf"
      />
    </div>
  );
}

export default Sidebar;