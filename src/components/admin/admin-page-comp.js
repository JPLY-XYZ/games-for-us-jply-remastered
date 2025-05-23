'use client'
import {useState } from "react";
import { BookUp,
  BookDown,
  CalendarArrowDown,
  CalendarArrowUp,
} from "lucide-react";
import UserListCard from "./components/user";
import ContentListCard from "./components/content";
import GameListCard from "./components/game";
import CommentListCard from "./components/comment";

export default function AdminPageComp({ users, contents, juegos, comments }) {
  const [activeSection, setActiveSection] = useState("usuarios");


  const [contentSearchTerm, setContentSearchTerm] = useState("");
  const [contentFilterType, setContentFilterType] = useState("all");
  const [contentSortField, setContentSortField] = useState("publishedAt");
  const [contentSortDirection, setContentSortDirection] = useState("desc");

  const [searchTerm, setSearchTerm] = useState("");
  const [userSortField, setUserSortField] = useState("reportCount"); 
  const [userSortDirection, setUserSortDirection] = useState("desc"); 


  const [gameSearchTerm, setGameSearchTerm] = useState("");
  const [gameSortField, setGameSortField] = useState("publishedAt");
  const [gameSortDirection, setGameSortDirection] = useState("desc");


  const [commentSearchTerm, setCommentSearchTerm] = useState("");
  const [commentSortField, setCommentSortField] = useState("createdAt");
  const [commentSortDirection, setCommentSortDirection] = useState("desc");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);


  const openModal = (comentario) => {
    setSelectedComment(comentario);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedComment(null);
  };


  const rotateGameSort = () => {
    if (gameSortField === "publishedAt" && gameSortDirection === "desc") {
      setGameSortDirection("asc");
    } else if (gameSortField === "publishedAt" && gameSortDirection === "asc") {
      setGameSortField("reportCount");
      setGameSortDirection("desc");
    } else if (gameSortField === "reportCount" && gameSortDirection === "desc") {
      setGameSortDirection("asc");
    } else {
      setGameSortField("publishedAt");
      setGameSortDirection("desc");
    }
  };
  const renderGameSortIcon = () => {
    if (gameSortField === "publishedAt") {
      return gameSortDirection === "asc" ? (
        <div className="text-center flex gap-3 items-center mx-auto w-36"><CalendarArrowUp className="w-4 h-4" /> Fecha (Des)</div>
      ) : (
        <div className="text-center flex gap-3 items-center mx-auto w-36"><CalendarArrowDown className="w-4 h-4" /> Fecha (Asc)</div>
      );
    } else {
      return gameSortDirection === "asc" ? (
        <div className="text-center flex gap-3 items-center mx-auto w-36"> <BookUp className="w-4 h-4" /> Reportes (Des) </div>
      ) : (
        <div className="text-center flex gap-3 items-center mx-auto w-36"><BookDown className="w-4 h-4" /> Reportes (Asc) </div>
      );
    }
  };
  const rotateSort = () => {
    if (contentSortField === "publishedAt" && contentSortDirection === "desc") {
      setContentSortDirection("asc");
    } else if (contentSortField === "publishedAt" && contentSortDirection === "asc") {
      setContentSortField("reportCount");
      setContentSortDirection("desc");
    } else if (contentSortField === "reportCount" && contentSortDirection === "desc") {
      setContentSortDirection("asc");
    } else {
      setContentSortField("publishedAt");
      setContentSortDirection("desc");
    }
  };
  const renderSortIcon = () => {
    if (contentSortField === "publishedAt") {
      return contentSortDirection === "asc" ? (
        <div className="text-center flex gap-3 items-center mx-auto w-36"><CalendarArrowUp className="w-4 h-4" /> Fecha (Des)</div>
      ) : (
        <div className="text-center flex gap-3 items-center mx-auto w-36"><CalendarArrowDown className="w-4 h-4" /> Fecha (Asc)</div>
      );
    } else {
      return contentSortDirection === "asc" ? (
        <div className="text-center flex gap-3 items-center mx-auto w-36"> <BookUp className="w-4 h-4" /> Reportes (Des) </div>
      ) : (
        <div className="text-center flex gap-3 items-center mx-auto w-36"><BookDown className="w-4 h-4" /> Reportes (Asc) </div>
      );
    }
  };
  const rotateUserSort = () => {
    if (userSortField === "createdAt" && userSortDirection === "desc") {
      setUserSortDirection("asc");
    } else if (userSortField === "createdAt" && userSortDirection === "asc") {
      setUserSortField("reportCount");
      setUserSortDirection("desc");
    } else if (userSortField === "reportCount" && userSortDirection === "desc") {
      setUserSortDirection("asc");
    } else {
      setUserSortField("createdAt");
      setUserSortDirection("desc");
    }
  };
  const renderUserSortIcon = () => {
    if (userSortField === "createdAt") {
      return userSortDirection === "asc" ? (
        <div className="text-center flex gap-3 items-center mx-auto w-36">
          <CalendarArrowUp className="w-4 h-4" /> Fecha (Des)
        </div>
      ) : (
        <div className="text-center flex gap-3 items-center mx-auto w-36">
          <CalendarArrowDown className="w-4 h-4" /> Fecha (Asc)
        </div>
      );
    } else {
      return userSortDirection === "asc" ? (
        <div className="text-center flex gap-3 items-center mx-auto w-36">
          <BookUp className="w-4 h-4" /> Reportes (Des)
        </div>
      ) : (
        <div className="text-center flex gap-3 items-center mx-auto w-36">
          <BookDown className="w-4 h-4" /> Reportes (Asc)
        </div>
      );
    }
  };
  const rotateCommentSort = () => {
    if (commentSortField === "createdAt" && commentSortDirection === "desc") {
      setCommentSortDirection("asc");
    } else if (commentSortField === "createdAt" && commentSortDirection === "asc") {
      setCommentSortField("reportCount");
      setCommentSortDirection("desc");
    } else if (commentSortField === "reportCount" && commentSortDirection === "desc") {
      setCommentSortDirection("asc");
    } else {
      setCommentSortField("createdAt");
      setCommentSortDirection("desc");
    }
  };
  const renderCommentSortIcon = () => {
    if (commentSortField === "createdAt") {
      return commentSortDirection === "asc" ? (
        <div className="text-center flex gap-3 items-center mx-auto w-36"><CalendarArrowUp className="w-4 h-4" /> Fecha (Des)</div>
      ) : (
        <div className="text-center flex gap-3 items-center mx-auto w-36"><CalendarArrowDown className="w-4 h-4" /> Fecha (Asc)</div>
      );
    } else {
      return commentSortDirection === "asc" ? (
        <div className="text-center flex gap-3 items-center mx-auto w-36"> <BookUp className="w-4 h-4" /> Reportes (Des) </div>
      ) : (
        <div className="text-center flex gap-3 items-center mx-auto w-36"><BookDown className="w-4 h-4" /> Reportes (Asc) </div>
      );
    }
  };


  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">

        {activeSection === "usuarios" && (
          <section className="p-4 bg-white dark:bg-gray-900 flex flex-col gap-1 h-full">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2">
              <h2 className="text-xl font-semibold hidden md:block">Usuarios</h2>
              <div className="flex gap-2 w-full sm:w-auto flex-col sm:flex-row">
                <input
                  type="text"
                  placeholder="Buscar usuario..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-slate-800 text-black dark:text-white w-full sm:w-64"
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      rotateUserSort(); // Cambia el orden de los usuarios
                    }}
                    className="px-2 py-1 bg-blue-500 text-white rounded flex items-center gap-1"
                  >
                    {renderUserSortIcon()} {/* Renderiza el icono y el texto de orden */}
                  </button>
                </div>
              </div>
            </header>
            <div className="overflow-y-auto max-h-[calc(100vh-14rem)] ">
              <div className="flex flex-col gap-3">
                {users
                  .filter((user) =>
                    user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user?.correo?.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .sort((a, b) => {
                    const valA = a[userSortField];
                    const valB = b[userSortField];
                    if (userSortDirection === "asc") return valA > valB ? 1 : -1;
                    return valA < valB ? 1 : -1;
                  })
                  .map((user) => (
<UserListCard user={user} key={user.id} />
                  ))}
                  
              </div>
            </div>
          </section>
        )}
        {activeSection === "contenidos" && (
          <section className="p-4 bg-white dark:bg-gray-900 flex flex-col gap-1 h-full">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h2 className="text-xl font-semibold hidden md:block">Contenidos</h2>
              <div className="flex gap-2 w-full sm:w-auto flex-col sm:flex-row">
                <input
                  type="text"
                  placeholder="Buscar contenido..."
                  value={contentSearchTerm}
                  onChange={(e) => setContentSearchTerm(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-slate-800 text-black dark:text-white w-full sm:w-64"
                />
                <div className="flex items-center gap-2">
                  <select
                    value={contentFilterType}
                    onChange={(e) => setContentFilterType(e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-slate-800 text-black dark:text-white w-full sm:w-auto"
                  >
                    <option value="all">Todos</option>
                    <option value="VIDEO">Videos</option>
                    <option value="IMAGEN">Imagenes</option>
                    <option value="RESEÑA">Reseñas</option>
                    <option value="NOTICIA">Noticias</option>
                  </select>
                  <button
                    onClick={rotateSort}
                    className="px-2 py-1 bg-blue-500 text-white rounded flex items-center gap-1 "
                  >
                    {renderSortIcon()}
                  </button>
                </div>
              </div>
            </header>
            <div className="overflow-y-auto max-h-[calc(100vh-14rem)] pt-2  sm:max-h-[calc(100vh-11.5rem)]">
              <div className="flex flex-col gap-3">
                {contents
                  .filter((content) =>
                    (contentFilterType === "all" || content.type === contentFilterType) &&
                    content.title?.toLowerCase().includes(contentSearchTerm.toLowerCase())
                  )
                  .sort((a, b) => {
                    const valA = a[contentSortField];
                    const valB = b[contentSortField];
                    if (contentSortDirection === "asc") return valA > valB ? 1 : -1;
                    return valA < valB ? 1 : -1;
                  })
                  .map((content) => (
                    <ContentListCard content={content} key={content.id} />
                  ))}
              </div>
            </div>
          </section>
        )}
        {activeSection === "juegos" && (
          <section className="p-4 bg-white dark:bg-gray-900 flex flex-col gap-1 h-full">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h2 className="text-xl font-semibold hidden md:block">Juegos</h2>
              <div className="flex gap-2 w-full sm:w-auto flex-col sm:flex-row">
                <input
                  type="text"
                  placeholder="Buscar juego..."
                  value={gameSearchTerm}
                  onChange={(e) => setGameSearchTerm(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-slate-800 text-black dark:text-white w-full sm:w-64"
                />
                <div className="flex items-center gap-2">

                  <button
                    onClick={rotateGameSort}
                    className="px-2 py-1 bg-blue-500 text-white rounded flex items-center gap-1"
                  >
                    {renderGameSortIcon()}
                  </button>
                </div>
              </div>
            </header>
            <div className="overflow-y-auto max-h-[calc(100vh-14rem)] pt-2  sm:max-h-[calc(100vh-11.5rem)]">
              <div className="flex flex-col gap-3">
                {juegos
                  .filter((juego) =>
                    juego.name?.toLowerCase().includes(gameSearchTerm.toLowerCase())
                  )
                  .sort((a, b) => {
                    const valA = a[gameSortField];
                    const valB = b[gameSortField];
                    if (gameSortDirection === "asc") return valA > valB ? 1 : -1;
                    return valA < valB ? 1 : -1;
                  })
                  .map((juego) => (
                    <GameListCard juego={juego} key={juego.id} />
                  ))}
              </div>
            </div>
          </section>
        )}
        {activeSection === "comments" && (
          <section className="p-4 bg-white bg-opacity-25 dark:bg-gray-900 flex flex-col gap-4 h-full">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h2 className="text-xl font-semibold hidden md:block">Gestión de Comentarios</h2>
              <div className="flex gap-2 w-full sm:w-auto flex-col sm:flex-row">
                <input
                  type="text"
                  placeholder="Buscar comentario..."
                  value={commentSearchTerm}
                  onChange={(e) => setCommentSearchTerm(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 w-full sm:w-1/2 bg-white dark:bg-slate-800 text-black dark:text-white"
                />
                <button
                  onClick={rotateCommentSort}
                  className="px-2 py-1 bg-blue-500 text-white rounded flex items-center gap-1"
                >
                  {renderCommentSortIcon()}
                </button>
              </div>
            </header>
            <div className="overflow-y-auto max-h-[calc(100vh-14.5rem)] ">
              <div className="flex flex-col gap-3">
                {comments
                  .filter((comentario) =>
                    comentario.user.name?.toLowerCase().includes(commentSearchTerm.toLowerCase())
                  )
                  .sort((a, b) => {
                    const valA = a[commentSortField];
                    const valB = b[commentSortField];
                    if (commentSortDirection === "asc") return valA > valB ? 1 : -1;
                    return valA < valB ? 1 : -1;
                  })
                  .map((comentario) => (
                    <CommentListCard comentario={comentario} key={comentario.id} btnVer={() => openModal(comentario)}/>
                  ))}
              </div>
            </div>
          </section>
        )}

        {/* Modal de comentario */}
        {isModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg max-w-lg w-full">
              <h3 className="text-xl font-semibold mb-4">Comentario de {selectedComment?.user.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                <strong>Fecha de creación:</strong> {new Date(selectedComment?.createdAt).toLocaleDateString('es-ES')}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <strong>Fecha de edición:</strong> {selectedComment?.updatedAt ? new Date(selectedComment?.updatedAt).toLocaleDateString('es-ES') : "No editado"}
              </p>
              <p className="text-sm text-gray-600 dark:bg-gray-900 rounded-2xl   bg-gray-400 dark:text-gray-400 mb-4">
                <strong></strong> {selectedComment?.text}
              </p>
              <div className="flex justify-end">
                <button onClick={closeModal} className="px-4 py-2 bg-red-500 text-white rounded-lg">
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      <nav className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-gray-700 p-2 flex justify-around lg:justify-center lg:gap-4">
        <button
          className={`flex-1 lg:flex-none px-4 py-2 rounded text-xs sm:text-sm md:text-base ${activeSection === "usuarios" ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-white'}`}
          onClick={() => setActiveSection("usuarios")}
        >
          Usuarios
        </button>
        <button
          className={`flex-1 lg:flex-none px-4 py-2 rounded text-xs sm:text-sm md:text-base ${activeSection === "contenidos" ? 'bg-green-500 text-white' : 'text-gray-700 dark:text-white'}`}
          onClick={() => setActiveSection("contenidos")}
        >
          Contenidos
        </button>
        <button
          className={`flex-1 lg:flex-none px-4 py-2 rounded text-xs sm:text-sm md:text-base ${activeSection === "juegos" ? 'bg-purple-500 text-white' : 'text-gray-700 dark:text-white'}`}
          onClick={() => setActiveSection("juegos")}
        >
          Juegos
        </button>
        <button
          className={`flex-1 lg:flex-none px-4 py-2 rounded text-xs sm:text-sm md:text-base ${activeSection === "comments" ? 'bg-orange-500 text-white' : 'text-gray-700 dark:text-white'}`}
          onClick={() => setActiveSection("comments")}
        >
          Comentarios
        </button>
      </nav>

    </div >
  );
}
