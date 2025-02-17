import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"

const handler = NextAuth({
    providers : [
        Github({
            clientId: process.env.GITHUB_CLIENT!,
            clientSecret: process.env.GITHUB_CLIENTSECRET!
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT!,
            clientSecret: process.env.GOOGLE_CLIENTSECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],

    // callbacks : {
    //     async jwt ( {} ) {

    //     }
    // }
})

export { handler as GET, handler as POST }