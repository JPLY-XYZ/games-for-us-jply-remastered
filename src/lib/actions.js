'use server'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import { auth, signIn, signOut } from '@/auth';
import { buscar, createNewContent, getUserByEmail, newComment, reportComment, reportContent, reportGame, reportUser, setFavoriteGame } from '@/lib/data';
import { revalidatePath } from 'next/cache';
import { uploadFile } from './files';


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



// funciones utilidades web

export async function reportAction(prevState, formData) {
  if (!(formData instanceof FormData)) {
    throw new Error("formData no es una instancia de FormData");
  }

  const id = formData.get('id');
  const tipo = formData.get('tipo');

  if (!id || !tipo) {
    throw new Error('Datos incompletos');
  }

  try {
    switch (tipo) {
      case 'USER':
        await reportUser(+id);
        break;
      case 'GAME':
        await reportGame(+id);
        break;
      case 'CONTENT':
        await reportContent(+id);
        break;
      case 'COMMENT':
        await reportComment(+id);
        break;
      default:
        throw new Error('Tipo no soportado');
    }

    // revalidatePath('/');
  } catch (error) {
    console.error('Error en reportAction:', error);
    throw error;
  }
}


// favorito

export async function toggleFavoriteAction(prevState, formData) {
  const session = await auth()
  const userId = session?.user?.id
  const gameId = Number(formData.get('gameId'))


  if (!userId || !gameId) {
    throw new Error('Datos inválidos o no autenticado')
  }

  const result = await setFavoriteGame(userId, gameId)
  return result // { status: 'added' | 'removed' }
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