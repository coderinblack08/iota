import {
  IconNotes,
  IconMessages,
  IconPhoto,
  IconFolder,
  IconNotebook,
  IconLink,
} from "@tabler/icons";
import React, { useEffect, useRef, useState } from "react";
import { BlockComponent } from "./Block";
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
      className="w-full h-screen overflow-hidden min-height-screen notes-container"
      onWheel={(e) => {
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
          <BlockComponent
            boundClassName="blocks-container"
            gridSize={20}
            id={index}
            key={index}
            block={block}
            onChange={(id, data) =>
              setBlocks((prev) => prev.map((b) => (b.id === id ? data : b)))
            }
            onDelete={(id) => setBlocks(blocks.filter((_, i) => i != id))}
          />
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
