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

    return (<div
        className="bg-white dark:bg-slate-800 p-3 shadow flex flex-row justify-between items-center rounded-md"
    >
        <div className="flex flex-row items-center gap-3">
            <div className="flex items-center">
                <img
                    src={user.image || "https://placehold.co/600x600?text=USUARIO"}
                    alt={user.image}
                    className="object-cover w-12 h-12 sm:w-16 sm:h-16 rounded-full"
                />
            </div>
            <div>
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
        <div className="flex gap-2">
            <Link href={`/perfil/${user.id}`} title="Ver perfil">
                <Eye className="w-5 h-5" />
            </Link>
            <form action={actionDesactivarCuenta}>
                <input type="hidden" name="id" value={user.id} />
                <button className="cursor-pointer" onClick={() => setUserActive(!userActive)} title={!userActive ? "Activar" : "Desactivar"}>
                    {pendingDesactivarCuenta ? (
                        <Loader className="animate-spin" />
                    ) : (
                        userActive ? (
                            <Shield title="Desactivar" className="w-5 h-5 text-white" />
                        ) : (
                            <ShieldOff title="Activar" className="w-5 h-5 text-yellow-500" />
                        )
                    )}

                </button>
            </form>
            <form action={actionChangeRolCuenta}>
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
                    className="border rounded px-2 py-1 text-sm cursor-pointer disabled:opacity-50 text-gray-800 dark:text-white bg-white dark:bg-gray-800 border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150"
                >
                    <option value="USUARIO">USUARIO</option>
                    <option value="DESARROLLADOR">DESARROLLADOR</option>
                </select>


                {pendingChangeRolCuenta && <Loader className="animate-spin inline-block ml-2" />}
            </form>
            <form action={actionEliminarCuenta}>
                <input type="hidden" name="id" value={user.id} />
                <input type="hidden" name="tipo" value="USER" />
                <button disabled={pendingEliminarCuenta} title="Eliminar" className="cursor-pointer">

                    {pendingEliminarCuenta ? <Loader className="animate-spin" /> : <Trash2 className="w-5 h-5 text-red-500" />}
                </button>
            </form>


        </div>
    </div>
    );
}

export default UserListCard;