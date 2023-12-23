import React from 'react';

export default function Loader() {
  return (
    // inset-0 : top,left,right,bottom:0 so that it streches across the entire viewport
    // bg-slate-200/20 adds opacity to the color background
    <div className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">
      <div className="loader"></div>
    </div>
  );
}
