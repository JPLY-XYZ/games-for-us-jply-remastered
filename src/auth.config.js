import Google from "@auth/core/providers/google"
import Discord from '@auth/core/providers/discord'
import Reddit from '@auth/core/providers/reddit'
import Credentials from "@auth/core/providers/credentials"
import { getUserByEmail } from "@/lib/data"

export default {
    providers: [
        Google,
        Discord,
        Reddit,
        Credentials({
            async authorize(credentials) {
                console.log('AUTHORIZE')
                const user = await getUserByEmail(credentials.email)
                return user
            },
        }),
    ]
}
