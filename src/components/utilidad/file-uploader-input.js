"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function FileUploaderInput({
  name = "file",
  label = "Selecciona un archivo",
  accept = "image/*",
  showPreview = true,
  defaultImage = "",
  previewAspectRatio = "16/9",
  customStyles = {},
  required = true,
}) {
  const [preview, setPreview] = useState(null);

  const {
    inputClass = "w-full p-3 text-base rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",
  } = customStyles;

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 4 * 1024 * 1024) { // 4 MB en bytes
       toast.error("La imagen no puede pesar más de 4 MB.");
        setPreview(null);
        e.target.value = "";
      return;
    }

    if (file && showPreview) {
      
      setPreview(URL.createObjectURL(file));
    }
  };

  console.log("Se supone que ha llegado a file uploader")
  
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input
        type="file"
        name={name}
        accept={accept}
        onChange={handleChange}
        className={inputClass}
        required={required} 
      />

        {showPreview && (preview || defaultImage) && (
        <div className="mt-4">
          <p className="text-gray-700 dark:text-gray-300 mb-2">Previsualización:</p>
          <div
            className={`aspect-[${previewAspectRatio}] w-full overflow-hidden rounded-xl shadow-md bg-slate-200 dark:bg-slate-700`}
          >
            <img
              src={preview || defaultImage}
              alt="Previsualización"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
