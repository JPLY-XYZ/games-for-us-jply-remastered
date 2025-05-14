    'use client'

    import { useEffect, useState } from "react";
    import { useRouter } from "next/navigation";
    import { useActionState } from "react";
    import { createVideoContentAction } from "@/lib/actions";

    const inputClass =
    "w-full p-3 text-base rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

    const labelClass =
    "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

    export default function FormularioTipoVideo({ gameId, user }) {
    const [state, action, pending] = useActionState(createVideoContentAction, {});
    const [preview, setPreview] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (state?.success) {
        router.push("/juego/" + gameId);
        }
    }, [state]);

    const handlePreview = (e) => {
        const file = e.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
        }
    };

    return (
        <div className="bg-slate-100 dark:bg-slate-900 min-h-screen flex items-center w-[80%] justify-center px-4 py-12">
        <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-2xl w-full space-y-6">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center">
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

                <input type="hidden" name="userId" defaultValue={user?.id} />
                <input type="hidden" name="gameId" defaultValue={gameId} />
                <input type="hidden" name="type" defaultValue="VIDEO" />

                <div className="w-full md:w-1/2">
                <label className={labelClass}>Título corto</label>
                <input
                    type="text"
                    name="shortTitle"
                    className={inputClass}
                    placeholder="Resumen del título"
                />
                </div>
            </div>

            <div>
                <label className={labelClass}>Selecciona un video</label>
                <input
                type="file"
                name="video"
                accept="video/*"
                className={inputClass}
                required
                onChange={handlePreview}
                />
            </div>

            {preview && (
                <div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">Previsualización:</p>
                <div className="aspect-[16/9] w-full overflow-hidden rounded-xl shadow-md bg-slate-200 dark:bg-slate-700">
                    <video
                    src={preview}
                    controls
                    className="w-full h-full object-contain rounded-xl"
                    />
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
