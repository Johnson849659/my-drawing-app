import React, { useRef, useState } from "react";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState("#000");
  const [size, setSize] = useState(5);
  const [drawing, setDrawing] = useState(false);
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);

  const getPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const start = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setDrawing(true);
    setLastPos(getPos(e));
  };

  const move = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing || !lastPos || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const currentPos = getPos(e);
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(currentPos.x, currentPos.y);
    ctx.stroke();
    setLastPos(currentPos);
  };

  const stop = () => {
    setDrawing(false);
    setLastPos(null);
  };

  const clear = () => {
    canvasRef.current?.getContext("2d")?.clearRect(0, 0, 1000, 600);
  };

  const save = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "my-drawing.png";
      link.click();
    }
  };

  const shareToLine = () => {
    const url = encodeURIComponent("https://你的畫布網站.vercel.app");
    window.open(`https://social-plugins.line.me/lineit/share?url=${url}`, "_blank");
  };

  return (
    <div style={{ position: "relative", marginTop: "30px", width: "1000px", margin: "auto" }}>
      {/* 咒語四周環繞 */}
      <div style={{ position: "absolute", top: "-35px", left: "50%", transform: "translateX(-50%)", fontWeight: "bold" }}>ॐ मणि पद्मे हूं</div>
      <div style={{ position: "absolute", bottom: "-35px", left: "50%", transform: "translateX(-50%)", fontWeight: "bold" }}>ॐ मणि पद्मे हूं</div>
      <div style={{ position: "absolute", top: "50%", left: "-140px", transform: "translateY(-50%) rotate(-90deg)", fontWeight: "bold" }}>ॐ मणि पद्मे हूं</div>
      <div style={{ position: "absolute", top: "50%", right: "-140px", transform: "translateY(-50%) rotate(90deg)", fontWeight: "bold" }}>ॐ मणि पद्मे हूं</div>

      {/* 工具列 */}
      <div style={{ marginBottom: "10px" }}>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        <input type="range" min="1" max="50" value={size} onChange={(e) => setSize(parseInt(e.target.value))} />
        <span>{size}px</span>
        <button onClick={clear} style={{ marginLeft: "10px" }}>清除</button>
        <button onClick={save} style={{ marginLeft: "10px" }}>儲存</button>
        <button onClick={shareToLine} style={{ marginLeft: "10px" }}>分享到 LINE</button>
      </div>

      {/* 畫布 */}
      <canvas
        ref={canvasRef}
        width={1000}
        height={600}
        style={{ border: "2px solid #333", backgroundColor: "#fff", borderRadius: "12px" }}
        onMouseDown={start}
        onMouseMove={move}
        onMouseUp={stop}
      />
    </div>
  );
};

export default Canvas;