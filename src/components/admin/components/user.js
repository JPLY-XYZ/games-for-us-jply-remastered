'use client'

import { changeRolOfUserAction, deleteAction, suspenderAcount } from "@/lib/common/actions";
import { Eye, Loader, Shield, ShieldOff, Trash2 } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";

function UserListCard({ user }) {

    console.log(user);

    const [stateEliminarCuenta, actionEliminarCuenta, pendingEliminarCuenta] = useActionState(deleteAction, {})
    const [statechangeRolCuenta, actionChangeRolCuenta, pendingChangeRolCuenta] = useActionState(changeRolOfUserAction, {})
    const [stateDesactivarCuenta, actionDesactivarCuenta, pendingDesactivarCuenta] = useActionState(suspenderAcount, {})
    const [userActive, setUserActive] = useState(user.active);

    return (<div className="bg-white dark:bg-slate-800 p-3 shadow rounded-md flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
    {/* Sección izquierda: imagen e info */}
    <div className="flex flex-col sm:flex-row gap-4 sm:items-center w-full sm:w-auto">
        <div className="flex justify-center sm:justify-start">
            <img
                src={user.image || "https://placehold.co/600x600?text=USUARIO"}
                alt={user.image}
                className="object-cover w-20 h-20 rounded-full"
            />
        </div>
        <div className="text-center sm:text-left">
            <p className="font-bold">{user.name}</p>
            <p className="text-sm">{user.email}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
                Último login: {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('es-ES') : new Date(user.createdAt).toLocaleDateString('es-ES')}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
                Fecha de creación: {new Date(user.createdAt).toLocaleDateString('es-ES')}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
                Reportes: {user.reportCount}
            </p>
        </div>
    </div>

    {/* Sección derecha: acciones */}
    <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
        {/* Select de rol */}
        <form action={actionChangeRolCuenta} className="w-full sm:w-auto">
            <input type="hidden" name="id" value={user.id} />
            <select
                name="rol"
                value={user.role}
                onChange={(e) => {
                    e.target.form.requestSubmit();
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                }}
                disabled={pendingChangeRolCuenta}
                className="w-full sm:w-auto border rounded px-2 py-1 text-sm cursor-pointer disabled:opacity-50 text-gray-800 dark:text-white bg-white dark:bg-gray-800 border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150"
            >
                <option value="USUARIO">USUARIO</option>
                <option value="DESARROLLADOR">DESARROLLADOR</option>
            </select>
            {pendingChangeRolCuenta && <Loader className="animate-spin inline-block ml-2" />}
        </form>

        {/* Botones */}
        <div className="flex flex-row mx-auto flex-wrap gap-3 items-center">
            <Link href={`/perfil/${user.id}`} title="Ver perfil">
                <Eye className="w-5 h-5" />
            </Link>

            <form action={actionDesactivarCuenta}>
                <input type="hidden" name="id" value={user.id} />
                <button
                    className="cursor-pointer"
                    onClick={() => setUserActive(!userActive)}
                    title={!userActive ? "Activar" : "Desactivar"}
                >
                    {pendingDesactivarCuenta ? (
                        <Loader className="animate-spin" />
                    ) : userActive ? (
                        <Shield title="Desactivar" className="w-5 h-5 text-black dark:text-white" />
                    ) : (
                        <ShieldOff title="Activar" className="w-5 h-5 text-yellow-500" />
                    )}
                </button>
            </form>

            <form action={actionEliminarCuenta}>
                <input type="hidden" name="id" value={user.id} />
                <input type="hidden" name="tipo" value="USER" />
                <button disabled={pendingEliminarCuenta} title="Eliminar" className="cursor-pointer">
                    {pendingEliminarCuenta ? (
                        <Loader className="animate-spin" />
                    ) : (
                        <Trash2 className="w-5 h-5 text-red-500" />
                    )}
                </button>
            </form>
        </div>
    </div>
</div>

    );
}

export default UserListCard;