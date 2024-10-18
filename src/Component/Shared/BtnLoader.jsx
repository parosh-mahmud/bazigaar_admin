import React from "react";

const BtnLoader = () => {
  return (
    <button
      type="button"
      className="flex items-center gap-4 rounded-lg bg-gray-600 px-8 py-2.5 text-slate-100"
      disabled>
      <div class="flex h-6 w-6 animate-spin items-center justify-center rounded-full bg-gradient-to-tr from-slate-200 to-gray-500">
        <div class="h-4 w-4 rounded-full bg-gray-600"></div>
      </div>
      Processing...
    </button>
  );
};

export default BtnLoader;
