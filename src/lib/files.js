// lib/files.js
"use server";

import fs from "fs";
import path from "path";
import { promisify } from "util";
import { randomUUID } from "crypto";

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
  
    const uploadDir = path.join(process.cwd(), "public", "uploads", userId);
    fs.mkdirSync(uploadDir, { recursive: true });
  
    const ext = path.extname(file.name).toLowerCase();
    const randomName = `${randomUUID()}${ext}`;
    const filepath = path.join(uploadDir, randomName);
  
    await promisify(fs.writeFile)(filepath, buffer);
  
    return `/uploads/${userId}/${randomName}`
    ;
  }
  