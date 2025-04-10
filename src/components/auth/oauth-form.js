
function OauthForm({user = {imgURL:"https://placehold.co/600x600?text=?", email:"EXAMPLE@EXAMPLE.EXAMPLE"}, platform = "NOTHING"}) {

  // user = {imgURL:"url de la imagen", email:"email del usuario"}

  return (
    <div className="flex flex-col items-center justify-center bg-gray-500 dark:bg-gray-800 w-full max-w-md rounded-lg shadow-md p-6">
     
      <h2 className="text-3xl  font-bold text-gray-200 mb-4">
        Registro con la plataforma {platform}
      </h2>


    
      <img
        src={user.imgURL}  
        alt="Usuario"
        className="w-24 h-24 rounded-full border-4 border-blue-500 mb-4"
      />

      <p className="text-lg text-gray-200 mb-4">{user.email}</p>

      <h2 className="text-2xl font-bold text-gray-200 mb-4">Mas Información</h2>
      <form className="w-full">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="NickName"
            required
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          />

          <input
            type="date"
            name="birthDate"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          />

          <select
            name="country"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          >
            <option value="" disabled>Selecciona un país</option>
            <option value="Argentina">Argentina</option>
            <option value="Brasil">Brasil</option>
            <option value="Chile">Chile</option>
            <option value="México">México</option>
            <option selected value="España">España</option>
            <option value="Colombia">Colombia</option>
            <option value="Perú">Perú</option>
            <option value="Venezuela">Venezuela</option>
            <option value="Francia">Francia</option>
            <option value="Alemania">Alemania</option>
          </select>

          <button
            type="submit"
            className="cursor-pointer bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
          >
            Finalizar
          </button>

         
        </div>
      </form>
    </div>
  )
}

export default OauthForm


