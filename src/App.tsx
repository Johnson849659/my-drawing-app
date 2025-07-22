import React, { useState } from "react";
import Canvas from "./Canvas";

function App() {
  const [showCanvas, setShowCanvas] = useState(false);

  return (
    <div style={{ fontFamily: "sans-serif", textAlign: "center", padding: "20px" }}>
      {!showCanvas ? (
        <div>
          <img
            src="/cover.jpg"
            alt="封面"
            style={{
              width: "320px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              marginBottom: "20px"
            }}
          />
          <h1 style={{ fontSize: "32px" }}>🎨 我的畫布 App</h1>
          <p style={{ fontSize: "16px", color: "#666" }}>靜心創作・筆記靈感・LINE 分享</p>
          <button
            onClick={() => setShowCanvas(true)}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#4b3f2f",
              color: "#fff",
              borderRadius: "8px"
            }}
          >
            開始創作
          </button>
        </div>
      ) : (
        <Canvas />
      )}
    </div>
  );
}

export default App;






