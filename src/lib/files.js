"use server";

import cloudinary from "cloudinary";
import { randomUUID } from "crypto";

// configuracion de cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

  // subir a cloudinary
  const uploadResponse = await new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload_stream(
      {
        folder: `uploads/${userId}`, // carpeta en cloudinari donde se almacenaran los archivos
        public_id: randomUUID(), // nombre unico para cada archivo
        resource_type: "auto", // dejar que cloudinary detecte el tipo de archivo
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    ).end(buffer); // enviar el archivo como buffer a cloudinary
  });

  // URL publica del archivo cargado
  return uploadResponse.secure_url;
}
