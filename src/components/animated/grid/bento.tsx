import React from "react";


// Bento Grid Item Component
const BentoGridItem = ({ children, className = "", span = 1, rowSpan = 1 }) => {
  const getSpanClass = () => {
    const spans = {
      1: "col-span-1",
      2: "col-span-2",
      3: "col-span-3",
      4: "col-span-4",
      5: "col-span-5",
      6: "col-span-6",
    };
    return spans[span] || "col-span-1";
  };

  const getRowSpanClass = () => {
    const rowSpans = {
      1: "row-span-1",
      2: "row-span-2",
      3: "row-span-3",
    };
    return rowSpans[rowSpan] || "row-span-1";
  };

  return (
    <div className={`${getSpanClass()} ${getRowSpanClass()} ${className}`}>
      {children}
    </div>
  );
};

// Main Bento Grid Component
const BentoGrid = ({ children, className = "" }) => {
  return (
    <div className={` flex flex-col md:grid grid-cols-1 md:grid-cols-6  gap-6  ${className}`}>
      {children}
    </div>
  );
};

export  { BentoGrid, BentoGridItem };
