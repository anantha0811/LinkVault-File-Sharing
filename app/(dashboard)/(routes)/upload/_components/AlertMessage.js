import { AlertCircle } from "lucide-react";
import React from "react";

const AlertMessage = ({ msg }) => {
  return (
    <div className="p-4 bg-red-500 mt-5 text-white rpunded-md flex gap-5 items-center w-[50%] justify-center ml-[25%]">
      <AlertCircle />
      {msg}
    </div>
  );
};

export default AlertMessage;
