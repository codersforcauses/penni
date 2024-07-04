import React from "react";

const TopNavtab = () => {
  return (
    <div className="flex w-full border-b">
      <button className="flex-1 border-b-2 border-transparent px-4 py-2 text-gray-600 hover:text-blue-500 focus:border-blue-500 focus:text-blue-500 focus:outline-none">
        Task Details
      </button>
      <button className="flex-1 border-b-2 border-transparent px-4 py-2 text-gray-600 hover:text-blue-500 focus:border-blue-500 focus:text-blue-500 focus:outline-none">
        Other Details
      </button>
    </div>
  );
};

export default TopNavtab;
