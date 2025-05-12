'use client'
import { updateUserData } from '@/lib/actions';
import { useState } from 'react';

function OauthForm({ user = { imgURL: "https://placehold.co/600x600?text=?", email: "EXAMPLE@EXAMPLE.EXAMPLE" }, platform = "NOTHING" }) {
  const [profileImg, setProfileImg] = useState(null); // Para la imagen de perfil
  const [backgroundImg, setBackgroundImg] = useState(null); // Para la imagen de fondo
  const [name, setName] = useState(user.name || ''); // Para el nombre de usuario
  const [birthDate, setBirthDate] = useState(user.birthDate || ''); // Para la fecha de nacimiento
  const [country, setCountry] = useState(user.country || ''); // Para el país
  const [bio, setBio] = useState(user.bio || ''); // Para la biografía
  const [isPending, setIsPending] = useState(false); // Para el estado de la carga

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      // Crear URL para vista previa sin cambiar el archivo
      if (type === "profile") {
        setProfileImg(URL.createObjectURL(file)); // Asigna la URL del archivo para la vista previa
      } else if (type === "background") {
        setBackgroundImg(URL.createObjectURL(file)); // Asigna la URL del archivo para la vista previa
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const formData = new FormData();
      formData.append('id', user.id);
      formData.append('name', name);
      formData.append('birthDate', birthDate);
      formData.append('bio', bio);
      formData.append('country', country);

      if (profileImg instanceof File) {
        formData.append('image', profileImg); // Asegúrate de enviar el archivo
      }
      if (backgroundImg instanceof File) {
        formData.append('backgroundImage', backgroundImg); // Asegúrate de enviar el archivo
      }

      await updateUserData(user.id, formData);
      alert('Usuario actualizado correctamente');
    } catch (error) {
      console.error('Error actualizando usuario:', error);
      alert('Hubo un error al actualizar el usuario');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-500 dark:bg-gray-800 w-full max-w-md rounded-lg shadow-md p-6">
      <h2 className="text-3xl font-bold text-gray-200 mb-4">
        Registro con la plataforma {platform}
      </h2>
      <h4>Por motivos de seguridad se necesitan rellenar este formulario para completar los datos del usuario</h4>

      <img
        src={profileImg || user.imgURL}
        alt="Usuario"
        className="w-24 h-24 rounded-full border-4 border-blue-500 mb-4"
      />
      
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageChange(e, "profile")}
        className="mb-4"
        name='image'
      />

      <p className="text-lg text-gray-200 mb-4">{user.email}</p>

      <h2 className="text-2xl font-bold text-gray-200 mb-4">Más Información</h2>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="NickName"
            required
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          />

          <input type="hidden" name="id" value={user.id} />

          <input
            type="date"
            name="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          />

          <select
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          >
            <option value="" disabled>Selecciona un país</option>
            <option value="Argentina">Argentina</option>
            <option value="Brasil">Brasil</option>
            <option value="Chile">Chile</option>
            <option value="México">México</option>
            <option value="España">España</option>
            <option value="Colombia">Colombia</option>
            <option value="Perú">Perú</option>
            <option value="Venezuela">Venezuela</option>
            <option value="Francia">Francia</option>
            <option value="Alemania">Alemania</option>
          </select>

          <textarea
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Biografía"
            rows="4"
            required
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          ></textarea>

          <div className="mt-4">
            <p className="text-gray-200">Sube una imagen para el fondo de perfil</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "background")}
              className="mb-4"
              name='backgroundImage'
            />
            {backgroundImg && (
              <div className="w-full h-32 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImg})` }} />
            )}
          </div>

          <button
            type="submit"
            className="cursor-pointer bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
          >
            {isPending ? "Finalizando..." : "Finalizar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default OauthForm;
