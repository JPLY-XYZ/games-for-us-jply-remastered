'use client'
import { useState } from 'react';

export function MultimediaJuego() {
    const [screenshots, setScreenshots] = useState([]);
  
    const addScreenshot = () => {
        if (screenshots.some(s => !s)) return;
        setScreenshots([...screenshots, null]);
    };

    const removeAllScreenshots = () => {
        setScreenshots([]);
    };

    const handleScreenshotChange = (index, files) => {
        if (!files || files.length === 0) return;

        const validFiles = Array.from(files).filter(file => file.type.startsWith("image/"));
        if (validFiles.length === 0) return;

        if (validFiles.length === 1 && index !== null && index < screenshots.length) {
            const updated = [...screenshots];
            updated[index] = validFiles[0];
            setScreenshots(updated);
        } else {
            const filteredScreenshots = screenshots.filter(s => s);
            setScreenshots([...filteredScreenshots, ...validFiles]);
        }
    };

    
    return (
        <div className="space-y-6">
            {/* El resto igual, solo la parte screenshots la muestro para foco */}

            <div className="space-y-2 text-center">
                <label className="label text-gray-700 mx-auto dark:text-gray-300">Screenshots</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
                    {screenshots.length === 0 && (
                        <p className="text-gray-500 mx-auto dark:text-gray-400">No hay screenshots añadidos.</p>
                    )}

                    {screenshots.map((file, index) => (
                        <div
                            key={index}
                            className="relative w-full aspect-video border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden dark:bg-slate-700"
                        >
                            <input
                            
                                id={`screenshot_${index}`}
                                name={`img_${index}`}
                                type="file"
                                accept="image/*"
                                multiple={index === screenshots.length - 1}
                                onChange={(e) => handleScreenshotChange(index, e.target.files)}
                                className={` absolute inset-0 w-full h-full z-10 ${
                                    file ? 'opacity-0 pointer-events-none' : 'opacity-0 cursor-pointer'
                                }`}
                            />

                            {file ? (
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={`Screenshot ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <label
                                    htmlFor={`screenshot_${index}`}
                                    className="flex items-center justify-center w-full h-full border-2 border-dashed border-gray-400 dark:border-gray-600 text-gray-500 dark:text-white text-sm cursor-pointer"
                                >
                                    Añadir screenshot
                                </label>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex justify-center space-x-4 mt-4">
                    {!screenshots.some(s => !s) && (
                        <button
                            type="button"
                            onClick={addScreenshot}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Añadir Screenshot
                        </button>
                    )}

                    {screenshots.length > 0 && (
                        <button
                            type="button"
                            onClick={removeAllScreenshots}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Eliminar todos
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
