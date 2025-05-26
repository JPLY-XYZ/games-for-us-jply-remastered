'use client'
import { updateUserBackImagen } from '@/lib/actions';
import { Loader, Pencil, Save, X } from 'lucide-react';
import { useActionState, useEffect, useId, useRef, useState } from 'react';
import toast from 'react-hot-toast';

function EditImageFondo({ user, ownership, children }) {
    const key = useId();
    const [isEditing, setIsEditing] = useState(false);
    const [imagePreview, setImagePreview] = useState(user.backgroundImage);
    const fileInputRef = useRef(null);

    const [state, action, pending] = useActionState(updateUserBackImagen, {});

    useEffect(() => {
        if (!pending && state?.success) {
            setIsEditing(false);
        }
    }, [pending, state?.success]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file.size > 4 * 1024 * 1024) { // 4 MB en bytes
       toast.error("La imagen no puede pesar más de 4 MB.");
      return;
    }

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (formData) => {
        if (imagePreview === user.backgroundImage) {
            return; // no ha cambiado la imagen, no hacemos nada
        }
        return action(formData);
    };

    return (
        <div className="relative w-full h-60 overflow-hidden rounded-lg shadow">
            <form action={handleSubmit} className="absolute inset-0">
                <input
                    ref={fileInputRef}
                    id="imageInputBack"
                    type="file"
                    name="img"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />
                <input type="hidden" name="id" value={user.id} />

                {isEditing ? (
                    <label htmlFor="imageInputBack" className="absolute inset-0 cursor-pointer">
                        <img
                            src={imagePreview}
                            alt="banner"
                            className="w-full h-full object-cover absolute inset-0"
                        />
                    </label>
                ) : (
                    <img
                        src={imagePreview}
                        alt="banner"
                        className="w-full h-full object-cover absolute inset-0"
                    />
                )}

                {isEditing && (
                    <div key={key} className="absolute bottom-2 right-2 flex gap-2">
                        <button
                            type="submit"
                            disabled={pending || !fileInputRef.current?.files.length || imagePreview === user.backgroundImage}
                            className={`text-green-700 p-1 rounded-full transition ${pending || !fileInputRef.current?.files.length || imagePreview === user.backgroundImage ? '' : 'hover:text-green-500 cursor-pointer'
                                }`}

                            title="Guardar cambios"
                        >
                            {!pending ? <Save className="w-6 h-6" /> : <Loader className="w-6 h-6 animate-spin" />}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setIsEditing(false);
                                setImagePreview(user.backgroundImage);
                            }}
                            className="text-red-700 cursor-pointer hover:text-red-500 p-1 rounded-full"
                            title="Cancelar"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                )}
            </form>

            {!isEditing && ownership && (
                <button
                    onClick={() => setIsEditing(true)}
                    className="absolute top-2 right-2 text-white cursor-pointer hover:text-gray-300 p-1 rounded-full"
                    title="Editar fondo"
                >
                    <Pencil className="w-6 h-6" />
                </button>
            )}
        </div>
    );
}

export default EditImageFondo;
