'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { createVideoContentAction } from "@/lib/actions";
import toast from "react-hot-toast";

const inputClass =
  "w-full p-3 text-base rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

const labelClass =
  "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

function extractYouTubeId(url) {
  try {
    const parsedUrl = new URL(url);
    if (
      parsedUrl.hostname === "www.youtube.com" ||
      parsedUrl.hostname === "youtube.com"
    ) {
      return parsedUrl.searchParams.get("v");
    }
    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1);
    }
    return null;
  } catch {
    return null;
  }
}

export default function FormularioTipoVideo({ gameId, user }) {
  const [state, action, pending] = useActionState(createVideoContentAction, {});
  const [useYoutube, setUseYoutube] = useState(false);
  const [localVideoFile, setLocalVideoFile] = useState(null);
  const [localPreview, setLocalPreview] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [youtubeId, setYoutubeId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/juego/" + gameId);
    }
  }, [state]);

  const handleLocalVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSizeMB = 50;
      if (file.size > maxSizeMB * 1024 * 1024) {
        toast.error(`El archivo es demasiado grande. Máximo permitido: ${maxSizeMB} MB.`);
        e.target.value = "";
        setLocalVideoFile(null);
        setLocalPreview(null);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setLocalVideoFile(file);
    }
  };

  const handleYoutubeUrlChange = (e) => {
    const url = e.target.value.trim();
    setYoutubeUrl(url);
    if (url === "") {
      setYoutubeId(null);
      return;
    }
    const id = extractYouTubeId(url);
    if (id) {
      setYoutubeId(id);
    } else {
      setYoutubeId(null);
    }
  };

  const toggleUseYoutube = () => {
    setUseYoutube(!useYoutube);
    setLocalVideoFile(null);
    setLocalPreview(null);
    setYoutubeUrl("");
    setYoutubeId(null);
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-900 min-h-screen flex items-center justify-center px-4 py-12  min-w-auto sm:min-w-[700px] md:min-w-[1200px]">
      <div className="relative bg-white dark:bg-slate-800 p-6 md:p-10 rounded-3xl shadow-2xl w-full max-w-4xl space-y-6">

        {pending && (
          <div className="absolute inset-0 bg-white/60 dark:bg-slate-800/60 z-20 flex items-center justify-center rounded-3xl">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white text-center">
          Subir video
        </h1>

        <form className="space-y-6" action={action}>
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
            <div className="w-full md:w-1/2">
              <label className={labelClass}>Título *</label>
              <input
                type="text"
                name="title"
                className={inputClass}
                placeholder="Título principal"
                required
              />
            </div>

            <div className="w-full md:w-1/2">
              <label className={labelClass}>Título corto</label>
              <input
                type="text"
                name="shortTitle"
                className={inputClass}
                placeholder="Resumen del título"
                required
              />
            </div>
          </div>

          <input type="hidden" name="userId" defaultValue={user?.id} />
          <input type="hidden" name="gameId" defaultValue={gameId} />
          <input type="hidden" name="type" defaultValue="VIDEO" />

          <div className="flex items-center space-x-2 mb-4">
            <input
              id="toggleUseYoutube"
              type="checkbox"
              checked={useYoutube}
              onChange={toggleUseYoutube}
              className="w-5 h-5"
              disabled={pending}
            />
            <label htmlFor="toggleUseYoutube" className="select-none text-gray-700 dark:text-gray-300">
              Usar URL de YouTube en lugar de subir un video
            </label>
          </div>

          {!useYoutube && (
            <div>
              <label className={labelClass}>Selecciona un video local</label>
              <h1 className="text-xs text-gray-500">El tamaño maximo de subida son 50MB</h1>
              <input
                type="file"
                name="video"
                accept="video/*"
                className={inputClass}
                onChange={handleLocalVideoChange}
                required={!useYoutube}
                disabled={pending}
              />
            </div>
          )}

          {useYoutube && (
            <div>
              <label className={labelClass}>Pega una URL de YouTube</label>
              <h1 className="text-xs text-gray-500">Solo se permiten Urls de Youtube</h1>
              <input
                type="url"
                name="youtubeUrl"
                className={inputClass}
                placeholder="https://www.youtube.com/watch?v=..."
                value={youtubeUrl}
                onChange={handleYoutubeUrlChange}
                required={useYoutube}
                disabled={pending}
              />
            </div>
          )}

          {localPreview && !useYoutube && (
            <div>
              <p className="text-gray-700 dark:text-gray-300 mb-2">Previsualización del video local:</p>
              <div className="aspect-video w-full overflow-hidden rounded-xl shadow-md bg-slate-200 dark:bg-slate-700">
                <video
                  src={localPreview}
                  controls
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
            </div>
          )}

          {youtubeId && useYoutube && (
            <div>
              <p className="text-gray-700 dark:text-gray-300 mb-2">Previsualización de YouTube:</p>
              <div className="aspect-video w-full overflow-hidden rounded-xl shadow-md bg-black">
                <iframe
                  className="w-full h-full rounded-xl"
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title="YouTube video preview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold shadow-md transition-all"
              disabled={pending}
            >
              {pending ? "Subiendo video ..." : "Publicar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
