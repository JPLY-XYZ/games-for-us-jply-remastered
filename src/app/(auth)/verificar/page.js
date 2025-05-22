import { getUserByEmail } from "@/lib/data";
import { verifyEmail } from "@/lib/email/action";


async function Page({ searchParams }) {
    const params = await searchParams; // espera que se resuelva
    const token = params?.token || null;
    const userEmail = params?.userEmail || null;

    if (!token) {
        return (
            <div>
                <h1>Token no proporcionado</h1>
            </div>
        );
    }
     if (!userEmail) {
        return (
            <div>
                <h1>Email no proporcionado</h1>
            </div>
        );
    }

    const user = await getUserByEmail(userEmail);

    console.log(user);

    if (!user) {
        return (
            <div>
                <h1>Usuario no encontrado</h1>
            </div>
        );
    }

    if (user.verified) {
        return (
            <div>
                <h1>La cuenta ya ha sido verificada</h1>
            </div>
        );
    }

    if (user.verificationToken !== token) {
        return (
            <div>
                <h1>Token no válido</h1>
            </div>
        );
    }

    


    await verifyEmail(user.id, token);

    return (
        <div>
            <h1>Verificación exitosa</h1>
        </div>
    );
}

export default Page;