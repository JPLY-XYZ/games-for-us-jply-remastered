-- Tabla para Usuarios
CREATE TABLE usuario (
    usuario_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_conexion TIMESTAMP NULL,
    pais VARCHAR(50),
    biografia TEXT,
    avatar VARCHAR(255),
    url_fondo_perfil VARCHAR(255),
    rol ENUM('USUARIO', 'DESARROLLADOR', 'ADMINISTRADOR') NOT NULL DEFAULT 'USUARIO',
    reportes INT NOT NULL DEFAULT 0
);

-- Tabla para Juegos
CREATE TABLE juegos (
    juego_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_juego VARCHAR(255) NOT NULL,
    descripcion_corta VARCHAR(255),
    descripcion_larga TEXT,
    fecha_lanzamiento DATE,
    editor VARCHAR(100),
    precio DECIMAL(10, 2),
    puntuacion_media DECIMAL(3, 2),
    cantidad_ventas INT UNSIGNED,
    requisitos JSON,
    urls JSON,
    genero VARCHAR(100), -- Temporal, hasta que lo migremos a tabla intermedia
    reportes INT NOT NULL DEFAULT 0
);

-- Tabla para Categorías
CREATE TABLE categorias (
    categoria_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_categoria VARCHAR(100) UNIQUE NOT NULL,
    descripcion VARCHAR(255)
);

-- Tabla para Plataformas
CREATE TABLE plataformas (
    plataforma_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_plataforma VARCHAR(100) UNIQUE NOT NULL,
    fabricante VARCHAR(100)
);

-- Tabla de relación muchos a muchos entre Juegos y Categorías
CREATE TABLE juego_categoria (
    juego_id INT NOT NULL,
    categoria_id INT NOT NULL,
    PRIMARY KEY (juego_id, categoria_id),
    FOREIGN KEY (juego_id) REFERENCES juegos(juego_id) ON DELETE CASCADE,
    FOREIGN KEY (categoria_id) REFERENCES categorias(categoria_id) ON DELETE CASCADE
);

-- Tabla de relación muchos a muchos entre Juegos y Plataformas
CREATE TABLE juego_plataforma (
    juego_id INT NOT NULL,
    plataforma_id INT NOT NULL,
    PRIMARY KEY (juego_id, plataforma_id),
    FOREIGN KEY (juego_id) REFERENCES juegos(juego_id) ON DELETE CASCADE,
    FOREIGN KEY (plataforma_id) REFERENCES plataformas(plataforma_id) ON DELETE CASCADE
);

-- Tabla de relación muchos a muchos entre Juegos y Usuarios (como Desarrolladores)
CREATE TABLE juego_desarrollador (
    juego_id INT NOT NULL,
    desarrollador_id INT NOT NULL,
    PRIMARY KEY (juego_id, desarrollador_id),
    FOREIGN KEY (juego_id) REFERENCES juegos(juego_id) ON DELETE CASCADE,
    FOREIGN KEY (desarrollador_id) REFERENCES usuario(usuario_id) ON DELETE CASCADE
);

-- Tabla para Contenido (Reseñas, Videos, Imágenes, Guías)
CREATE TABLE contenido (
    contenido_id INT PRIMARY KEY AUTO_INCREMENT,
    juego_id INT NOT NULL,
    usuario_id INT NOT NULL,
    tipo_contenido ENUM('RESEÑA', 'VIDEO', 'IMAGEN', 'GUIA') NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    url VARCHAR(255),
    texto TEXT,
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_edicion TIMESTAMP,
    puntuacion INT UNSIGNED CHECK (puntuacion >= 1 AND puntuacion <= 5),
    reportes INT NOT NULL DEFAULT 0,
    FOREIGN KEY (juego_id) REFERENCES juegos(juego_id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuario(usuario_id) ON DELETE CASCADE
);

-- Tabla para Comentarios (sobre juegos o contenido)
CREATE TABLE comentarios (
    comentario_id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    juego_id INT NULL,
    contenido_id INT NULL,
    texto_comentario TEXT NOT NULL,
    puntuacion INT UNSIGNED CHECK (puntuacion >= 1 AND puntuacion <= 5),
    fecha_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    editado BOOLEAN DEFAULT FALSE,
    fecha_edicion TIMESTAMP,
    reportes INT NOT NULL DEFAULT 0,
    FOREIGN KEY (usuario_id) REFERENCES usuario(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY (juego_id) REFERENCES juegos(juego_id) ON DELETE CASCADE,
    FOREIGN KEY (contenido_id) REFERENCES contenido(contenido_id) ON DELETE CASCADE,
    CONSTRAINT fk_comentario_juego_contenido CHECK (
        (juego_id IS NOT NULL AND contenido_id IS NULL) OR
        (juego_id IS NULL AND contenido_id IS NOT NULL)
    )
);

-- Tabla de relación muchos a muchos para Juegos Favoritos de Usuarios (sin fecha)
CREATE TABLE usuario_juego_favorito (
    usuario_id INT NOT NULL,
    juego_id INT NOT NULL,
    PRIMARY KEY (usuario_id, juego_id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY (juego_id) REFERENCES juegos(juego_id) ON DELETE CASCADE
);
