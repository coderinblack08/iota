import React, { useEffect, useRef, useState } from "react";
import { MdArrowDownward, MdZoomIn, MdZoomOut } from "react-icons/md";

interface GridCanvasProps {
  className: string;
  gridSize: number;
  onSelectionComplete: ({
    position,
    size,
  }: {
    position: {
      x: number;
      y: number;
    };
    size: {
      width: number;
      height: number;
    };
  }) => void;
}

const round = (value: number, factor: number): number => {
  return Math.round(value / factor) * factor;
};

const GridCanvas: React.FC<GridCanvasProps> = ({
  className,
  gridSize,
  onSelectionComplete,
}) => {
  const [blocks, setBlocks] = useState<any[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const selectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [parentDimensions, setParentDimensions] = useState<{
    top: 0;
    left: 0;
  } | null>(null);
  const [selection, setSelection] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    canvasRef.current.width = size.width;
    canvasRef.current.height = size.height;

    const context = canvasRef.current.getContext("2d");

    if (!context) return;

    for (let x = gridSize; x <= size.width; x += gridSize) {
      for (let y = gridSize; y <= size.height; y += gridSize) {
        context.fillStyle = "#2A2A2F";
        context.beginPath();
        context.arc(x, y, 1.25, 0, 2 * Math.PI, false);
        context.fill();
      }
    }
  }, [canvasRef, size.width, size.height, gridSize]);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      const container = containerRef.current?.getBoundingClientRect();
      if (!container) return;

      console.log(container);

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

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className={className}
        onMouseUp={(e) => {
          if (selection && selection.width > 240 && selection.height > 180) {
            setBlocks([
              ...blocks,
              {
                position: {
                  x: round(selection.x, gridSize),
                  y: round(selection.y, gridSize),
                },
                size: {
                  height: selection.height,
                  width: selection.width,
                },
              },
            ]);
          }
          setSelection(null);
        }}
        onMouseMove={(e) => {
          const canvasBox = canvasRef.current?.getBoundingClientRect();
          if (
            canvasBox &&
            (e.clientY < canvasBox.top ||
              e.clientY > canvasBox.bottom ||
              e.clientX > canvasBox.right ||
              e.clientX < canvasBox.left)
          ) {
            return setSelection({
              x: 0,
              y: 0,
              width: 0,
              height: 0,
            });
          }
          if (selection) {
            setSelection({
              ...selection,
              width: e.clientX - selection.x - (parentDimensions?.left || 0),
              height: e.clientY - selection.y - (parentDimensions?.top || 0),
            });
          }
        }}
        onMouseDown={(e: any) => {
          const { top, left } = e.target.getBoundingClientRect();
          setParentDimensions({ top, left });
          setSelection({
            x: e.clientX - left,
            y: e.clientY - top,
            width: 0,
            height: 0,
          });
        }}
      />
      {blocks.map((block, index) => (
        <div
          key={index}
          className="relative flex flex-col bg-gray-800/50 backdrop-blur-lg z-10 rounded-2xl border-2 border-gray-700/50"
          style={{
            position: "absolute",
            top: block.position.y,
            left: block.position.x,
            width: block.size.width,
            height: block.size.height,
          }}
        >
          <header className="relative select-none cursor-move px-4 py-2 flex items-center border-b-2 border-gray-700/50">
            <button
              onClick={() => setBlocks(blocks.filter((_, i) => i != index))}
              className="rounded-full w-3 h-3 bg-red-500 mr-2"
            />
            <button className="rounded-full w-3 h-3 bg-gray-500 mr-2" />
            <button className="rounded-full w-3 h-3 bg-green-500 mr-4" />
            <h3 className="text-sm text-gray-500">New Block</h3>
          </header>
          <div className="p-4 grid gap-2 overflow-y-auto h-full">
            <button className="text-sm py-3 px-6 text-left rounded-xl bg-gray-900 w-full text-gray-500">
              Note Block
            </button>
            <button className="text-sm py-3 px-6 text-left rounded-xl bg-gray-900 w-full text-gray-500">
              Chat Block
            </button>
            <button className="text-sm py-3 px-6 text-left rounded-xl bg-gray-900 w-full text-gray-500">
              Image Block
            </button>
            <button className="text-sm py-3 px-6 text-left rounded-xl bg-gray-900 w-full text-gray-500">
              Album Block
            </button>
            <button className="text-sm py-3 px-6 text-left rounded-xl bg-gray-900 w-full text-gray-500">
              Journal Block
            </button>
          </div>
          <button className="cursor-se-resize bg-gray-700/50 p-1.5 rounded-tl-lg absolute bottom-0 right-0">
            <MdArrowDownward className="w-5 text-gray-500 h-5 -rotate-45" />
          </button>
        </div>
      ))}
      {selection ? (
        <div
          ref={selectionRef}
          className="border-2 w-full rounded-xl border-gray-600 h-full absolute"
          style={{
            display: selection.width && selection.height ? "block" : "none",
            top: `${selection.y}px`,
            left: `${selection.x}px`,
            width: `${selection.width}px`,
            height: `${selection.height}px`,
          }}
        />
      ) : null}
      <div className="absolute z-50 bottom-4 left-4 flex items-center">
        <button className="p-1 rounded-xl border-2 border-gray-700 bg-gray-900">
          <MdZoomIn className="w-6 h-6" />
        </button>
        <button className="p-1 rounded-xl border-2 border-gray-700 bg-gray-900 ml-2">
          <MdZoomOut className="w-6 h-6" />
        </button>
        <a href="#" className="text-gray-500 ml-4 hover:underline">
          Report Bug
        </a>
      </div>
    </div>
  );
};

export default GridCanvas;
