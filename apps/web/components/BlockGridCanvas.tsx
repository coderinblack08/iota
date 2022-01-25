import React, { useEffect, useRef, useState } from "react";
import clone from "lodash.clonedeep";
import { round } from "../lib/round";

export const GridCanvas: React.FC<{
  width: number;
  height: number;
  gridSize: number;
  onSelectionComplete: ({
    position,
    size,
  }: {
    position: { x: number; y: number };
    size: { width: number; height: number };
  }) => void;
}> = ({ width, height, gridSize, onSelectionComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const selectionRef = useRef<HTMLDivElement>(null);
  const [parentRectPosition, setParentRectPosition] = useState({
    top: 0,
    left: 0,
  });
  const currSelection = useRef<any>(null);
  const [selection, setSelection] = useState<any>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    canvasRef.current.width = width;
    canvasRef.current.height = height;

    const context = canvasRef.current.getContext("2d");

    if (!context) return;

    for (let x = 0; x <= width; x += gridSize) {
      for (let y = 0; y <= height; y += gridSize) {
        context.fillStyle = "#2A2A2F";
        context.beginPath();
        context.arc(x, y, 1.2, 0, 2 * Math.PI, false);
        context.fill();
      }
    }
  }, [canvasRef, width, height, gridSize]);

  function onDragStartHandler(e: any) {
    const { top, left } = e.target.getBoundingClientRect();
    setParentRectPosition({ top, left });

    document.body.style.cursor = "crosshair";
    document.body.style.userSelect = "none";

    setSelection((prev: any) => ({
      ...prev,
      x: round(e.clientX, gridSize),
      y: round(e.clientY, gridSize),
    }));

    console.log(e.clientX, e.clientY);

    document.addEventListener("mousemove", onDragMoveHandler);
    document.addEventListener("mouseup", onDragEndHandler);
  }

  useEffect(() => {
    if (selection.height && selection.width) {
      currSelection.current = clone(selection);
    }
  }, [selection]);

  function onDragMoveHandler(e: any) {
    if (!selectionRef.current && !canvasRef.current) return;

    const canvasBox = canvasRef.current?.getBoundingClientRect();
    if (!canvasBox) return;

    if (
      e.clientY < canvasBox.top ||
      e.clientY > canvasBox.bottom ||
      e.clientX > canvasBox.right ||
      e.clientX < canvasBox.left
    ) {
      setSelection({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      });
      return;
    }

    setSelection((prev: any) => ({
      ...prev,
      width: round(e.clientX - prev.x, gridSize),
      height: round(e.clientY - prev.y, gridSize),
    }));
  }

  function onDragEndHandler(e: any) {
    const { top, left } = parentRectPosition;

    document.body.style.cursor = "default";
    document.body.style.userSelect = "unset";

    onSelectionComplete({
      position: {
        x: round(currSelection.current?.x - left, gridSize),
        y: round(currSelection.current?.y - top, gridSize),
      },
      size: {
        width: round(currSelection.current?.width, gridSize),
        height: round(currSelection.current?.height, gridSize),
      },
    });
    currSelection.current = clone(selection);

    setSelection({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });
    document.removeEventListener("mousemove", onDragMoveHandler, {
      capture: false,
    });
    document.removeEventListener("mouseup", onDragEndHandler, {
      capture: false,
    });
  }

  return (
    <>
      <canvas
        onMouseDown={onDragStartHandler}
        ref={canvasRef}
        className="z-50"
      />
      <div
        ref={selectionRef}
        className="border-4 w-full rounded-xl border-blue-500/25 h-full absolute"
        style={{
          display: selection.width && selection.height ? "block" : "none",
          top: `${selection.y}px`,
          left: `${selection.x}px`,
          width: `${selection.width}px`,
          height: `${selection.height}px`,
        }}
      />
    </>
  );
};
