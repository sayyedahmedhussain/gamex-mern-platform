export default function SaveBar({ saving, saved, onSave, onReset, restoring }) {
  return (
    <div className="save-bar">
      <button
        className={`save-btn ${saving ? "saving" : ""} ${saved ? "saved" : ""}`}
        onClick={onSave}
        disabled={saving || restoring}
      >
        {saving ? "Saving…" : saved ? "✓ Saved!" : "Save Changes"}
      </button>

      {onReset && (
        <button
          className={`restore-btn ${restoring ? "restoring" : ""}`}
          onClick={() => {
            if (
              window.confirm(
                "Restore Default?\n\n" +
                "This will replace the current content with the ORIGINAL data " +
                "that was in the website's HTML at first launch.\n\n" +
                "Any changes you saved will be overwritten. Continue?"
              )
            ) {
              onReset();
            }
          }}
          disabled={saving || restoring}
        >
          {restoring ? "Restoring…" : "↩ Restore Default"}
        </button>
      )}
    </div>
  );
}
