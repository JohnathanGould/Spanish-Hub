import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Sparkles, X, Check } from 'lucide-react';

function drawCertificate(canvas, name, completedAt, xp, streakCount) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;

  // Background — terracotta plaster gradient
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#FAF7F2');
  bg.addColorStop(1, '#F3EBE1');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Spanish flag bar at top
  ctx.fillStyle = '#C60B1E';
  ctx.fillRect(0, 0, W * 0.25, 14);
  ctx.fillStyle = '#F5C518';
  ctx.fillRect(W * 0.25, 0, W * 0.5, 14);
  ctx.fillStyle = '#C60B1E';
  ctx.fillRect(W * 0.75, 0, W * 0.25, 14);

  // Border
  ctx.strokeStyle = '#C9745E';
  ctx.lineWidth = 6;
  ctx.strokeRect(40, 50, W - 80, H - 90);

  // Inner gold border
  ctx.strokeStyle = '#F5C518';
  ctx.lineWidth = 2;
  ctx.strokeRect(56, 66, W - 112, H - 122);

  // Flag emoji
  ctx.font = 'bold 64px serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#000';
  ctx.fillText('🇪🇸', W / 2, 150);

  // Title
  ctx.font = 'bold italic 48px Georgia, serif';
  ctx.fillStyle = '#2C1A14';
  ctx.fillText('Certificate of Mastery', W / 2, 220);

  // Subtitle
  ctx.font = '20px Georgia, serif';
  ctx.fillStyle = '#8B7366';
  ctx.fillText('Spanish Hub · The Spanish Course', W / 2, 252);

  // Awarded line
  ctx.font = 'italic 18px Georgia, serif';
  ctx.fillStyle = '#5C4033';
  ctx.fillText('This certificate is proudly awarded to', W / 2, 320);

  // Name
  ctx.font = 'bold 56px Georgia, serif';
  ctx.fillStyle = '#C60B1E';
  ctx.fillText(name || 'Spanish Learner', W / 2, 390);

  // Underline under name
  const nameWidth = ctx.measureText(name || 'Spanish Learner').width;
  ctx.strokeStyle = '#F5C518';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(W / 2 - nameWidth / 2 - 20, 410);
  ctx.lineTo(W / 2 + nameWidth / 2 + 20, 410);
  ctx.stroke();

  // Body
  ctx.font = '20px Georgia, serif';
  ctx.fillStyle = '#2C1A14';
  ctx.fillText('for completing all 14 levels of the Spanish Course,', W / 2, 460);
  ctx.fillText('mastering the foundations of Spanish vocabulary,', W / 2, 488);
  ctx.fillText('grammar, conjugation, and conversation.', W / 2, 516);

  // Stats row
  const statY = 580;
  const statsX = [W * 0.3, W * 0.5, W * 0.7];
  const stats = [
    { label: 'XP earned', value: xp >= 1000 ? `${(xp / 1000).toFixed(1)}k` : `${xp}` },
    { label: 'Day streak', value: `${streakCount}🔥` },
    { label: 'Levels', value: '14 / 14' },
  ];
  stats.forEach((s, i) => {
    ctx.font = 'bold 32px Georgia, serif';
    ctx.fillStyle = '#C60B1E';
    ctx.fillText(s.value, statsX[i], statY);
    ctx.font = '13px Georgia, serif';
    ctx.fillStyle = '#8B7366';
    ctx.fillText(s.label.toUpperCase(), statsX[i], statY + 22);
  });

  // Date
  ctx.font = 'italic 16px Georgia, serif';
  ctx.fillStyle = '#5C4033';
  ctx.fillText(`Awarded on ${completedAt}`, W / 2, H - 100);

  // Footer
  ctx.font = '13px Georgia, serif';
  ctx.fillStyle = '#8B7366';
  ctx.fillText('¡Felicidades! Now go speak with a real human. 🇪🇸', W / 2, H - 70);
}

export default function Certificate({ name, xp, streakCount, completedDate, onClose }) {
  const canvasRef = useRef(null);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      drawCertificate(canvasRef.current, name, completedDate, xp, streakCount);
    }
  }, [name, xp, streakCount, completedDate]);

  const downloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `spanish-hub-certificate-${(name || 'learner').replace(/\s+/g, '-').toLowerCase()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2000);
    });
  };

  const shareText = `I just finished all 14 levels of The Spanish Course on Spanish Hub! 🇪🇸 ${xp} XP · ${streakCount}-day streak.`;

  const copyShare = async () => {
    try { await navigator.clipboard.writeText(shareText); } catch (e) { console.error(e); }
  };

  return (
    <div data-testid="certificate-modal" onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)' }}>
      <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        onClick={e => e.stopPropagation()}
        className="rounded-3xl shadow-2xl overflow-hidden max-w-2xl w-full"
        style={{ background: 'hsl(var(--card))' }}>

        <div className="p-5 flex items-center justify-between border-b" style={{ borderColor: 'hsl(var(--border))' }}>
          <div className="flex items-center gap-2">
            <Sparkles size={18} style={{ color: '#F5C518' }} />
            <h3 className="font-serif text-lg font-bold" style={{ color: 'hsl(var(--foreground))' }}>
              Your Mastery Certificate
            </h3>
          </div>
          <button data-testid="certificate-close" onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/5 transition-colors"
            style={{ color: 'hsl(var(--muted-foreground))' }}>
            <X size={18} />
          </button>
        </div>

        <div className="p-4 max-h-[55vh] overflow-y-auto" style={{ background: 'hsl(var(--muted))' }}>
          <canvas ref={canvasRef} width={1000} height={750}
            data-testid="certificate-canvas"
            className="w-full h-auto rounded-xl shadow-lg"
            style={{ aspectRatio: '4/3', background: '#FAF7F2' }} />
        </div>

        <div className="p-5 grid grid-cols-2 gap-3 border-t" style={{ borderColor: 'hsl(var(--border))' }}>
          <button data-testid="certificate-share" onClick={copyShare}
            className="py-3 rounded-xl text-sm font-bold border-2 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
            style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}>
            Copy share text
          </button>
          <button data-testid="certificate-download" onClick={downloadPng}
            className="py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
            style={{ background: 'hsl(var(--primary))', boxShadow: '0 4px 14px rgba(198,11,30,0.3)' }}>
            {downloaded ? <><Check size={14} /> Downloaded!</> : <><Download size={14} /> Download PNG</>}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
