import "./sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h4 className="notespace">Note Space</h4>
      <div className="newfiles">
        <button className="addfiles">+</button>
        <p>Create new Notebook</p>
      </div>
    </div>
  );
}

export default Sidebar;
