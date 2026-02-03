import Sidebar from "./Dashboard components/Sidebar";
import Workspace from "./Dashboard components/Workspace";
import './dashboard.css'
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/api/dashboard", { withCredentials: true })
            .then(res => {
                setMessage(res.data);
                console.log(message);
            })
            .catch(err => {
                console.log(err);
                navigate("/");
            });
    }, [navigate]);
    return (
        <div className="dashboard">
            <Sidebar />
            <Workspace />
        </div>
    );
}

export default Dashboard;