import {
  IconFolder,
  IconFrame,
  IconLink,
  IconMessages,
  IconNotebook,
  IconNotes,
  IconPhoto,
} from "@tabler/icons";
import clone from "lodash.clonedeep";
import { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";

const round = (value: number, factor: number): number => {
  return Math.round(value / factor) * factor;
};

const GridCanvas: React.FC<{
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

const BlockContainer: React.FC = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      const container = containerRef.current?.getBoundingClientRect();
      if (!container) return;

      const { width, height } = container;

      setSize({ width, height });
    };

    updateSize();

    window.addEventListener("load", updateSize);
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("load", updateSize);
      window.removeEventListener("resize", updateSize);
    };
  }, [containerRef]);

  const [viewPosition, setViewPosition] = useState({ x: 0, y: 0 });

  return (
    <div
      ref={containerRef}
      className="w-full h-screen overflow-hidden min-height-screen"
      onWheel={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setViewPosition((prev) => ({
          x: prev.x - e.deltaX,
          y: prev.y - e.deltaY,
        }));
      }}
    >
      <div
        // className="transition duration-200 ease"
        style={{
          transform: `matrix(1, 0, 0, 1, ${viewPosition.x}, ${viewPosition.y})`,
        }}
      >
        {blocks.map((block: any, index) => (
          <div
            key={index}
            className="flex flex-col absolute border-2 border-gray-700 rounded-xl bg-gray-900"
            style={{
              top: block.position.y,
              left: block.position.x,
              width: block.size.width,
              height: block.size.height,
            }}
          >
            <header className="cursor-grab px-3 py-1 border-b-2 border-gray-700">
              <button
                onClick={() => setBlocks(blocks.filter((_, i) => i != index))}
                className="rounded-full w-3 h-3 border-2 border-gray-700"
              />
            </header>
            {/* <textarea
              className="p-4 placeholder:text-gray-600 bg-transparent w-full h-full resize-none focus:outline-none"
              placeholder="What's on your mind?"
            /> */}
            <div
              className={`p-4 grid gap-4 overflow-y-auto ${
                block.size.width > 480 ? "grid-cols-2" : "grid-cols-1"
              }`}
              onWheel={(e) => e.stopPropagation()}
            >
              <button className="btn">
                <IconNotes className="w-6 h-6 mr-2.5 text-gray-700" />
                Note Block
              </button>
              <button className="btn">
                <IconMessages className="w-6 h-6 mr-2.5 text-gray-700" />
                Chat Block
              </button>
              <button className="btn">
                <IconPhoto className="w-6 h-6 mr-2.5 text-gray-700" />
                Image Block
              </button>
              <button className="btn">
                <IconFolder className="w-6 h-6 mr-2.5 text-gray-700" />
                Album Block
              </button>
              <button className="btn">
                <IconNotebook className="w-6 h-6 mr-2.5 text-gray-700" />
                Journal Block
              </button>
              <button className="btn">
                <IconLink className="w-6 h-6 mr-2.5 text-gray-700" />
                Link Block
              </button>
              <div className="absolute -bottom-[2px] -right-[2px] w-5 h-5 border-2 border-gray-700 rounded-br-xl rounded-tl-md cursor-se-resize" />
            </div>
          </div>
        ))}
      </div>
      <GridCanvas
        onSelectionComplete={(change) => {
          if (change.size.width > 340 && change.size.height > 340) {
            change.position.x -= viewPosition.x;
            change.position.y -= viewPosition.y;
            setBlocks((prev) => [...prev, { type: "note", ...change }]);
          }
        }}
        gridSize={20}
        {...size}
      />
      {children}
    </div>
  );
};

const TestPage: NextPage = () => {
  return (
    <div>
      <BlockContainer></BlockContainer>
    </div>
  );
};

export default TestPage;
