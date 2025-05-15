'use client'
import { useState } from 'react';
import { X } from 'lucide-react';

export function MultimediaJuego() {
    const [screenshots, setScreenshots] = useState([null]);
    const [imagePreviews, setImagePreviews] = useState({
        thumbUrl: "",
        bannerUrl: "",
        coverUrl: "",
    });

    const addScreenshot = () => setScreenshots([...screenshots, null]);

    const removeScreenshot = (index) => {
        if (index === 0) return;
        const updated = screenshots.filter((_, i) => i !== index);
        setScreenshots(updated);
    };

    const handleScreenshotChange = (index, file) => {
        const updated = [...screenshots];
        updated[index] = file;
        setScreenshots(updated);
    };

    const handleImageChange = (event, field) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews((prev) => ({ ...prev, [field]: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Multimedia y enlaces</h2>

            {/* Banner */}
            <div>
                <label className="label">Banner</label>
                <input
                name='banner'
                    type="file"
                    onChange={(e) => handleImageChange(e, 'bannerUrl')}
                    className={inputClass}
                />
                {imagePreviews.bannerUrl && (
                    <img
                        src={imagePreviews.bannerUrl}
                        alt="Banner Preview"
                        className="mt-2 w-full aspect-[18/5] object-cover"
                    />
                )}
            </div>

            {/* Video + Thumbnail */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Video */}
                <div>
                    
                    {/* Cover */}
                    <div className='mt-2'>
                        <label className="label">Cover</label>
                        <input
                        name='cover'
                            type="file"
                            onChange={(e) => handleImageChange(e, 'coverUrl')}
                            className={inputClass}
                        />
                        {imagePreviews.coverUrl && (
                            <img
                                src={imagePreviews.coverUrl}
                                alt="Cover Preview"
                                className="mt-2 w-full aspect-[15/9] object-cover"
                            />
                        )}
                    </div>
                </div>

                {/* Thumbnail */}
                <div>
                    <label className="label">Thumbnail</label>
                    <input
                    name='thumbnail'
                        type="file"
                        onChange={(e) => handleImageChange(e, 'thumbUrl')}
                        className={inputClass}
                    />
                    {imagePreviews.thumbUrl && (
                        <img
                            src={imagePreviews.thumbUrl}
                            alt="Thumbnail Preview"
                            className="mt-2 w-full aspect-[3/4] object-cover"
                        />
                    )}

                </div>


            </div>
            {/* Enlace tienda */}
            <div>
                <label className="label">Enlace tienda</label>
                <input name="shopLink" placeholder="Enlace tienda" className={inputClass} />
            </div>
            {/* Screenshots */}
            <div className="space-y-2">
                <label className="label text-gray-700 dark:text-gray-300">Screenshots</label>
                {screenshots.map((file, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="w-full flex items-center space-x-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white">
                            <input
                             name={`img_${index}`}
                                type="file"
                                onChange={(e) => handleScreenshotChange(index, e.target.files[0])}
                                className="w-full p-3 rounded-md dark:bg-slate-700 dark:text-white"
                            />
                            {index > 0 && (
                                <div className="flex items-center space-x-2">
                                    <div className="border-l border-gray-300 dark:border-gray-600 h-6"></div>
                                    <button
                                        type="button"
                                        onClick={() => removeScreenshot(index)}
                                        className="p-2 text-red-500 hover:text-red-700"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {file && (
                         <div className="w-[1000px] aspect-video overflow-hidden rounded-md border border-gray-300 dark:border-gray-600">
                         <img
                           src={URL.createObjectURL(file)}
                           alt={`Screenshot ${index + 1} Preview`}
                           className="w-full h-full object-cover"
                         />
                       </div>
                       
                       
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addScreenshot}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Añadir Screenshot
                </button>
            </div>


        </div>
    );
}

const inputClass = "w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white";
