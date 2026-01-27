import "./workspace.css";

function Workspace() {
  return (
    <div className="workspace">
      <p>AI Assistant</p>
      <div className="summaryhead">
        <p>The summary will appear here...</p>
      </div>
      <div className="textbox"></div>
      <button className="summarize">Summarize Now</button>
      <div className="line"></div>
      <p>Ask Anything</p>
    </div>
  );
}

export default Workspace;
