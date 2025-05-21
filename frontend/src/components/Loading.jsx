import React from "react";

export const LoadingCircle = () => {
  return <div></div>;
};

export const LoadingUser = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
      <div className="flex flex-col gap-4">
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-20"></div>
      </div>
    </div>
  );
};
