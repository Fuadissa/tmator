import React from "react";
import { ImSpinner2 } from "react-icons/im";

const laoding = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-5xl">
        <ImSpinner2 className="animate-spin text-[#fee2b2]" />
      </p>
    </div>
  );
};

export default laoding;
