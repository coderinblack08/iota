import React from "react";
import { useQuery } from "react-query";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  const { data: me } = useQuery("/users/me");

  return (
    <nav className="flex select-none flex-col justify-between px-6 py-10 w-80 h-screen border-r-2 border-gray-800">
      <div>
        <div className="flex items-center space-x-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="h-11 w-11 rounded-xl"
            src={me?.avatar_url}
            alt={me?.display_name}
          />
          <div>
            <h4>{me?.display_name}</h4>
            <p className="text-gray-500 text-sm">@{me?.username}</p>
          </div>
        </div>
        <div className="text-gray-500 text-sm uppercase mt-12">Quick Links</div>
        <ul className="space-y-4 mt-4">
          <li>
            <a>My Workspace</a>
          </li>
          <li>
            <a>Profile</a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <a>Upgrade</a>
          </li>
          <li>
            <button className="text-red-500">Logout</button>
          </li>
        </ul>
      </div>
      <pre className="text-gray-600">
        * GitHub
        <br />
        * Contribute
        <br />
        <br />
        Iota App.
        <br />
        Made by @coderinblack
      </pre>
    </nav>
  );
};
