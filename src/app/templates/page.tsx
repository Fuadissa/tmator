import Navbar from "@/components/Navbar/page";
import TemplatesGrid from "@/components/TemplatesGrid/page";
import React from "react";

const Templates = () => {
  return (
    <div className="flex flex-col justify-start items-center m-3 gap-3">
      <div className="pt-4 w-full flex justify-center items-center">
        <div className="flex justify-center items-center w-full rounded-lg h-[3rem] text-2xl">
          Templates
        </div>
      </div>
      <TemplatesGrid />
      <Navbar />
    </div>
  );
};

export default Templates;
