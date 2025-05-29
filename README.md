# Proyecto Web - Estructura y Descripción

Este proyecto está desarrollado con Next.js (App Router) y está orientado a una plataforma que maneja juegos, contenidos, perfiles de usuarios y autenticación. A continuación se detalla la estructura del proyecto y las funcionalidades principales que se pueden inferir por la organización de carpetas y archivos.

---

## Estructura General

src
┣ app
┣ components
┣ lib
┣ auth.config.js
┣ auth.js
┣ middleware.js

markdown
Copiar
Editar

---

## Detalle por Carpetas y Archivos

### 1. `src/app`

Contiene las rutas de la aplicación usando la nueva estructura de Next.js (App Router).

- `(auth)`: Rutas relacionadas con autenticación y manejo de usuarios.
  - `login`, `register`, `verificar`, `error`: Páginas para iniciar sesión, registro, verificación y manejo de errores.
- `administradores`: Página para administración.
- `api/auth/[...nextauth]/route.js`: API para autenticación con NextAuth.
- `assets`: Recursos estáticos como íconos, imágenes y fondos.
- `contenido`, `contenidos`: Gestión y visualización de contenidos (multimedia, reseñas, noticias).
- `juego`, `juegos`: Páginas para mostrar juegos individuales y listados.
- `noticias`: Página para noticias.
- `perfil`: Gestión y visualización de perfiles de usuario, con subrutas para juegos favoritos, juegos publicados, y edición.
- Archivos raíz:
  - `error.js`, `not-found.js`: Manejo de errores y páginas no encontradas.
  - `globals.css`: Estilos globales.
  - `layout.js`: Layout principal de la app.
  - `loading.js`: Componente de carga.
  - `page.js`: Página principal.

---

### 2. `src/components`

Componentes reutilizables organizados por funcionalidad:

- `admin`: Componentes para administración (usuarios, juegos, contenidos, comentarios).
- `auth`: Formularios y botones para login, registro y autenticación con OAuth.
- `comentarios`: Componentes para mostrar y crear comentarios.
- `formulariosCreacion`: Formularios para crear contenidos y juegos, con subformularios para manejar multimedia, requisitos, valoraciones, etc.
- `listados`: Listados y tarjetas para juegos y contenidos, con componentes de fallback y botones de acción.
- `nuevo`: Componentes para mostrar nuevos contenidos, lanzamientos y noticias.
- `perfil`: Componentes para edición de imagen de perfil, fondo y formulario de información del usuario.
- `utilidad`: Utilidades como buscadores, botones de like, reportes, favoritos, carrusel de desarrolladores, confirmaciones y uploads.
- Componentes generales: `header.js`, `image-client-carrusel.js`, `listado-contenidos-desplegable.js`.

---

### 3. `src/lib`

Funciones y utilidades generales organizadas por temas:

- `common/actions.js`: Acciones comunes reutilizables.
- `email/action.js`: Funciones relacionadas con envío o gestión de emails.
- `games/actions.js` y `games/data.js`: Acciones y datos específicos para juegos.
- Archivos generales:
  - `actions.js`: Acciones genéricas.
  - `data.js`: Datos estáticos o de configuración.
  - `files.js`: Gestión de archivos.
  - `prisma.js`: Cliente y configuración de Prisma para la base de datos.

---

### 4. Archivos raíz en `src`

- `auth.config.js`: Configuración de autenticación.
- `auth.js`: Funciones o hooks relacionados con autenticación.
- `middleware.js`: Middleware para Next.js (posiblemente para autenticación, redirecciones, etc).

---
##  Licencia

Este proyecto está bajo la licencia **Creative Commons Atribución-NoComercial 4.0 Internacional**.
