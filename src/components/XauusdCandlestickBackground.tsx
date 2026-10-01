import React, { useEffect, useRef } from 'react';

interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export function XauusdCandlestickBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initial candle generation
    const candleWidth = 12;
    const candleGap = 6;
    const stepX = candleWidth + candleGap;
    const totalCandles = Math.ceil(width / stepX) + 25;

    let basePrice = 2732.0;
    const candles: Candle[] = [];

    for (let i = 0; i < totalCandles; i++) {
      const volatility = (Math.random() - 0.48) * 3.2;
      const open = basePrice;
      const close = open + volatility;
      const high = Math.max(open, close) + Math.random() * 2.2;
      const low = Math.min(open, close) - Math.random() * 2.2;
      const volume = Math.floor(Math.random() * 80 + 20);

      candles.push({ open, high, low, close, volume });
      basePrice = close;
    }

    let scrollOffset = 0;
    const scrollSpeed = 0.45; // Smooth drifting to left
    let lastTickTime = Date.now();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Scroll candles to the left
      scrollOffset += scrollSpeed;
      if (scrollOffset >= stepX) {
        scrollOffset -= stepX;
        // Shift old candle and append a newly formed one
        const lastCandle = candles[candles.length - 1];
        const nextOpen = lastCandle.close;
        const trendBias = (Math.random() - 0.49) * 2.8;
        const nextClose = nextOpen + trendBias;
        const nextHigh = Math.max(nextOpen, nextClose) + Math.random() * 2.0;
        const nextLow = Math.min(nextOpen, nextClose) - Math.random() * 2.0;
        const nextVolume = Math.floor(Math.random() * 80 + 20);

        candles.shift();
        candles.push({
          open: nextOpen,
          high: nextHigh,
          low: nextLow,
          close: nextClose,
          volume: nextVolume,
        });
      }

      // Micro price fluctuation on the active forming candle
      const now = Date.now();
      if (now - lastTickTime > 120) {
        lastTickTime = now;
        const activeCandle = candles[candles.length - 1];
        const microDelta = (Math.random() - 0.49) * 0.45;
        activeCandle.close = +(activeCandle.close + microDelta).toFixed(2);
        activeCandle.high = Math.max(activeCandle.high, activeCandle.close);
        activeCandle.low = Math.min(activeCandle.low, activeCandle.close);
      }

      // Calculate min and max price for viewport scaling
      let minP = Infinity;
      let maxP = -Infinity;
      for (let i = 0; i < candles.length; i++) {
        if (candles[i].low < minP) minP = candles[i].low;
        if (candles[i].high > maxP) maxP = candles[i].high;
      }
      const padding = (maxP - minP) * 0.18 || 5;
      minP -= padding;
      maxP += padding;

      const priceToY = (p: number) => {
        return height - ((p - minP) / (maxP - minP)) * (height * 0.72) - height * 0.15;
      };

      // Draw subtle horizontal grid price levels without symbol labels
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.font = '10px monospace';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';

      const priceInterval = 5;
      const startGridPrice = Math.floor(minP / priceInterval) * priceInterval;
      for (let p = startGridPrice; p <= maxP; p += priceInterval) {
        const y = priceToY(p);
        if (y > 20 && y < height - 20) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();

          ctx.fillText(`${p.toFixed(2)}`, width - 52, y - 4);
        }
      }
      ctx.setLineDash([]);

      // Draw Candlesticks (Green for bullish, Red for bearish with ~50% saturation tone)
      const bullishGreen = 'rgba(34, 197, 94, 0.55)'; // Bullish emerald
      const bearishRed = 'rgba(239, 68, 68, 0.55)'; // Bearish coral red
      const bullishWick = 'rgba(22, 163, 74, 0.65)';
      const bearishWick = 'rgba(220, 38, 38, 0.65)';

      const volumeBaseY = height - 10;
      const maxVolumeHeight = height * 0.12;

      for (let i = 0; i < candles.length; i++) {
        const candle = candles[i];
        const x = i * stepX - scrollOffset;

        if (x < -candleWidth || x > width + candleWidth) continue;

        const isUp = candle.close >= candle.open;
        const bodyColor = isUp ? bullishGreen : bearishRed;
        const wickColor = isUp ? bullishWick : bearishWick;

        const openY = priceToY(candle.open);
        const closeY = priceToY(candle.close);
        const highY = priceToY(candle.high);
        const lowY = priceToY(candle.low);

        const candleTop = Math.min(openY, closeY);
        const candleHeight = Math.max(Math.abs(closeY - openY), 1.5);

        // Draw upper and lower wicks
        ctx.strokeStyle = wickColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x + candleWidth / 2, highY);
        ctx.lineTo(x + candleWidth / 2, lowY);
        ctx.stroke();

        // Draw candle body
        ctx.fillStyle = bodyColor;
        ctx.fillRect(x, candleTop, candleWidth, candleHeight);

        // Subtle border on candle body
        ctx.strokeStyle = wickColor;
        ctx.lineWidth = 1;
        ctx.strokeRect(x, candleTop, candleWidth, candleHeight);

        // Bottom volume bar
        const volHeight = (candle.volume / 100) * maxVolumeHeight;
        ctx.fillStyle = isUp ? 'rgba(34, 197, 94, 0.18)' : 'rgba(239, 68, 68, 0.18)';
        ctx.fillRect(x, volumeBaseY - volHeight, candleWidth, volHeight);
      }

      // Draw current live price horizontal dashed line & indicator
      const activeCandle = candles[candles.length - 1];
      const activePriceY = priceToY(activeCandle.close);
      const isLiveUp = activeCandle.close >= activeCandle.open;

      ctx.save();
      ctx.setLineDash([3, 4]);
      ctx.strokeStyle = isLiveUp ? 'rgba(34, 197, 94, 0.5)' : 'rgba(239, 68, 68, 0.5)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(0, activePriceY);
      ctx.lineTo(width, activePriceY);
      ctx.stroke();
      ctx.restore();

      // Live price tag at right edge
      const tagWidth = 58;
      const tagHeight = 18;
      const tagX = width - tagWidth - 8;
      const tagY = activePriceY - tagHeight / 2;

      ctx.fillStyle = isLiveUp ? 'rgba(22, 163, 74, 0.85)' : 'rgba(220, 38, 38, 0.85)';
      ctx.beginPath();
      ctx.roundRect(tagX, tagY, tagWidth, tagHeight, 4);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${activeCandle.close.toFixed(2)}`, tagX + tagWidth / 2, tagY + 12);
      ctx.textAlign = 'left';

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
      {/* 50% Saturated Live Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover filter saturate-50 contrast-95 opacity-65"
      />

      {/* Subtle bottom fade to blend with page flow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#faf8f5]/40 via-transparent to-[#faf8f5]/60 pointer-events-none" />
    </div>
  );
}
