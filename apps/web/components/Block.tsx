import React from "react";
import { MdArrowDownward } from "react-icons/md";
import { Block } from "../lib/types";

interface BlockProps {
  block: Block;
}

export const BlockComponent: React.FC<BlockProps> = ({ block }) => {
  return (
    <div
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
        <button className="rounded-full w-3 h-3 bg-red-500 mr-2" />
        <button className="rounded-full w-3 h-3 bg-gray-500 mr-2" />
        <button className="rounded-full w-3 h-3 bg-green-500 mr-4" />
        <h3 className="text-sm text-gray-500">New Block</h3>
      </header>
      {block.type ? null : (
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
      )}
      <button className="cursor-se-resize bg-gray-700/50 p-1.5 rounded-tl-lg absolute bottom-0 right-0">
        <MdArrowDownward className="w-5 text-gray-500 h-5 -rotate-45" />
      </button>
    </div>
  );
};
