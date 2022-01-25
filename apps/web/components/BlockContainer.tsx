import {
  IconNotes,
  IconMessages,
  IconPhoto,
  IconFolder,
  IconNotebook,
  IconLink,
} from "@tabler/icons";
import React, { useEffect, useRef, useState } from "react";
import { GridCanvas } from "./BlockGridCanvas";

export const BlockContainer: React.FC = ({ children }) => {
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
