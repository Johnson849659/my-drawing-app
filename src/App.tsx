import React, { useState } from "react";
import Canvas from "./Canvas";

function App() {
  const [showCanvas, setShowCanvas] = useState(false);

  return (
    <div style={{ fontFamily: "sans-serif", textAlign: "center", padding: "20px" }}>
      {!showCanvas && (
        <div
          style={{
            opacity: 1,
            transform: "translateY(0)",
            transition: "opacity 1s ease, transform 1s ease"
          }}
        >
          <img
            src="/cover.jpg"
            alt="封面圖"
            style={{
              width: "320px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              marginBottom: "20px"
            }}
          />
          <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>🎨 我的畫布 App</h1>
          <p style={{ fontSize: "16px", color: "#666", marginBottom: "20px" }}>
            開始創作你的作品吧！
          </p>
          <button
            onClick={() => setShowCanvas(true)}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#4b3f2f",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background-color 0.3s"
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#6a5640")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4b3f2f")}
          >
            進入畫布
          </button>
        </div>
      )}
      {showCanvas && <Canvas />}
    </div>
  );
}

export default App