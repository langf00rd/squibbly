"use client";

import { useDrawingContext } from "@/lib/contexts/drawing-context";
import type React from "react";
import { useEffect, useRef, useState } from "react";

const CANVAS_WIDTH = 3000;
const CANVAS_HEIGHT = 3000;
const SCALE_FACTOR = 2;

export default function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { color, brushSize, tool, currentDrawing, addStroke } =
    useDrawingContext();
  const [isDrawing, setIsDrawing] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const currentStroke = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(SCALE_FACTOR, SCALE_FACTOR);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
      }
    }
  }, []);

  useEffect(() => {
    drawStrokes();
  }, [currentDrawing, offset]);

  function drawStrokes() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    currentDrawing.forEach((stroke) => {
      ctx.beginPath();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.brushSize / SCALE_FACTOR;
      ctx.globalCompositeOperation =
        stroke.tool === "eraser" ? "destination-out" : "source-over";

      stroke.path.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x - offset.x, point.y - offset.y);
        } else {
          ctx.lineTo(point.x - offset.x, point.y - offset.y);
        }
      });
      ctx.stroke();
    });
  }

  function startDrawing(evt: React.PointerEvent) {
    setIsDrawing(true);
    const point = getPoint(evt);
    currentStroke.current = [point];
  }

  const draw = (evt: React.PointerEvent) => {
    if (!isDrawing) return;

    const point = getPoint(evt);
    currentStroke.current.push(point);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize / SCALE_FACTOR;
    ctx.globalCompositeOperation =
      tool === "eraser" ? "destination-out" : "source-over";

    ctx.beginPath();
    ctx.moveTo(
      currentStroke.current[currentStroke.current.length - 2].x - offset.x,
      currentStroke.current[currentStroke.current.length - 2].y - offset.y,
    );
    ctx.lineTo(point.x - offset.x, point.y - offset.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      addStroke({
        path: currentStroke.current,
        color,
        brushSize,
        tool,
      });
      currentStroke.current = [];
    }
  };

  function getPoint(evt: React.PointerEvent) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x:
        (evt.clientX - rect.left) /
          ((rect.width / CANVAS_WIDTH) * SCALE_FACTOR) +
        offset.x,
      y:
        (evt.clientY - rect.top) /
          ((rect.height / CANVAS_HEIGHT) * SCALE_FACTOR) +
        offset.y,
    };
  }

  function handleScroll() {
    if (containerRef.current) {
      setOffset({
        x: containerRef.current.scrollLeft,
        y: containerRef.current.scrollTop,
      });
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;

    function handleTouchStart(evt: TouchEvent) {
      evt.preventDefault();
    }

    canvas?.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });

    return () => {
      canvas?.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      // className="absolute inset-0 overflow-auto border"
      onScroll={handleScroll}
    >
      {/* {CANVAS_WIDTH}x{CANVAS_HEIGHT} */}
      <div
        style={{
          width: CANVAS_WIDTH / SCALE_FACTOR,
          height: CANVAS_HEIGHT / SCALE_FACTOR,
        }}
      >
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="touch-none"
          style={{ width: "100%", height: "100%" }}
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerOut={stopDrawing}
        />
      </div>
    </div>
  );
}
