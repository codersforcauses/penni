import React from "react";

const TopNavtab = ()=>{
  return (
    <div className="flex w-full border-b">
            <button className="flex-1 py-2 px-4 text-gray-600 border-b-2 border-transparent hover:text-blue-500 focus:outline-none focus:text-blue-500 focus:border-blue-500">
                Task Details
            </button>
            <button className="flex-1 py-2 px-4 text-gray-600 border-b-2 border-transparent hover:text-blue-500 focus:outline-none focus:text-blue-500 focus:border-blue-500">
                Other Details
            </button>
        </div>
  )
}

export default TopNavtab;