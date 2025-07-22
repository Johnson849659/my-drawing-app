import React, { useRef, useState, useEffect } from 'react';
import QRCode from "qrcode.react"; // ✅ 正確！TypeScript 能自動判斷型別


const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState('#000');
  const [size, setSize] = useState(4);
  const [note, setNote] = useState(localStorage.getItem('myNote') || '');
  const [drawing, setDrawing] = useState(false);
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);

  const websiteURL = 'https://你的-vercel-網址.vercel.app'; // ← 請改成你部署後的網址！

  useEffect(() => {
    localStorage.setItem('myNote', note);
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
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    const pos = getPos(e);
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
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
    canvasRef.current?.getContext('2d')?.clearRect(0, 0, 1000, 600);
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'my-drawing.png';
      link.click();
    }
  };

  const shareToLINE = () => {
    const encodedURL = encodeURIComponent(websiteURL);
    window.open(`https://social-plugins.line.me/lineit/share?url=${encodedURL}`, '_blank');
  };

  return (
    <div style={{ position: 'relative', marginTop: '30px', width: '1000px', margin: 'auto' }}>
      {/* 咒語四周 */}
      <div style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', fontWeight: 'bold' }}>ॐ मणि पद्मे हूं</div>
      <div style={{ position: 'absolute', bottom: '-30px', left: '50%', transform: 'translateX(-50%)', fontWeight: 'bold' }}>ॐ मणि पद्मे हूं</div>
      <div style={{ position: 'absolute', top: '50%', left: '-140px', transform: 'translateY(-50%) rotate(-90deg)', fontWeight: 'bold' }}>ॐ मणि पद्मे हूं</div>
      <div style={{ position: 'absolute', top: '50%', right: '-140px', transform: 'translateY(-50%) rotate(90deg)', fontWeight: 'bold' }}>ॐ मणि पद्मे हूं</div>

      {/* 工具列 */}
      <div style={{ marginBottom: '12px' }}>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        <input type="range" min="1" max="50" value={size} onChange={(e) => setSize(parseInt(e.target.value))} />
        <span>{size}px</span>
        <button onClick={clearCanvas} style={{ marginLeft: '10px' }}>清除</button>
        <button onClick={saveImage} style={{ marginLeft: '10px' }}>儲存圖片</button>
        <button onClick={shareToLINE} style={{ marginLeft: '10px' }}>LINE 分享</button>
      </div>

      {/* 畫布 */}
      <canvas
        ref={canvasRef}
        width={1000}
        height={600}
        style={{ border: '2px solid #333', backgroundColor: '#fff', borderRadius: '12px' }}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
      />

      {/* 筆記 */}
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <h3>📝 創作筆記</h3>
        <textarea
          rows={4}
          cols={80}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="記下你的靈感、心情或創作主題..."
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
      </div>

    </div>
  );
};

export default Canvas;

