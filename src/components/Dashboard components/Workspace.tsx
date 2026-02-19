import "./workspace.css";

type WorkspaceProps = {
  summary: string | null;
  loading: boolean;
  onSummarize: () => void;
  hasSelection: boolean;
};

function Workspace({ summary, loading, onSummarize, hasSelection }: WorkspaceProps) {
  const disabled = loading || !hasSelection;

  return (
    <div className="workspace">
      <p>AI Assistant</p>
      <div className="summaryhead">
        <p>{loading ? "Generating summary..." : "Summary"}</p>
      </div>
      <div className="textbox" style={{ whiteSpace: "pre-wrap", overflowY: "auto" }}>
        {loading
          ? "Working on it…"
          : summary ?? "Upload a PDF in the sidebar, select it, then click Summarize."}
      </div>
      <button
        className="summarize"
        onClick={onSummarize}
        disabled={disabled}
      >
        {loading
          ? "⏳ Summarizing..."
          : hasSelection
            ? "Summarize Selected Notes"
            : "Select a notebook to summarize"}
      </button>
      <div className="line"></div>
      <p>Ask Anything</p>
    </div>
  );
}

export default Workspace;
