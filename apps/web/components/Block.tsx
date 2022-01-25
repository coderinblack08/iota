import {
  IconNotes,
  IconMessages,
  IconPhoto,
  IconFolder,
  IconNotebook,
  IconLink,
} from "@tabler/icons";
import React from "react";
import { Rnd, RndDragCallback, RndResizeCallback } from "react-rnd";
import { round } from "../lib/round";
import { Block } from "../lib/types";

interface BlockProps {
  id: number;
  block: Block;
  boundClassName: string;
  onChange: (id: number, data: Block) => void;
  onDelete: (id: number) => void;
  gridSize: number;
}

export const BlockComponent: React.FC<BlockProps> = ({
  id,
  block,
  gridSize,
  onDelete,
  boundClassName,
  onChange,
}) => {
  const onNoteDragStop: RndDragCallback = (e, data) => {
    const { x, y } = data;

    console.log(x, y);

    onChange(id, {
      ...block,
      position: { x: round(x, gridSize), y: round(y, gridSize) },
    });
  };

  const onNoteResizeStop: RndResizeCallback = (
    _e,
    _dir,
    _el,
    delta,
    updatedPosition
  ) => {
    const updatedWidth = block.size.width + delta.width;
    const updatedHeight = block.size.height + delta.height;

    onChange(id, {
      ...block,
      position: updatedPosition,
      size: { width: updatedWidth, height: updatedHeight },
    });
  };

  // const onNoteTextChange = (e) => {
  //   const { value } = e.target;
  //   onTextChange(id, { position, size, text: value });
  // };

  // const onRemoveNoteClickHandler = () => {
  //   const noteId = id;
  //   onRemoveClick(noteId);
  // };

  return (
    <Rnd
      size={{ width: block.size.width, height: block.size.height }}
      position={{ y: block.position.y, x: block.position.x }}
      minWidth={340}
      minHeight={340}
      resizeGrid={[gridSize, gridSize]}
      dragGrid={[gridSize, gridSize]}
      dragHandleClassName="drag-header"
      bounds={`.${boundClassName}`}
      enableResizing={{
        bottom: false,
        bottomLeft: false,
        left: false,
        right: false,
        top: false,
        topLeft: false,
        topRight: false,
        bottomRight: true,
      }}
      onDragStop={onNoteDragStop}
      onResizeStop={onNoteResizeStop}
      resizeHandleComponent={{
        bottomRight: (
          <button className="-mt-[1px] -ml-[1px] w-5 h-5 border-2 border-gray-700 rounded-br-xl rounded-tl-md cursor-se-resize" />
        ),
      }}
      resizeHandleStyles={{
        bottomRight: {
          position: "absolute",
          right: "0",
          bottom: "0",

          width: "1.2rem",
          height: "1.2rem",
        },
      }}
      enableUserSelectHack={false}
    >
      <div
        className="w-full h-full flex flex-col absolute border-2 border-gray-700 rounded-xl bg-gray-900"
        // style={{
        //   top: block.position.y,
        //   left: block.position.x,
        //   width: block.size.width,
        //   height: block.size.height,
        // }}
      >
        <header className="drag-header cursor-grab px-3 py-1 border-b-2 border-gray-700">
          <button
            onClick={() => onDelete(id)}
            className="rounded-full w-4 h-4 border-2 border-gray-700"
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
        </div>
      </div>
    </Rnd>
  );
};
