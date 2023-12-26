import Image from "next/image";
import React from "react";
import imageAsset from "../../../../../public/images/file.png";
import { X } from "lucide-react";

const FilePreview = ({ file, removeFile }) => {
  return (
    <div className="flex items-center gap-2 mt-5 border rounded-md p-2 justify-between border-blue-300  item-left ">
      <div className="flex items-center p-2">
        <Image src={imageAsset} width={50} height={50} alt="File" />
        <div className="text-left">
          <h2>{file.name}</h2>
          <h2 className="text-[14px] text-gray-500">
            {file?.type} / {(file.size / 1024 / 1024).toFixed(2)}MB
          </h2>
        </div>
      </div>
      <X className="text-red-500 cursor-pointer" onClick={() => removeFile()} />
    </div>
  );
};

export default FilePreview;
