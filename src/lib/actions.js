'use server'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import { auth, signIn, signOut } from '@/auth';
import { buscar, createNewContent, getUserByEmail, getUserById, newComment, reportComment, reportContent, reportGame, reportUser, setFavoriteGame } from '@/lib/data';
import { revalidatePath } from 'next/cache';
import { uploadFile } from './files';
import { updateUser,  updateUserProfileBackImagen, updateUserProfilePerfileImagen } from './games/data';
import { profile } from 'console';


// REGISTER
export async function register(prevState, formData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')

  // Comprobamos si el usuario ya está registrado
  const user = await getUserByEmail(email);

  if (user) {
    return {
      error: 'El email ya está registrado',
      fields: Object.fromEntries(formData.entries())
    }
  }

  // Encriptamos password 
  const hashedPassword = await bcrypt.hash(password, 10)

  // Guardamos credenciales en base datos
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })

  return { success: "Registro correcto" }
}



// LOGIN credentials
export async function login(prevState, formData) {
  const email = formData.get('email')
  const password = formData.get('password')

  // Comprobamos si el usuario está registrado
  const user = await getUserByEmail(email);

  if (!user) {
    return {
      error: 'Usuario no registrado.',
      fields: Object.fromEntries(formData.entries())
    }
  }

  // Comparamos password 
  const matchPassword = await bcrypt.compare(password, user.password)

  if (user && matchPassword) {  // && user.emailVerified
    await signIn('credentials',
      {
        email, password,
        redirectTo: globalThis.callbackUrl
      })
    return { success: "Inicio de sesión correcto" }
  } else {
    return {
      error: 'Credenciales incorrectas.',
      fields: Object.fromEntries(formData.entries())
    }
  }

}

// LOGIN google
export async function loginGoogle() {
  try {
    await signIn('google', { redirectTo: globalThis.callbackUrl })
  } catch (error) {
    console.log(error);
    throw error
  }
}

// LOGIN steam
export async function loginReddit() {
  try {
    await signIn('reddit', { redirectTo: globalThis.callbackUrl })
  } catch (error) {
    console.log(error);
    throw error
  }
}


// LOGIN discord
export async function loginDiscord() {
  try {
    await signIn('discord', { redirectTo: globalThis.callbackUrl })
  } catch (error) {
    console.log(error);
    throw error
  }
}


// LOGOUT
export async function logout() {
  try {
    await signOut({ redirectTo: '/' })
  } catch (error) {
    throw error
  }
}





export async function enviarComentario(prevState, formData) {
  const comentario = formData.get('comentario');
  const rating = Number(formData.get('rating'));
  const gameId = Number(formData.get('gameId'));
  const contentId = Number(formData.get('contentId'));
  const path = formData.get('path');

  console.log(comentario, rating, gameId, contentId)

  if (!comentario || (!gameId && !contentId) || (gameId && contentId)) {
    return { success: false, error: 'Datos inválidos.' };
  }

  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, error: 'Usuario no autenticado.' };
  }

  const data = {
    text: comentario,
    score: rating || null,
    user: { connect: { id: userId } },
    ...(gameId ? { game: { connect: { id: gameId } } } : {}),
    ...(contentId ? { content: { connect: { id: contentId } } } : {})
  };

  revalidatePath(path)

  try {
    const comment = await newComment(data);
    return { success: true, comment };
  } catch (err) {
    return { success: false, error: err.message };
  }
}



export async function buscarTodoServer(query) {
  return await buscar(query)
}


export async function createImageContentAction(prevState, formData) {
  try {
    console.log("📥 Recibido formData");

    console.log(formData)
    const userId = formData.get("userId");
    const gameId = parseInt(formData.get("gameId"));
    const type = formData.get("type");
    const title = formData.get("title");
    const shortTitle = formData.get("shortTitle") || null;

    console.log("🧾 Extraídos datos:");
    console.log({ userId, gameId, type, title, shortTitle });

    if (type !== "IMAGEN") {
      console.warn("⚠️ Tipo de contenido no es IMAGEN, abortando.");
      return { error: "Tipo de contenido no válido" };
    }

    const imgFile = formData.get("img");

    if (!imgFile || typeof imgFile === "string") {
      console.error("🚫 Archivo de imagen no encontrado o inválido");
      return { error: "Falta el archivo de imagen" };
    }

    console.log("🖼 Subiendo imagen...");
    const imgUrl = await uploadFile(imgFile, userId);
    console.log("✅ Imagen subida:", imgUrl);

    const urls = { img: imgUrl };

    console.log("🛠 Creando nuevo contenido en base de datos...");
    const content = await createNewContent({
      userId,
      gameId,
      type,
      title,
      shortTitle,
      text: null,
      score: null,
      urls,
      moreInfo: null,
    });

    console.log("🎉 Contenido creado con éxito:", content.id);
    return { success: true, content };
  } catch (error) {
    console.error("❌ Error en createImageContentAction:", error);
    return { error: error.message || "Error desconocido" };
  }
}

export async function createVideoContentAction(prevState, formData) {
  try {
    console.log("📥 Recibido formData");

    console.log(formData);
    const userId = formData.get("userId");
    const gameId = parseInt(formData.get("gameId"));
    const type = formData.get("type");
    const title = formData.get("title");
    const shortTitle = formData.get("shortTitle") || null;

    console.log("🧾 Extraídos datos:");
    console.log({ userId, gameId, type, title, shortTitle });

    if (type !== "VIDEO") {
      console.warn("⚠️ Tipo de contenido no es VIDEO, abortando.");
      return { error: "Tipo de contenido no válido" };
    }

    const File = formData.get("video");

    if (!File || typeof File === "string") {
      console.error("🚫 Archivo de video no encontrado o inválido");
      return { error: "Falta el archivo de video" };
    }

    console.log("🎥 Subiendo video...");
    const videoUrl = await uploadFile(File, userId);
    console.log("✅ Video subido:", videoUrl);

    const urls = { video: videoUrl };

    console.log("🛠 Creando nuevo contenido en base de datos...");
    const content = await createNewContent({
      userId,
      gameId,
      type,
      title,
      shortTitle,
      text: null,
      score: null,
      urls,
      moreInfo: null,
    });

    console.log("🎉 Contenido creado con éxito:", content.id);
    return { success: true, content };
  } catch (error) {
    console.error("❌ Error en createVideoContentAction:", error);
    return { error: error.message || "Error desconocido" };
  }
}



export async function createResenaContentAction(prevState, formData) {
  try {
    console.log('📥 formData recibido:', formData);

    if (!formData || typeof formData.get !== 'function') {
      console.error('❌ formData no es válido o no tiene .get');
      return { error: 'formData no válido' };
    }

    const userId = formData.get("userId");
    const gameId = parseInt(formData.get("gameId"));
    const type = formData.get("type");
    const title = formData.get("titulo");
    const shortTitle = formData.get("tituloCorto") || null;
    const text = formData.get("texto");

    console.log('✅ Campos principales:', { userId, gameId, type, title, shortTitle, text });

    if (type !== "RESEÑA") {
      console.warn("⚠️ Tipo de contenido no es RESEÑA, abortando.");
      return { error: "Tipo de contenido no válido" };
    }

    const bannerFile = formData.get("banner");
    console.log("🖼 banner recibido:", bannerFile?.name || 'No hay banner');

    let bannerUrl = null;
    if (bannerFile && typeof bannerFile !== 'string') {
      bannerUrl = await uploadFile(bannerFile, userId);
      console.log("✅ Banner subido:", bannerUrl);
    }

    const thumbnailFile = formData.get("thumbnail");
    console.log("🖼 thumbnail recibido:", thumbnailFile?.name || 'No hay thumbnail');

    let thumbnailUrl = null;
    if (thumbnailFile && typeof thumbnailFile !== 'string') {
      thumbnailUrl = await uploadFile(thumbnailFile, userId);
      console.log("✅ Thumbnail subido:", thumbnailUrl);
    }


    const urls = {
      imgs: {
        banner: bannerUrl,
        thumbnail: thumbnailUrl,
        otherImages: [],
      }
    };




    // Subir imágenes (img_0, img_1, etc.)
    for (let [key, value] of formData.entries()) {
      if (key.startsWith("img_") && value && typeof value !== "string") {
        console.log(`📸 Subiendo imagen ${key}...`);
        const url = await uploadFile(value, userId);
        urls.imgs.otherImages.push(url);
        console.log(`✅ Imagen ${key} subida:`, url);
      }
    }
    const moreInfo = {
      sonido: formData.get("sonido"),
      errores: formData.get("errores"),
      graficos: formData.get("graficos"),
      historia: formData.get("historia"),
      requisitos: formData.get("requisitos"),
      precioCalidad: formData.get("precioCalidad"),
      recomendacion: formData.get("recomendacion"),
      duracion: {
        total: formData.get("duracion_total"),
        historia: formData.get("duracion_historia"),
        secundarias: formData.get("duracion_secundarias"),
      },
      dificultad: formData.get("dificultad"),
      modos: formData.getAll("modos"), // <-- cuidado, esto es getAll porque son checkboxes
    };

    console.log("ℹ️ moreInfo armado:", moreInfo);


    console.log("🛠 Creando contenido en DB...");
    const content = await createNewContent({
      userId,
      gameId,
      type,
      title,
      shortTitle,
      text,
      score: null,
      urls,
      moreInfo,
    });

    console.log("🎉 Contenido creado con éxito:", content?.id);
    return { success: true, content };
  } catch (error) {
    console.error("❌ Error en createResenaContentAction:", error);
    return { error: error.message || "Error desconocido" };
  }
}




export async function createNoticiaContentAction(prevState, formData) {
  try {
    console.log('📥 formData recibido:', formData);

    if (!formData || typeof formData.get !== 'function') {
      console.error('❌ formData no es válido o no tiene .get');
      return { error: 'formData no válido' };
    }

    const userId = formData.get("userId");
    const gameId = parseInt(formData.get("gameId"));
    const type = formData.get("type");
    const title = formData.get("titulo");
    const shortTitle = formData.get("tituloCorto") || null;
    const text = formData.get("texto");

    console.log('✅ Campos principales:', { userId, gameId, type, title, shortTitle, text });

    if (type !== "NOTICIA") {
      console.warn("⚠️ Tipo de contenido no es NOTICIA, abortando.");
      return { error: "Tipo de contenido no válido" };
    }

    const bannerFile = formData.get("banner");
    console.log("🖼 banner recibido:", bannerFile?.name || 'No hay banner');

    let bannerUrl = null;
    if (bannerFile && typeof bannerFile !== 'string') {
      bannerUrl = await uploadFile(bannerFile, userId);
      console.log("✅ Banner subido:", bannerUrl);
    }

    const thumbnailFile = formData.get("thumbnail");
    console.log("🖼 thumbnail recibido:", thumbnailFile?.name || 'No hay thumbnail');

    let thumbnailUrl = null;
    if (thumbnailFile && typeof thumbnailFile !== 'string') {
      thumbnailUrl = await uploadFile(thumbnailFile, userId);
      console.log("✅ Thumbnail subido:", thumbnailUrl);
    }


    const urls = {
      imgs: {
        banner: bannerUrl,
        thumbnail: thumbnailUrl,
        otherImages: [],
      }
    };




    // Subir imágenes (img_0, img_1, etc.)
    for (let [key, value] of formData.entries()) {
      if (key.startsWith("img_") && value && typeof value !== "string") {
        console.log(`📸 Subiendo imagen ${key}...`);
        const url = await uploadFile(value, userId);
        urls.imgs.otherImages.push(url);
        console.log(`✅ Imagen ${key} subida:`, url);
      }
    }


    console.log("🛠 Creando contenido en DB...");
    const content = await createNewContent({
      userId,
      gameId,
      type,
      title,
      shortTitle,
      text,
      score: null,
      urls,
    });

    console.log("🎉 Contenido creado con éxito:", content?.id);
    return { success: true, content };
  } catch (error) {
    console.error("❌ Error en createNoticiaContentAction:", error);
    return { error: error.message || "Error desconocido" };
  }
}

// update
export async function updateImageContentAction(prevState, formData) {
  try {
    console.log("✏️ Editando contenido de imagen");

    const contentId = parseInt(formData.get("contentId"));
    const userId = formData.get("userId");
    const title = formData.get("title");
    const shortTitle = formData.get("shortTitle") || null;
    const newImgFile = formData.get("img");

    console.log("🧾 Datos recibidos:", { contentId, userId, title, shortTitle });

    // Traer el contenido actual
    const existingContent = await prisma.content.findUnique({
      where: { id: contentId },
    });

    if (!existingContent) {
      console.error("🚫 Contenido no encontrado");
      return { error: "Contenido no encontrado" };
    }

    // Si hay imagen nueva, subirla
    let imgUrl = existingContent.urls?.img || null;
    if (newImgFile && typeof newImgFile !== "string") {
      console.log("🖼 Subiendo nueva imagen...");
      imgUrl = await uploadFile(newImgFile, userId);
    }

    // Actualizar en la BD
    const updated = await prisma.content.update({
      where: { id: contentId },
      data: {
        title,
        shortTitle,
        urls: {
          ...existingContent.urls,
          img: imgUrl,
        },
      },
    });

    console.log("✅ Contenido actualizado:", updated.id);
    return { success: true, content: updated };
  } catch (error) {
    console.error("❌ Error al actualizar contenido:", error);
    return { error: error.message || "Error desconocido" };
  }
}

export async function updateVideoContentAction(prevState, formData) {
  try {
    console.log("📥 Actualizando Video");

    const contentId = formData.get("contentId");
    if (!contentId) return { error: "contentId no encontrado" };

    const userId = formData.get("userId");
    const gameId = parseInt(formData.get("gameId"));
    const type = formData.get("type");
    const title = formData.get("title");
    const shortTitle = formData.get("shortTitle") || null;
    const currentVideoUrl = formData.get("currentVideoUrl"); // Obtener la URL del video actual

    if (type !== "VIDEO") return { error: "Tipo de contenido no válido" };

    const existing = await prisma.content.findUnique({ where: { id: Number(contentId) } });
    if (!existing) return { error: "Contenido no encontrado" };

    const videoFile = formData.get("video");

    // Si no se selecciona un nuevo video, mantenemos la URL anterior
    let videoUrl = currentVideoUrl || existing.urls?.video;

    if (videoFile && typeof videoFile !== "string") {
      console.log("🎥 Subiendo video...");
      videoUrl = await uploadFile(videoFile, userId); // Subir el nuevo video
    }

    const urls = { ...existing.urls, video: videoUrl };

    const updated = await prisma.content.update({
      where: { id: Number(contentId) },
      data: {
        userId,
        gameId,
        type,
        title,
        shortTitle,
        urls,
      },
    });

    console.log("✅ Contenido actualizado:", updated.id);
    return { success: true, content: updated };
  } catch (error) {
    console.error("❌ Error al actualizar Video:", error);
    return { error: error.message || "Error desconocido" };
  }
}

export async function updateResenaContentAction(prevState, formData) {
  try {
    console.log("📥 Actualizando Reseña");

    const contentId = formData.get("contentId");
    if (!contentId) return { error: "contentId no encontrado" };

    const userId = formData.get("userId");
    const gameId = parseInt(formData.get("gameId"));
    const type = formData.get("type");
    const title = formData.get("titulo");
    const shortTitle = formData.get("tituloCorto") || null;
    const text = formData.get("texto");

    if (type !== "RESEÑA") return { error: "Tipo de contenido no válido" };

    const existing = await prisma.content.findUnique({ where: { id: Number(contentId) } });
    if (!existing) return { error: "Contenido no encontrado" };

    // Banner
    const bannerFile = formData.get("banner");
    let bannerUrl = existing.urls?.imgs?.banner || null;
    if (bannerFile && typeof bannerFile !== "string" && bannerFile.size > 0) {
      bannerUrl = await uploadFile(bannerFile, userId);
    }

    // Thumbnail
    const thumbnailFile = formData.get("thumbnail");
    let thumbnailUrl = existing.urls?.imgs?.thumbnail || null;
    if (thumbnailFile && typeof thumbnailFile !== "string" && thumbnailFile.size > 0) {
      thumbnailUrl = await uploadFile(thumbnailFile, userId);
    }

    // Capturas adicionales
    const indexedImages = [];
    for (let [key, value] of formData.entries()) {
      if (key.startsWith("img_")) {
        const index = parseInt(key.split("_")[1], 10);
        if (value && typeof value !== "string" && value.size > 0) {
          const url = await uploadFile(value, userId);
          if (url) indexedImages[index] = url;
        } else {
          const preserved = formData.get(`imgUrl_${index}`);
          if (typeof preserved === "string") {
            indexedImages[index] = preserved;
          }
        }
      }
    }

    const finalOtherImages = indexedImages.filter(Boolean);

    const urls = {
      imgs: {
        banner: bannerUrl,
        thumbnail: thumbnailUrl,
        otherImages: finalOtherImages,
      },
    };

    const moreInfo = {
      ...existing.moreInfo,
      sonido: formData.get("sonido"),
      errores: formData.get("errores"),
      graficos: formData.get("graficos"),
      historia: formData.get("historia"),
      requisitos: formData.get("requisitos"),
      precioCalidad: formData.get("precioCalidad"),
      recomendacion: formData.get("recomendacion"),
      duracion: {
        total: formData.get("duracion_total"),
        historia: formData.get("duracion_historia"),
        secundarias: formData.get("duracion_secundarias"),
      },
      dificultad: formData.get("dificultad"),
      modos: formData.getAll("modos"),
    };

    const updated = await prisma.content.update({
      where: { id: Number(contentId) },
      data: {
        userId,
        gameId,
        type,
        title,
        shortTitle,
        text,
        urls,
        moreInfo,
      },
    });

    console.log("✅ Contenido actualizado:", updated.id);
    return { success: true, content: updated };
  } catch (error) {
    console.error("❌ Error al actualizar Reseña:", error);
    return { error: error.message || "Error desconocido" };
  }
}





export async function updateNoticiaContentAction(prevState, formData) {
  try {
    console.log('📥 Actualizando Noticia');

    const contentId = formData.get("contentId");
    if (!contentId) return { error: "contentId no encontrado" };

    const userId = formData.get("userId");
    const gameId = parseInt(formData.get("gameId"));
    const type = formData.get("type");
    const title = formData.get("titulo");
    const shortTitle = formData.get("tituloCorto") || null;
    const text = formData.get("texto");

    if (type !== "NOTICIA") return { error: "Tipo de contenido no válido" };

    const existingContent = await prisma.content.findUnique({ where: { id: Number(contentId) } });
    if (!existingContent) return { error: "Contenido no encontrado" };

    // Mantener las imágenes previas
    let bannerUrl = existingContent.urls?.imgs?.banner || null;
    let thumbnailUrl = existingContent.urls?.imgs?.thumbnail || null;
    const previousOtherImages = existingContent.urls?.imgs?.otherImages || [];

    // Procesar banner si se envía un archivo nuevo
    const bannerFile = formData.get("banner");
    if (bannerFile && typeof bannerFile !== "string" && bannerFile.size > 0) {
      bannerUrl = await uploadFile(bannerFile, userId);
    }

    // Procesar thumbnail si se envía un archivo nuevo
    const thumbnailFile = formData.get("thumbnail");
    if (thumbnailFile && typeof thumbnailFile !== "string" && thumbnailFile.size > 0) {
      thumbnailUrl = await uploadFile(thumbnailFile, userId);
    }

    // Procesar imágenes adicionales (mantener las previas si no se reemplazan)
    const updatedOtherImages = [...previousOtherImages]; // Mantener las imágenes previas

    for (let [key, value] of formData.entries()) {
      if (key.startsWith("img_")) {
        const index = parseInt(key.split("_")[1], 10);
        if (value && typeof value !== "string" && value.size > 0) {
          // Subir nuevo archivo y reemplazar imagen en la posición correspondiente
          const url = await uploadFile(value, userId);
          updatedOtherImages[index] = url;
        } else {
          // Si no hay archivo nuevo, mantén la imagen anterior (solo si existe)
          const preserved = formData.get(`imgUrl_${index}`);
          if (typeof preserved === "string" && preserved) {
            updatedOtherImages[index] = preserved;
          }
        }
      }
    }

    // Filtrar las imágenes adicionales (quitar valores nulos)
    const finalOtherImages = updatedOtherImages.filter(Boolean);

    // Datos finales de URLs
    const urls = {
      imgs: {
        banner: bannerUrl,
        thumbnail: thumbnailUrl,
        otherImages: finalOtherImages,
      },
    };

    // Actualizar contenido en la base de datos
    const updated = await prisma.content.update({
      where: { id: Number(contentId) },
      data: {
        userId,
        gameId,
        type,
        title,
        shortTitle,
        text,
        urls,
      },
    });

    console.log("✅ Contenido actualizado:", updated.id);
    return { success: true, content: updated };
  } catch (error) {
    console.error("❌ Error al actualizar Noticia:", error);
    return { error: error.message || "Error desconocido" };
  }
}






export async function updateContent({
  contentId,
  title,
  shortTitle,
  text,
  urls,
}) {
  return await prisma.content.update({
    where: { id: contentId },
    data: {
      title,
      shortTitle,
      text,
      urls,
    },
  });
}

// Server-side: updateUserData
export async function updateUserData(prevState, formData) {
  console.log('📥 Iniciando actualización de usuario');

  const id = formData.get('id');
  const name = formData.get('name');
  const bio = formData.get('bio');
  const country = formData.get('country');
    const birthdate = formData.get('birthdate');

  try {
    await updateUser(id, name,bio, birthdate, country);
    return { success: "Usuario actualizado correctamente" };
  } catch (error) {
    console.error("🚫 Error durante la actualización:", error);
    return { error: "Hubo un error actualizando el usuario" };
  }
  finally {
   revalidatePath('/perfil')
  }
}


export async function updateUserProfileImagen(prevState, formData) {
  console.log('📥 Iniciando actualización de imagen de usuario usuario');

  const id = formData.get('id');
  const img = formData.get('img');
   let profileImgUrl = await uploadFile(img, id)

  try {
    await updateUserProfilePerfileImagen(id,profileImgUrl);
    return { success: "Usuario actualizado correctamente" };
  } catch (error) {
    console.error("🚫 Error durante la actualización:", error);
    return { error: "Hubo un error actualizando el usuario" };
  }
  finally {
   revalidatePath('/perfil')
  }
}

export async function updateUserBackImagen(prevState, formData) {
  console.log('📥 Iniciando actualización de imagen de usuario usuario');

  const id = formData.get('id');
  const img = formData.get('img');

  let backImg; // <- Debe declararse aquí una sola vez

  if (img && typeof img !== "string" && img.size > 0) {
    backImg = await uploadFile(img, id);
  } else {
    const user = await getUserById(id);
    backImg = user.image; // <- Accede a la imagen de fondo si es diferente
  }

  try {
    await updateUserProfileBackImagen(id, backImg);
    return { success: "Usuario actualizado correctamente" };
  } catch (error) {
    console.error("🚫 Error durante la actualización:", error);
    return { error: "Hubo un error actualizando el usuario" };
  }
  finally {
   revalidatePath('/perfil')
  }
}










