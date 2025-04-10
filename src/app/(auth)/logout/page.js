import { logout } from "@/lib/actions"
import { LogOut } from "lucide-react"


function PaginaLogout() {
  return (
    <>
      <h1 className="text-3xl font-bold">Cerrar sesión</h1>
      <form action={logout}>
        <button className="flex gap-2 px-4 py-2 bg-blue-300">
          <LogOut /> Cerrar sesión
        </button>
      </form>
    </>
  )
}

export default PaginaLogout