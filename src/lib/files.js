// lib/files.js
"use server";

import cloudinary from "cloudinary";
import { randomUUID } from "crypto";

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Convierte un objeto `File` del browser a un Buffer
async function fileToBuffer(file) {
  if (file.arrayBuffer) {
    const buffer = Buffer.from(await file.arrayBuffer());
    return buffer;
  }

  const stream = file.stream();
  const reader = stream.getReader();
  const chunks = [];
  
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  return Buffer.concat(chunks);
}

export async function uploadFile(file, userId) {
  console.log("📤 Subiendo archivo:", file.name, "de", userId);

  if (!file || !userId) throw new Error("Faltan datos.");

  const buffer = await fileToBuffer(file);

  // Subir a Cloudinary
  const uploadResponse = await new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload_stream(
      {
        folder: `uploads/${userId}`, // Carpeta en Cloudinary donde se almacenarán los archivos
        public_id: randomUUID(), // Nombre único para cada archivo
        resource_type: "auto", // Deja que Cloudinary detecte el tipo de archivo
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    ).end(buffer); // Enviar el archivo como buffer a Cloudinary
  });

  // Retornar la URL pública del archivo cargado
  return uploadResponse.secure_url;
}
