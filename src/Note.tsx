import React, { useState } from "react";

const Note = () => {
  const [text, setText] = useState("");

  return (
    <div style={{ marginTop: "30px", textAlign: "center" }}>
      <h3>📝 創作筆記</h3>
      <textarea
        rows={4}
        cols={80}
        placeholder="寫下你創作的靈感、心情或提醒吧..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc" }}
      />
    </div>
  );
};

export default Note;