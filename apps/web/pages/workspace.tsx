import { NextPage } from "next";
import { useState } from "react";
import { MdArrowDownward, MdZoomIn, MdZoomOut } from "react-icons/md";
import GridCanvas from "../components/GridCanvas";
import { Sidebar } from "../components/Sidebar";

const WorkSpacePage: NextPage = () => {
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <div className="w-full h-screen">
        <GridCanvas
          className="grid-canvas"
          onSelectionComplete={({ position, size }) => {}}
          gridSize={20}
        />
      </div>
    </div>
  );
};

export default WorkSpacePage;
