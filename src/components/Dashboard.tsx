import Sidebar from "./Dashboard components/Sidebar";
import Workspace from "./Dashboard components/Workspace";
import './dashboard.css'

function Dashboard() {
    return (
        <div className="dashboard">
            <Sidebar />
            <Workspace />
        </div>
    );
}

export default Dashboard;