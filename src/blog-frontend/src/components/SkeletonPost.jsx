// src/components/SkeletonPost.jsx
import React from "react";

export default function SkeletonPost() {
  return (
    <div className="bg-white rounded-lg shadow-md animate-pulse overflow-hidden">
      <div className="h-64 bg-gray-200"></div>
      <div className="p-4 space-y-2">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>
    </div>
  );
}
