"use client";

import { useState } from "react";

export default function FileUploaderInput({
  name = "file",
  label = "Selecciona un archivo",
  accept = "image/*",
  showPreview = true,
  previewAspectRatio = "16/9",
  customStyles = {},
}) {
  const [preview, setPreview] = useState(null);

  const {
    inputClass = "w-full p-3 text-base rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",
  } = customStyles;

  const handleChange = (e) => {
    const file = e.target.files[0];
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
        required
      />

      {showPreview && preview && (
        <div className="mt-4">
          <p className="text-gray-700 dark:text-gray-300 mb-2">Previsualización:</p>
          <div
            className={`aspect-[${previewAspectRatio}] w-full overflow-hidden rounded-xl shadow-md bg-slate-200 dark:bg-slate-700`}
          >
            <img
              src={preview}
              alt="Previsualización"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
