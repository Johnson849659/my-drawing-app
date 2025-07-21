import React, { useState } from "react";
import Canvas from "./Canvas";
import Note from "./Note";

function App() {
  const [showCanvas, setShowCanvas] = useState(false);

  return (
    <div style={{ fontFamily: "sans-serif", textAlign: "center", padding: "20px" }}>
      {!showCanvas && (
        <div style={{ transition: "all 1s ease" }}>
          <img src="/cover.jpg" alt="封面圖" style={{ width: "320px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }} />
          <h1 style={{ fontSize: "32px", margin: "20px 0" }}>🎨 我的畫布 App</h1>
          <p>靜心創作 • 分享感動 • 記錄靈感</p>
          <button
            onClick={() => setShowCanvas(true)}
            style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "#4b3f2f", color: "#fff", borderRadius: "8px" }}
          >
            進入創作
          </button>
        </div>
      )}
      {showCanvas && (
        <>
          <Canvas />
          <Note />
        </>
      )}
    </div>
  );
}

export default App;