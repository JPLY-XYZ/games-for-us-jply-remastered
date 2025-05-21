'use client'
import { updateUserProfileImagen } from '@/lib/actions';
import { Loader, Pencil, Save, X } from 'lucide-react';
import { useActionState, useEffect, useState } from 'react';

function EditImagePerfil({ user, ownership }) {
    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState(user.image);
    const [modified, setModified] = useState(false);

    const [state, action, pending] = useActionState(updateUserProfileImagen, {});

    useEffect(() => {
        if (!pending && state?.success) {
            setIsEditing(false);
            setModified(false);
        }
    }, [pending, state?.success]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result !== user.image) {
                    setImage(reader.result);
                    setModified(true);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="relative">
            <div className="flex flex-col items-center">
                {isEditing ? (
                    <div className="flex flex-col items-center">
                        <label htmlFor="imageInput" className="cursor-pointer relative">
                            <img
                                src={image}
                                alt="preview"
                                className="rounded-full border-4 border-white shadow-lg h-40 w-40 mb-2"
                            />
                        </label>
                        <form action={modified ? action : undefined} className="flex gap-4 mt-2 items-center">
                            <input
                                id="imageInput"
                                type="file"
                                name="img"
                                onChange={handleImageChange}
                                accept="image/*"
                                className="hidden"
                            />
                            <input type="hidden" name="id" value={user.id} />
                            <button
                                type="submit"
                                disabled={pending || !modified}
                                className={`absolute bottom-2 left-2 dark:text-gray-300 text-black p-1 rounded-full transition ${pending || !modified ? '' : 'hover:text-green-500 cursor-pointer'}`}
                            >
                                {!pending ? <Save className="w-8 h-8" /> : <Loader className="w-8 h-8 animate-spin" />}
                            </button>
                        </form>
                        <button
                            type="button"
                            disabled={pending}
                            onClick={() => {
                                setImage(user.image);
                                setIsEditing(false);
                                setModified(false);
                            }}
                            className="absolute bottom-2 right-2 dark:text-gray-300 text-black p-1 rounded-full hover:text-red-500 cursor-pointer transition"
                        >
                            <X className="w-8 h-8" />
                        </button>
                    </div>
                ) : (
                    <div>
                        <img
                            src={image}
                            alt="profile image"
                            className="rounded-full border-4 border-white shadow-lg h-40 w-40"
                            style={{ pointerEvents: 'none' }}
                        />
                        {ownership && (
                            <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                            >
                                <Pencil className="w-5 h-5 cursor-pointer" />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default EditImagePerfil;
