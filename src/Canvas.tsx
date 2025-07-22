import React, { useRef, useState, useEffect } from "react";
import QRCode from "qrcode.react";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState("#000");
  const [size, setSize] = useState(4);
  const [note, setNote] = useState(localStorage.getItem("myNote") || "");
  const [drawing, setDrawing] = useState(false);
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);

  const websiteURL = "https://my-drawing-app-git-main-johns-projects-dd99a6d8.vercel.app/";

  useEffect(() => {
    localStorage.setItem("myNote", note);
  }, [note]);

  const getPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setDrawing(true);
    setLastPos(getPos(e));
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing || !lastPos || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const pos = getPos(e);
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    setLastPos(pos);
  };

  const stopDraw = () => {
    setDrawing(false);
    setLastPos(null);
  };

  const clearCanvas = () => {
    canvasRef.current?.getContext("2d")?.clearRect(0, 0, 1000, 600);
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "my-drawing.png";
      link.click();
    }
  };

  const shareImageToLINE = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const imageData = canvas.toDataURL("image/png");
    const blob = await (await fetch(imageData)).blob();
    const fileURL = URL.createObjectURL(blob);
    window.open(`line://msg/image/${fileURL}`, "_blank");
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
        paddingBottom: "80px",
      }}
    >
      {/* 🧘 咒語環繞 */}
      {["top", "bottom"].map((pos) =>
        [0, 1, 2].map((i) => (
          <div
            key={`${pos}-${i}`}
            style={{
              position: "absolute",
              [pos]: "-30px",
              left: `${25 + i * 25}%`,
              transform: "translateX(-50%)",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            ॐ मणि पद्मे हूं
          </div>
        ))
      )}
      {["left", "right"].map((side) =>
        [0, 1, 2].map((i) => (
          <div
            key={`${side}-${i}`}
            style={{
              position: "absolute",
              top: `${25 + i * 25}%`,
              [side]: "-140px",
              transform: `translateY(-50%) rotate(${side === "left" ? -90 : 90}deg)`,
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            ॐ मणि पद्मे हूं
          </div>
        ))
      )}

      {/* 工具列 */}
      <div style={{ marginBottom: "12px" }}>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        <input type="range" min="1" max="50" value={size} onChange={(e) => setSize(parseInt(e.target.value))} />
        <span>{size}px</span>
        <button onClick={clearCanvas} style={{ marginLeft: "10px" }}>清除</button>
        <button onClick={saveImage} style={{ marginLeft: "10px" }}>儲存圖片</button>
        <button onClick={shareImageToLINE} style={{ marginLeft: "10px", backgroundColor: "#00c300", color: "#fff", padding: "6px 12px", borderRadius: "6px" }}>
          分享圖片到 LINE App
        </button>
      </div>

      {/* 🎨 畫布 */}
      <canvas
        ref={canvasRef}
        width={1000}
        height={600}
        style={{
          display: "block",
          alignSelf: "center",
          border: "2px solid #333",
          backgroundColor: "#fff",
          borderRadius: "12px",
        }}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
      />

      {/* 📝 筆記 */}
      <div style={{ marginTop: "30px", width: "100%" }}>
        <h3>📝 創作筆記</h3>
        <textarea
          rows={4}
          cols={80}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="記下你的靈感、心情或創作主題..."
          style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc" }}
        />
      </div>

      
    </div>
  );
};

export default Canvas;




