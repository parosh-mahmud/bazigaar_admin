import React from "react";
import { Toaster } from "react-hot-toast";

const HotToaster = () => {
  return (
    <Toaster
      className="mt-6"
      position="top-right"
      toastOptions={{
        // Define default options
        className: "",
        duration: 5000,
        style: {
          background: "#152b3c",
          color: "#fff",
        },
        // Default options for specific types
        success: {
          duration: 4000,
          theme: {
            primary: "green",
            secondary: "black",
          },
        },
      }}
    />
  );
};

export default HotToaster;
